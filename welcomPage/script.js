var login = document.getElementById('login');

login.addEventListener('click', redirect)

function redirect() {
  let user = getCookie("myUser");
  if(user == "student") {
    window.location.href = "../attendance-project/recognition/recognition_page.html";
  } else if(user == ""){
    window.location.href = "../attendance-project/login/login_page.html";
  }

  if(user == "teacher") {
    window.location.href = "../html/Dropdown_sidebar.html";
  }
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
