from flask import Flask, json, Response, request, render_template, jsonify
from flask_cors import CORS
import cv2
import os
import time
import numpy as np
from PIL import Image
import base64
import sqlite3

app = Flask(__name__)
CORS(app)


def readb64(uri):
    encoded_data = uri.split(',')[1]
    nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img


def encode_image(img):
  return img.encode("base64")


def record_face(student_id, student_name, image_src):
    conn = sqlite3.connect('database.db')
    if not os.path.exists('./dataset'):
        os.makedirs('./dataset')
    c = conn.cursor()
    c.execute('INSERT INTO users (student_id,name) VALUES (?,?)', (student_id, student_name,))
    uid = c.lastrowid
    sampleNum = 0

    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

    for base64_str in image_src:
        img = readb64(base64_str)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        if len(faces) == 0:
            print("Cannot dectect face of image '"+ str(sampleNum + 1)+ "'")
            continue
        for (x, y, w, h) in faces:
            sampleNum = sampleNum + 1
            cv2.imwrite("dataset/" + student_id + "." + str(uid) + "." + str(sampleNum) + ".png", gray[y:y + h, x:x + w])
            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
            cv2.waitKey(100)
    conn.commit()
    conn.close()


def getImagesWithID(path):
    # get the path of all the files in the folder
    imagePaths = [os.path.join(path, f) for f in os.listdir(path)]

    faces = []
    IDs = []

    for imagePath in imagePaths:
        # Read the image and convert to grayscale
        faceImg = Image.open(imagePath).convert('L')
        # Now we are converting the PIL image into numpy array
        faceNp = np.array(faceImg, 'uint8')

        # Get the label of image
        ID = int(os.path.split(imagePath)[-1].split('.')[1])

        # Detect the face of the image
        faces.append(faceNp)
        IDs.append(ID)
    return np.array(IDs), faces


def detector(base64_str):
    obj = {}
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    fname = "recognizer/trainingData.yml"
    if not os.path.isfile(fname):
        print("Please train the data first")
        exit(0)

    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read(fname)

    img = readb64(base64_str)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    if len(faces) == 0:
        obj['face'] = "none"
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 3)
        ids, conf = recognizer.predict(gray[y:y + h, x:x + w])
        c.execute("select student_id, name from users where id = (?);", (ids,))
        result = c.fetchall()
        student_id = result[0][0]
        name = result[0][1]

        if conf < 50:
            cv2.putText(img, name, (x + 2, y + h - 5), cv2.FONT_HERSHEY_SIMPLEX, 1, (150, 255, 0), 2)
            obj["student_id"] = student_id
        else:
            cv2.putText(img, 'No Match', (x + 2, y + h - 5), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    retval, buffer = cv2.imencode('.png', img)
    image_str = base64.b64encode(buffer).decode()
    obj["image_str"] = image_str
    return obj


@app.route('/make_dataset', methods=['POST'])
def make_dataset():
    data = request.get_json()
    student_id = data.get('rollNo')
    student_name = data.get('student_name')
    image_src = data.get('image_src')

    record_face(student_id, student_name, image_src)
    print("record_face successfully")

    time.sleep(3)

    # create traningData.yml
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    path = 'dataset'
    if not os.path.exists('./recognizer'):
        os.makedirs('./recognizer')

    Ids, faces = getImagesWithID(path)
    recognizer.train(faces, Ids)
    recognizer.save('recognizer/trainingData.yml')

    print("traniningData.yml was created sucessfully")

    return jsonify({'reply': 'success'})


@app.route('/recognize', methods=["POST"])
def recognize():
    data = request.get_json()
    base64_str = data.get('base64_str')

    obj = detector(base64_str)
    return json.dumps(obj)


if __name__ == "__main__":
    app.run()

