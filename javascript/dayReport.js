let date = new Date();
let today = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()

function setTotalStudent(count){
  let totalEl = document.getElementById("totalStudent");
  totalEl.innerText = count;
}

let reportf = function(){
    getTotalStudent();

}

window.onload = reportf

function getDate() {
    document.getElementsByTagName("h2")[0].innerText = today;

}
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

function getChartData() {
    let obj = {
        "attendance_date":"1997-12-20",
        "class_id":getCookie("class_id")
    }
    let jsondata= JSON.stringify(obj);
    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (this.readyState==4&&this.status==200){
            let obj = JSON.parse(this.responseText);
            /*
            * obj like
            * {
            * "1": 60,
            * "2":60,
            * "3": 70
            * }
            *
            * */
        }
    }

    request.open('POST',`http://localhost:3001/php/attendance/chartReport.php`);
    request.send(jsondata);
}

function getTotalStudent(){
  let class_id = getCookie("class_id");
  let request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if(this.readyState==4&&this.status==200){
      let obj = JSON.parse(this.responseText);
      setTotalStudent(obj.total);
    }
  }

  request.open('GET',`http://localhost:3001/php/students/student_countWithClass.php?class_id=${class_id}`,true);
  request.send();
}