var takePhoto = document.getElementById('take-photo');
var snap = document.getElementById('snap');
var submit = document.getElementById('submit');
var status = document.getElementById('status');
var imageSnap = document.getElementById('image-snap');
var camera = document.getElementById('camera');
var cameraWrapper = document.getElementById('camera-wrapper');
var image = document.getElementById('image');
var user = document.getElementById("username");
var icon = document.getElementById("icon");
var login = document.getElementById('login');
var tryAgain = document.getElementById('try-again');

window.onload = function() {
	checkCookie();
}

tryAgain.addEventListener('click', function() {
	location.reload();
});

takePhoto.addEventListener('click', function() {
	if(checkLogin() == false) {
		return;
	}
	showCamera();
});
snap.addEventListener('click', take_snapshoot);
icon.addEventListener('click', logout);
//login.addEventListener('click', login);

function login() {
	location.href = "../login/login_page.html";
}

function checkLogin() {
	var username = getCookie("username");
  	if (username == "") {
  		$('#message')[0].innerHTML = "Please login before recognizing.";
        $('#status')[0].style.display = "block";
        return false;
  	}
}

function logout() {
	document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "myUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "class_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

	window.location.href = "../login/login_page.html";
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


function checkCookie() {
  var username = getCookie("username");
  if (username != "") {
  	user.innerHTML = "Hello " + username;
  	icon.style.display = "flex";
  } else {
  	login.style.display = "flex";
  }
}


function showCamera() {
	Webcam.set({
		width: 640,
		height: 480,
		image_format: 'jpeg',
		jpeg_quality: 90
	});
	Webcam.attach('#my-camera');
	updateButton();
}


function updateButton() {
	takePhoto.style.display = "none";
	snap.style.display = "flex";	
	submit.style.display = "flex";	
}

function take_snapshoot() {
	Webcam.snap(function(data_uri) {
		image.src = data_uri;
	});
	
	updateCameraWrapper();
}

function updateCameraWrapper() {
	imageSnap.style.margin = "0 auto";
	imageSnap.style.marginLeft = "0";
	camera.style.marginRight = "0";
}