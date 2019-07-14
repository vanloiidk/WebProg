var searchInputs = document.getElementsByClassName("searchInput");
let idInput = document.getElementById("studentIdInput");
let nameInput = document.getElementById("studentNameInput");
let gmailInput = document.getElementById("studentGmailInput");
let table = document.getElementById("addNewStudentTable");

for(let i=0;i<searchInputs.length;i++){
    searchInputs[i].addEventListener("input",function () {
        Search();
    })
}
function removeAllTable() {
    let tablerows = table.rows.length;
    for(let i =1;i<tablerows;i++){
        table.deleteRow(1);
    }
}
function Search() {
    let obj = GetObject();
    if(!obj){
        removeAllTable();
        return
    }
    let jsondata = JSON.stringify(obj);

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState==4&&this.status==200){
            let resObj = JSON.parse(this.responseText);
            addTable(resObj);


        }

        if (this.status==400){
            removeAllTable();
            return;
        }
    }



    request.open('POST','../php/students/student_searchWithoutClass.php');
    request.send(jsondata);
}

function addTable(Obj) {
    let remove_arr=[];
    let add_arr=[];

    
    for (let i = 1 ;i < table.rows.length;i++){
        if (!findInResponse(table.rows[i].cells[0].innerText,Obj)){
            remove_arr.push(i);
        }
    }


    for (let i = 0;i<Obj.length;i++){
        if (!findInTable(Obj[i].student_id)){
            add_arr.push(i);
        }
    }

    for (let i =remove_arr.length-1;i>=0;i--){
        table.deleteRow(remove_arr[i]);
    }

    for (let i = 0;i<add_arr.length;i++){
        let tablerows = table.rows.length;
        let newrow = table.insertRow(tablerows);
        let idCell = newrow.insertCell(0);
        let nameCell = newrow.insertCell(1);
        let gmailCell = newrow.insertCell(2);
        let BTCell = newrow.insertCell(3);

        idCell.innerText = Obj[add_arr[i]].student_id;
        nameCell.innerText = Obj[add_arr[i]].student_name;
        gmailCell.innerText = Obj[add_arr[i]].student_gmail;

        let bt = createAddButton(Obj[add_arr[i]].student_id)
        BTCell.append(bt);
    }

}
function createAddButton(student_id) {
    let bt = document.createElement('button');
    bt.id = student_id;
    bt.textContent = "ADD";
    bt.addEventListener('click',function () {
        addClass(this.id);
        this.style.display ="none";
    })

    return bt;
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

function addClass(student_id) {
    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (this.readyState==4&&this.status==200){

        }


    }

    let obj = {
        "student_id":student_id,
        "class_id":getCookie("class_id")
    }

    let jsondata = JSON.stringify(obj);

    request.open("POST",'../php/students/student_addClass.php',true);
    request.send(jsondata);
}

function findInTable(student_id) {
    let tablerows = table.rows.length;
    for (let i = 1;i<tablerows;i++){
        if(table.rows[i].cells[0].innerText==student_id){
            return true;
        }
    }
    return false;
}

function findInResponse(student_id,Obj) {
    for(let i = 0;i<Obj.length;i++){
        if (Obj[i].student_id==student_id){
           return true;
        }
    }
    return false;
}

function GetObject(){
    // get info
    let student_id = idInput.value;
    let student_name = nameInput.value;
    let student_gmail = gmailInput.value;

    if (student_id==""&&student_name==""&&student_gmail==""){
        return null;
    }
    //create student obj

    let student = {
        "student_id":student_id,
        "student_name":student_name,
        "student_gmail":student_gmail
    }
    return student;

}