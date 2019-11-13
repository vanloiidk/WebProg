var table = document.getElementById("schedule_table");
var selectedRow
let recordNum = 10;
let selectobj = {};

document.addEventListener("DOMContentLoaded",function () {
    getData();

});

function initModal(rowIndex) {
    getSubjects(rowIndex);
    getSections(rowIndex);
    getWeekdays(rowIndex);
}
function addToTable(index,num,obj) {
    let tablerows = table.rows.length;
    let tablecols = table.rows[0].cells.length-2;
    for(let i = index; i < num+index;i++){
        //add new row
        let newrow = table.insertRow(1);
        //add event for opening editting modal

        //add new cell
        let idcell = newrow.insertCell(0);
        idcell.addEventListener("click",function () {
            removeOptions();
            openModal(obj[i].schedule_id,this.parentNode.rowIndex);
        })
        let subjectidcell = newrow.insertCell(1);
        subjectidcell.addEventListener("click",function () {
            removeOptions();
            openModal(obj[i].schedule_id,this.parentNode.rowIndex);
        })
        let dayidcell = newrow.insertCell(2);
        dayidcell.addEventListener("click",function () {
            removeOptions();
            openModal(obj[i].schedule_id,this.parentNode.rowIndex);
        })
        let timeidcell = newrow.insertCell(3);
        timeidcell.addEventListener("click",function () {
            removeOptions();
            openModal(obj[i].schedule_id,this.parentNode.rowIndex);
        })
        let deletebuttoncell = newrow.insertCell(4);
        console.log(obj[i])
        idcell.innerHTML = obj[i].schedule_id;
        subjectidcell.innerHTML = obj[i].subject_name;
        dayidcell.innerHTML=obj[i].day_name;
        timeidcell.innerHTML=obj[i].time_name;
        let deletebt = createdeletebutton(obj[i].schedule_id);
        deletebuttoncell.append(deletebt);
    }
}
let goToPage=function(e) {
    let index = parseInt(e.target.innerText)
    let pagindiv = document.getElementById("pagingNum");
    let arr = pagindiv.getElementsByTagName('span');
    for(let i =0;i<arr.length;i++){
        arr[i].style.color = "black"
    }
    e.target.style.color ="red"

pageing(index);

}
function pageing(index) {

    let num = index-1
    removeAllStudent();
    console.log(num)
    if(selectobj.length - (num*recordNum+recordNum)>=0){
        addToTable(num*recordNum,recordNum,selectobj)
    }else{
        addToTable(num*recordNum,selectobj.length-num*recordNum,selectobj);
    }
}
function removeAllStudent(){
    for (let i = table.rows.length-1;i>0;i--){
        table.deleteRow(i);
    }
}

function pagination(obj) {
    let pageEll = document.getElementById("pagingNum")
    if(obj.length<=recordNum){
        addToTable(0,obj.length,obj);
    }
    else{
        let pageNum = parseInt(obj.length/recordNum);
        for(let i = 1;i<=pageNum;i++){
            newspan = document.createElement('span');
            newspan.innerText=" "+i.toString()+" ";
            newspan.addEventListener('click',goToPage)
            pageEll.append(newspan)

        }
        //last page
        let lastRecords = obj.length - pageNum*recordNum;
        console.log(pageNum,lastRecords)
        if(lastRecords>0){
            newspan = document.createElement('span');
            newspan.innerText=" "+(pageNum+1).toString()+" ";
            console.log(newspan.innerText)
            newspan.addEventListener('click',goToPage)
            pageEll.append(newspan)
        }
    }
}

function getData() {
    let class_id = getCookie("class_id")
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState==4 && this.status == 200){
            let jsondata = this.responseText;
            let obj = JSON.parse(jsondata);
            console.log(obj.length)
            selectobj = obj;
            let rowIndex;
            pagination(obj);
            if(obj.length>0){
                pageing(1);
                let pagindiv = document.getElementById("pagingNum");
                let arr = pagindiv.getElementsByTagName('span');
                if(arr.length>0){
                  arr[0].style.color='red';

                }
            }




            // for(let i = 0; i < obj.length;i++){
            //     //add new row
            //     let newrow = table.insertRow(tablerows);
            //     //add event for opening editting modal
            //
            //     //add new cell
            //     let idcell = newrow.insertCell(0);
            //     idcell.addEventListener("click",function () {
            //         removeOptions();
            //         openModal(obj[i].schedule_id,this.parentNode.rowIndex);
            //     })
            //     let subjectidcell = newrow.insertCell(1);
            //     subjectidcell.addEventListener("click",function () {
            //         removeOptions();
            //         openModal(obj[i].schedule_id,this.parentNode.rowIndex);
            //     })
            //     let dayidcell = newrow.insertCell(2);
            //     dayidcell.addEventListener("click",function () {
            //         removeOptions();
            //         openModal(obj[i].schedule_id,this.parentNode.rowIndex);
            //     })
            //     let timeidcell = newrow.insertCell(3);
            //     timeidcell.addEventListener("click",function () {
            //         removeOptions();
            //         openModal(obj[i].schedule_id,this.parentNode.rowIndex);
            //     })
            //     let deletebuttoncell = newrow.insertCell(4);
            //
            //     idcell.innerHTML = obj[i].schedule_id;
            //     subjectidcell.innerHTML = obj[i].subject_name;
            //     dayidcell.innerHTML=obj[i].day_name;
            //     timeidcell.innerHTML=obj[i].time_name;
            //     let deletebt = createdeletebutton(obj[i].schedule_id);
            //     deletebuttoncell.append(deletebt);
            // }
        }
    }

    request.open("GET",`http://localhost:3001/php/schedule/schedule_readWithClass.php?class_id=${class_id}`,true);
    request.send();
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


function createdeletebutton(subject_id) {
    var bt =  document.createElement("button");
    bt.className = "deleteBt";
    bt.id = subject_id;
    bt.innerHTML = "delete";
    bt.addEventListener("click",function () {
        var indexRow = this.parentNode.parentNode.rowIndex;
        deleteStudent(this.id,indexRow);
    })

    return bt
}
function deleteStudent(schedule_id,indexRow) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState ==4&& this.status ==200){
            removeStudent(indexRow);
        }
    }
    request.open("GET",`http://localhost:3001/php/schedule/schedule_removeOneFromClass.php?schedule_id=${schedule_id}`);
    request.send();
}
function removeStudent(index) {
    let schedule_id = table.rows[index].cells[0].innerText
    for (let i =0;i<selectobj.length;i++){
        if (selectobj[i].schedule_id==schedule_id){
            selectobj.splice(i,1);
        }
    }



    table.deleteRow(index);
}

function createeditbutton(str) {
    var bt =  document.createElement("button");
    bt.className = "editBt";
    bt.id = str;
    bt.innerHTML="Edit";

    return bt
}

//get all subject

function getSubjects(rowIndex) {
    let tablerow = table.rows[rowIndex]
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState==4&&this.status==200){
            let jsonData = this.responseText;
            let obj = JSON.parse(jsonData);
            for(let i =0;i<obj.length;i++){
                addOption(obj[i].subject_name,'subject-select',tablerow.cells[1].innerText);
            }
        }
    }

    request.open('GET',`http://localhost:3001/php/subject/subject_read.php?`);
    request.send();
}

function addOption(name, mysel, selected) {
    let sel = document.getElementById(mysel);
    let opt = document.createElement('option');
    opt.appendChild( document.createTextNode(name) );
    opt.value = name;
    sel.appendChild(opt);
    sel.value = selected
}

//get all weekday
function getWeekdays(rowIndex) {
    let talerow = table.rows[rowIndex]
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState==4&&this.status==200){
            let jsonData = this.responseText;
            let obj = JSON.parse(jsonData);
            for(let i =0;i<obj.length;i++){
                addOption(obj[i].day_name,'weekday-select',talerow.cells[2].innerText);
            }
        }
    }
    let day_id = "";
    request.open('GET',`http://localhost:3001/php/day/day_read.php?`);
    request.send();
}


//get all sections

function getSections(rowIndex) {
    console.log("row index in sections: ",rowIndex)
    let tablerow = table.rows[rowIndex]

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState==4&&this.status==200){
            let jsonData = this.responseText;
            let obj = JSON.parse(jsonData);
            for(let i =0;i<obj.length;i++){
                addOption(obj[i].time_name,'section-select',tablerow.cells[3].innerText);
            }
        }
    }
    let time_id = "";
    request.open('GET',`http://localhost:3001/php/time/time_read.php?`);
    request.send();
}




//control modal

// Get the modal
var modal = document.getElementById('myScheduleModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function openModal(schedule_id, rowIndex) {
    selectedRow = rowIndex;
    document.getElementById("schedule-input").value=schedule_id;
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

function removeOptions() {
    let subjectInput = document.getElementById("subject-select");
    let weekdayInput = document.getElementById("weekday-select");
    let sectionInput = document.getElementById("section-select");
    for(let i = subjectInput.length-1;i>=0;i--){
        subjectInput.remove(i);
    }

    for(let i = weekdayInput.length-1;i>=0;i--){
        weekdayInput.remove(i);
    }

    for(let i = sectionInput.length-1;i>=0;i--){
        sectionInput.remove(i);
    }


}

function setModalValue(index) {
    console.log("login_page.html", index)
    let tablerow = table.rows[index];
    let subjectInput = document.getElementById("subject-select");
    let weekdayInput = document.getElementById("weekday-select");
    let sectionInput = document.getElementById("section-select");

    subjectInput.value = tablerow.cells[1].innerText;
    weekdayInput.value = tablerow.cells[2].innerText;
    sectionInput.value = tablerow.cells[3].innerText;

}

function saveModal() {
    let schedule_id = document.getElementById("schedule-input").value;
    let subject_name = document.getElementById("subject-select").value;
    let dayOfWeek = document.getElementById("weekday-select").value;
    let section = document.getElementById("section-select").value;

    let obj = {
        "schedule_id": schedule_id,
        "subject_name": subject_name,
        "day_name":dayOfWeek,
        "time_name":section
    }
    let jsondata = JSON.stringify(obj);

    submitModal(jsondata)

}
function submitModal(jsondata) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if(this.readyState==4&&this.status==200){
            updateRow(JSON.parse(this.responseText))

        }
    }

    request.open('POST','http://localhost:3001/php/schedule/schedule_update.php',true);
    request.send(jsondata);

}

function updateRow(obj) {
    let tablerow = table.rows[selectedRow];
    tablerow.cells[1].innerText = obj.subject_name;
    tablerow.cells[2].innerText = obj.day_name;
    tablerow.cells[3].innerText = obj.time_name;
}
function convertDay(number) {
    switch (number) {
        case 2:
            return "monday";
            break
        case 3:
            return "tuesday";
            break
        case 4:
            return "thursday";
            break
        case 5:
            return "wednesday";
            break
        case 6:
            return "friday";
            break
        case 7:
            return "saturday";
            break
        case 0:
            return "sunday";
            break
        default:
            break
    }
}
function convertTimem(number) {
    switch (number) {
        case 1:
            return "morning";
            break
        case 2:
            return "afternoon";
            break
        case 3:
            return "evening";
            break
        default :
            break
    }
}
