var email = document.getElementById('email');
var password = document.getElementById('password');
var submit = document.getElementById('submit');
var message = document.getElementById('message');


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getJsonData() {
    var obj = {
        "email": email.value,
        "password": password.value,
    };
    return obj;
}

function send_data_2_PHP() {
    var obj = getJsonData();

    var jsonData = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var my_obj = JSON.parse(this.responseText);

        setCookie("myUser", my_obj.user, 1);
        setCookie("username", my_obj.username, 1);
        setCookie("id", my_obj.id, 1);
        setCookie("class_id", my_obj.class_id, 1);
        
        if(my_obj.user == "student") {
            window.location.href = "../recognition/recognition_page.html";
        } else {

            window.location.href = "../../html/Dropdown_sidebar.html";
        }
      } 

      if(this.status == 400) {
        $('#message')[0].innerHTML = "Gmail or password is incorrect. Please try again.";
        $('#status')[0].style.display = "block";
        return;
      }
    };
    xmlhttp.open("POST", "loginHandle.php", true);
    //xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(jsonData);
}



submit.addEventListener('click', function() {
    images = document.querySelectorAll('#results img')
    if((email.value == "") || (password.value == "")) {
        $('#message')[0].innerHTML = "Please complete all require.";
        $('#status')[0].style.display = "block";
        return;
    }

    send_data_2_PHP();

});




