
var myteacher_id = getCookie("id");

document.addEventListener("DOMContentLoaded",function () {
    init();
});

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  console.log(ca);
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

function init() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var oj = JSON.parse(this.responseText);
            document.getElementById("teacher_id").value = oj.teacher_id;
            document.getElementById("teacher_name").value = oj.teacher_name;
            document.getElementById("teacher_gmail").value = oj.teacher_gmail;
            document.getElementById("teacher_password").value = oj.teacher_password;


        }
    };
    request.open('GET',`http://localhost:3001/php/teacher/teacher_readOne.php?teacher_id=${myteacher_id}`,true);
    request.send();
}


function saveTutorProfileInfo() {
    var class_ele = document.getElementsByClassName("teacher_info");

    var obj = {
        "teacher_id":class_ele['teacher_id'].value,
        "teacher_name":class_ele['teacher_name'].value,
        "teacher_gmail":class_ele['teacher_gmail'].value,
        "teacher_password":class_ele['teacher_password'].value,

    }
    var teacher_id = class_ele['teacher_id'].value;

    var jsonData = JSON.stringify(obj);
    console.log(jsonData);
    postNewData(jsonData,teacher_id);

}
function postNewData(jsonData,teacher_id) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }

    }
    request.open("POST", `http://localhost:3001/php/teacher/teacher_update.php?teacher_id=${teacher_id}`, true);
    request.send(jsonData);
}
