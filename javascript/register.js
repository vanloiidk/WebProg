var rollNo = document.getElementById('rollNo');
var email = document.getElementById('email');
var password = document.getElementById('password');
var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var images = document.querySelectorAll('#results img');
var submit = document.getElementById('submit');
var status = document.getElementById('status');   


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getImageSrc() {
    var image_src = [];
    for(var i = 0; i < images.length; i++) {
       image_src.push(images[i].src);
    }
    return image_src;
}

function getJsonData() {
    var img_src = getImageSrc();
    var obj = {
        "rollNo": rollNo.value,
        "email": email.value,
        "password": password.value,
        "firstname": firstname.value,
        "lastname": lastname.value,
        "image_src": img_src
    };
    return obj;
}

function update() {
    Webcam.reset();
    $('#status')[0].style.display = "block";
    $('#form')[0].reset();
    deleteImages();
}

function deleteImages() {
    images = document.querySelectorAll('#results img');
    for(var i = 0; i < images.length; i++) {
        var id = images[i].id;
        var image = document.getElementById(id);
        image.remove();
    }
}

function pass_values_2_python() {
    var student_id = rollNo.value;
    url = 'http://127.0.0.1:5000/make_dataset?student_id=' + student_id;
    
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var obj = JSON.parse(this.responseText);
        if(obj.repply == "Success") {
            return;
        }
      }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.send();
}

function send_data_2_PHP() {
    var obj = getJsonData();

    var jsonData = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var obj = JSON.parse(this.responseText);
        if(obj.exist == "True") {
            $('#message')[0].innerHTML = "Student already exists.";
            update();
            return;
        }

        $('#message')[0].innerHTML = "Register successfully.";
        update();
      }
    };
    xmlhttp.open("POST", "registerHandle.php", true);
    //xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(jsonData);
}



submit.addEventListener('click', function() {
    images = document.querySelectorAll('#results img')
    if((rollNo.value == "") || (email.value == "") 
        || (password.value == "") || (firstname.value == "") 
        || (lastname.value == "") || (images.length == 0)) {
        $('#message')[0].innerHTML = "Please complete all require.";
        $('#status')[0].style.display = "block";
        return;
    }

    send_data_2_PHP();

    pass_values_2_python();

});




