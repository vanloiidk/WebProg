var takePhotos = document.getElementById('takePhotos');
var snap = document.getElementById('snap');
var results = document.getElementById('results');
var images = document.querySelectorAll('#results img');
var imagesSelected = [];
var tab = [];
var deleteButton = document.getElementById('delete');
var count = 0;
var status = document.getElementById('status');

takePhotos.addEventListener('click', showCamera);
snap.addEventListener('click', take_snapshoot);
deleteButton.addEventListener('click', deleteImages);



function showCamera() {
	// if(Webcam.live) {
	// 	alert("Webcam has been loaded already.");
	// 	return;
	// }

	Webcam.set({
		width: 320,
		height: 240,
		image_format: 'jpeg',
		jpeg_quality: 90
	});
	Webcam.attach('#my-camera');
}

function take_snapshoot() {
	if(!Webcam.live) {
		alert("Webcam.js Error: Webcam is not loaded yet");
		return;
	}

	if($('.image').length == 10) {
		return;
	}

	Webcam.snap(function(data_uri) {
		results.innerHTML += '<img id="image' + count + '" class="image" style="margin: 0px 10px;" src="'+data_uri+'"/>';
	});
	var id = "image" + count;
	tab.push(id);
	count++;
	updateImageEvent();
}


function deleteImages() {
	for(var i = 0; i < imagesSelected.length; i++) {
		var id = imagesSelected[i];
		var image = document.getElementById(id);
		image.remove();
		tab.splice(tab.indexOf(id), 1);
		console.log(tab);
	}
	imagesSelected = [];
	updateImageEvent();
}


function updateImageEvent() {
	images = document.querySelectorAll('#results img');
	for(var i = 0; i < images.length; i++) {
		images[i].removeEventListener('click', selectImage);
		images[i].addEventListener('click', selectImage);
	}
}

function selectImage() {
	index = tab.indexOf(this.id);
	var id = images[index].id;
	if (imagesSelected.indexOf(id) !== -1) {
		imagesSelected.splice(imagesSelected.indexOf(id), 1);
		images[index].style.border = "none";
	} else {
		imagesSelected.push(id);
		images[index].style.border = "3px solid red";
	}
}