
document.addEventListener("DOMContentLoaded",function () {
    calcAttendance();
    getSemester();
    getBranch();
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
    let class_id = getCookie("class_id")
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            var oj = JSON.parse(this.responseText);
            document.getElementById("class_id").innerText = oj.class_id;
            document.getElementById("class_name").value = oj.class_name;
            document.getElementById("class_year").value = oj.class_year;
            document.getElementById("branch_id").value = oj.branch_id;
            document.getElementById("semester_id").value = oj.semester_id;
            document.getElementById("class_strength").value = oj.class_strength;
            if(oj.class_code){
                document.getElementById("class_code").value = oj.class_code;
            }
            else{
                document.getElementById("class_code").value = "None";

            }

        }
    };
    request.open('GET',`http://localhost:3001/php/classes/class_readOne.php?class_id=${class_id}`,true);
    request.send();
}
function calcAttendance() {
    document.getElementById("attendance").value = "0";

}
function getSemester() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState==4 && this.status ==200){
            var oj = JSON.parse(this.responseText)['records'];
            var num = oj.length;
            for (i=0; i<num;i++){
                addOption(oj[i].semester_id,'semester_id');
            }


        }
    }
    request.open('GET','http://localhost:3001/php/semester/semester_read.php',true);
    request.send();
}

function getBranch() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState==4 && this.status ==200){
            var oj = JSON.parse(this.responseText)['records'];
            var num = oj.length;
            for (i =0; i<num;i++){
                addOption(oj[i].branch_id,"branch_id");
            }


        }
    }
    request.open('GET','http://localhost:3001/php/branch/branch_read.php',true);
    request.send();
}
function addOption(name, mysel) {
    var sel = document.getElementById(mysel);
    var opt = document.createElement('option');
    opt.appendChild( document.createTextNode(name) );
    opt.value = name;
    sel.appendChild(opt);
}
function removeOption() {
    sel.removeChild( sel.options[1] );
}
function saveClassInfo() {
    var class_ele = document.getElementsByClassName("class_info");

    var obj = {
        "class_name":class_ele['class_name'].value,
        "class_year":parseInt(class_ele['class_year'].value),
        "teacher_id":"gv01",
        "branch_id":class_ele['branch_id'].value,
        "semester_id":class_ele['semester_id'].value,
        "class_strength":parseInt(class_ele['class_strength'].value),
        "class_code":class_ele['class_code'].value
    }
    var class_id = class_ele['class_id'].innerText;

    var jsonData = JSON.stringify(obj);
    console.log(jsonData);
    postNewData(jsonData,class_id);

}
function postNewData(jsonData,class_id) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }

    }
    request.open("POST", `http://localhost:3001/php/classes/class_update.php?class_id=${class_id}`, true);
    request.send(jsonData);
}
