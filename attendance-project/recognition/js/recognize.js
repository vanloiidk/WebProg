var submit = document.getElementById('submit');
var snap = document.getElementById('snap');
var image = document.getElementById('image');
var camera =document.getElementById('camera');
var imageSnap = document.getElementById('image-snap');
var imageResult = document.getElementById('image-result');
var result = document.getElementById('result');
let date = new Date();
let today = date.getFullYear() +"-"+date.getMonth()+"-"+date.getDate()
let scheduleChecked;


submit.addEventListener('click', function() {
    if(checkExistSnapImage() == "false") {
        $('#message')[0].innerHTML = "Please take snap before submit.";
        $('#status')[0].style.display = "block";
        return;
    }

    checkSchedule();
});

function getDayId() {
    let today = new Date();
    let hour = today.getHours();
    let session_id
    if(hour >= 0 && hour <= 12) {
        session_id = 1;
    } else if(hour >= 12 && hour <= 18) {
        session_id = 2;
    } else {
        session_id = 3;
    }
    return session_id
}

function checkSchedule() {
    let day_id = date.getDay();
    let time_id = getDayId();
    let obj = {
        "class_id":"A0001",
        "day_id":3,
        "time_id":1
    }

    let jsondata = JSON.stringify(obj);
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState==4&&this.status==200){
            let objs = JSON.parse(this.responseText);
            send_data_2_python(objs);
        }
        if(this.status==401){
            $('#message')[0].innerHTML = "There is no schedule this time";
            $('#status')[0].style.display = "block";
        }

    }
    request.open('POST','../../php/schedule/schedule_check.php',true)
    request.send(jsondata);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function checkExistSnapImage() {
    var exist = "true";
    if(image.src == "") {
        exist = "false";
    }
    return exist;
}


function send_data_2_python(objs) {
    var id = getCookie("id");
    var obj = {
        "base64_str": image.src,
        "id": id
    };

    url = 'http://127.0.0.1:5000/recognize';
    
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function(response) {
            displayImgResult(response);
            updateMessage(response);
            if(response.id == id) {
                send_data_2_PHP(id, objs);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function displayImgResult(obj) {
    camera.style.display = "none";
    imageSnap.style.display = "none";
    imageResult.src = "data:image/png;base64," + obj.image_str;
    result.style.margin = "0 auto";
    submit.style.display = "none";
    snap.style.display = "none";
    Webcam.reset();
} 


function updateMessage(obj) {
    student_name = getCookie("username");

    if(obj.face == "none") {
        $('#message')[0].innerHTML = "Face cannot be detected. Please try again.";
        $('#status')[0].style.display = "block";
        $('#try-again')[0].style.display = "block";
        return;
    }

    if(obj.match == "true") {
        $('#message')[0].innerHTML = student_name + " was recognize successfully. Thank you.";
        $('#status')[0].style.display = "block";
        return;
    } else {
        $('#message')[0].innerHTML = "Cannot recognize. Please try again";
        $('#status')[0].style.display = "block";
        $('#try-again')[0].style.display = "block";
        return;
    }
}


function send_data_2_PHP(student_id,objs) {
    let schedule_arr = []
    for(let i = 0; i< objs.length;i++){
        schedule_arr.push(objs[i].schedule_id);
    }
    let obj={
        "student_id": student_id,
        "schedule_arr":schedule_arr,
        "attendance_date":today
    };

    let jsondata = JSON.stringify(obj);
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState==4&&this.status==200){

        }

    }

    request.open('POST','../../php/attendance/attendance_addOne.php',true);
    request.send(jsondata);


}

