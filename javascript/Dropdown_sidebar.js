var logout = document.getElementById('logout');
var greeting = document.getElementById("greeting");
logout.addEventListener('click', logout2);

window.onload = function() {
	checkCookie2();
}

function logout2() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "myUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "class_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "../attendance-project/login/login_page.html";
}

function getCookie2(cname) {
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

function checkCookie2() {
  let user = getCookie2("myUser");
  if(user == "student") {
    window.location.href = "../attendance-project/recognition/recognition_page.html";
  } else if(user == ""){
    window.location.href = "../attendance-project/login/login_page.html";
  }

  if(user == "teacher") {
    var teacher_name = getCookie2("username");
    greeting.innerHTML = "Hello " + teacher_name;
    logout.style.display = "inline";
  }
}



