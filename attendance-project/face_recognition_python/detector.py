import cv2
import numpy as np
import sqlite3
import os

conn = sqlite3.connect('database.db')
c = conn.cursor()

fname = "recognizer/trainingData.yml"
if not os.path.isfile(fname):
  print("Please train the data first")
  exit(0)

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(-1)
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read(fname)

while True:
  ret, img = cap.read()
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  faces = face_cascade.detectMultiScale(gray, 1.3, 5)
  for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 3)
    ids,conf = recognizer.predict(gray[y:y+h, x:x+w])
    c.execute("select student_id, name from users where id = (?);", (ids,))
    result = c.fetchall()
    student_id = result[0][0]
    name = result[0][1]
    if conf < 50:
      cv2.putText(img, name, (x+2, y+h-5), cv2.FONT_HERSHEY_SIMPLEX, 1, (150, 255, 0), 2)
    else:
      cv2.putText(img, 'No Match', (x+2, y+h-5), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
  cv2.imshow('Face Recognizer', img)
  k = cv2.waitKey(5)
  if k == 27:
    break

cap.release()
cv2.waitKey(0)
cv2.destroyAllWindows()
