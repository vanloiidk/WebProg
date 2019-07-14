var rollNo = document.getElementById('rollNo');
var email = document.getElementById('email');
var password = document.getElementById('password');
var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var images = document.querySelectorAll('#results img');
var submit = document.getElementById('submit');
var status = document.getElementById('status');   


function getImageSrc() {
    var image_src = [];
    for(var i = 0; i < images.length; i++) {
       image_src.push(images[i].src);
    }
    return image_src;
}

function getJsonData() {
    var obj = {
        "rollNo": rollNo.value,
        "email": email.value,
        "password": password.value,
        "firstname": firstname.value,
        "lastname": lastname.value,
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

function send_data_2_python() {
    var img_src = getImageSrc();
    var obj = {
        "rollNo": rollNo.value,
        "student_name": firstname.value + " " + lastname.value,
        "image_src": img_src,
    }
    var url = "http://127.0.0.1:5000/make_dataset";
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function(response) {
            console.log(response);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function send_data_2_PHP() {
    var obj = getJsonData();

    var jsonData = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        if(data.id_exist == "True") {
            $('#message')[0].innerHTML = "Student already exists.";
            update();
            return;
        }

        if(data.gmail_exist == "True") {
            $('#message')[0].innerHTML = "Gmail has been taken.";
            update();
            return;
        }

        send_data_2_python();

        $('#message')[0].innerHTML = "Register successfully.";
        update();
      }
    };
    xmlhttp.open("POST", "registerHandle.php", true);
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

});




