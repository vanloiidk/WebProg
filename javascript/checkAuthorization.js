
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

function checkCookie() {
  let user = getCookie("myUser");
  if(user == "student") {
    window.location.href = "http://localhost:3001/attendance-project/recognition/recognition_page.html";
  } else if(user == ""){
    window.location.href = "http://localhost:3001/attendance-project/login/login_page.html";
  }
}

window.onload = function() {
	checkCookie();
}