var table = document.getElementById("student_table");
var selectedRow

document.addEventListener("DOMContentLoaded",function () {
    getData();
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


function getData() {
    let class_id = getCookie("class_id")
    let tablerows = table.rows.length;
    let tablecols = table.rows[0].cells.length-2;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState==4 && this.status == 200){
            let jsondata = this.responseText;
            let obj = JSON.parse(jsondata);
            console.log(obj.length)

            for(let i = 0; i < obj.length;i++){
                //add new row
                let newrow = table.insertRow(tablerows);


                let name = trimName(obj[i].student_name);
                //add new cell
                let idcell = newrow.insertCell(0);
                idcell.addEventListener('click',function (e) {
                    openModal(newrow.cells[0].innerText, this.parentNode.rowIndex);
                })
                let firstnamecell = newrow.insertCell(1);
                firstnamecell.addEventListener('click',function () {
                    openModal(newrow.cells[0].innerText,this.parentNode.rowIndex);
                })
                let lastnamecell = newrow.insertCell(2);
                lastnamecell.addEventListener('click',function () {
                    openModal(newrow.cells[0].innerText,this.parentNode.rowIndex);
                })
                let absentcell =newrow.insertCell(3);
                absentcell.addEventListener('click',function () {
                    openModal(newrow.cells[0].innerText,this.parentNode.rowIndex);
                })
                let percentcell = newrow.insertCell(4);
                percentcell.addEventListener('click',function () {
                    openModal(newrow.cells[0].innerText,this.parentNode.rowIndex);
                })
                let gmailcell = newrow.insertCell(5);
                gmailcell.addEventListener('click',function () {
                    openModal(newrow.cells[0].innerText,this.parentNode.rowIndex);
                })
                let deletebuttoncell = newrow.insertCell(6);
                idcell.innerHTML = obj[i].student_id;
                firstnamecell.innerHTML = name[0];
                lastnamecell.innerHTML = name[1];
                getabsent();
                getpercent();
                gmailcell.innerHTML = obj[i].student_gmail;
                let deletebt = createdeletebutton(obj[i].student_id);
                deletebuttoncell.append(deletebt);
            }
        }
    }

    request.open("GET",`../php/students/student_readWithClass.php?class_id=${class_id}`,true);
    request.send();
}
function getabsent() {

}
function getpercent() {

}

function createdeletebutton(str) {
    let bt =  document.createElement("button");
    bt.className = "deleteBt";
    bt.id = str;
    bt.innerHTML = "delete";
    bt.addEventListener("click",function () {
        let indexRow = this.parentNode.parentNode.rowIndex;
        console.log(indexRow);
        removeStudent(indexRow);
        deleteStudent(this.id);
    })

    return bt
}
function deleteStudent(student_id) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState ==4&& this.status ==200){

        }
    }
    request.open("GET",`../php/students/student_moveOneFromClass.php?student_id=${student_id}`);
    request.send();
}
function removeStudent(index) {
    table.deleteRow(index);
}

function createeditbutton(str) {
    let bt =  document.createElement("button");
    bt.className = "editBt";
    bt.id = str;
    bt.innerHTML="Edit";

    return bt
}

function trimName(str) {
    let arr = str.split(" ");
    let firstname ="";
    let lastname = arr[arr.length-1];

    for (let i=0;i<arr.length-1;i++){
        firstname = firstname + " "+ arr[i];
    }

    return [firstname,lastname]

}



// Get the modal
var modal = document.getElementById('myStudentModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function openModal(student_id, rowIndex) {
    selectedRow = rowIndex;
    document.getElementById("studentId-input").value=student_id;
    initModal(rowIndex);
    modal.style.display = "block";
    // modal.style.visibility = "visible"
    // setModalValue(rowIndex);

}




// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    // modal.style.visibility = "hidden"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        // modal.style.visibility = "hidden"
    }
}

function initModal(rowIndex) {
    let tablerow = table.rows[rowIndex];
    //
    let studentName_input = document.getElementById("studentName-input");
    let studentGmail_input = document.getElementById("studentGmail-input");

    studentName_input.value = tablerow.cells[1].innerText+" "+tablerow.cells[2].innerText;
    studentGmail_input.value = tablerow.cells[5].innerText

}

function saveStudentModal() {
    //get current info
    let studentId_input = document.getElementById("studentId-input");
    let studentName_input = document.getElementById("studentName-input");
    let studentGmail_input = document.getElementById("studentGmail-input");

    let obj = {
        "student_id":studentId_input.value,
        "student_name":studentName_input.value,
        "student_gmail":studentGmail_input.value
    }

    submitStudentInfo(obj);

}

function submitStudentInfo(obj) {
    let jsondata = JSON.stringify(obj);

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if(this.readyState==4&&this.status==200){
            let responseJson = this.responseText;
            let responseObj = JSON.parse(responseJson);
            updateTableRow(responseObj);
        }
    }
    request.open('POST','../php/students/student_teacherUpdate.php',true);
    request.send(jsondata);
}

function updateTableRow(obj) {
    let tablerow = table.rows[selectedRow];

    let name = trimName(obj.student_name)
    tablerow.cells[1].innerText = name[0];
    tablerow.cells[2].innerText = name[1];
    tablerow.cells[5].innerText = obj.student_gmail;
}