let table = document.getElementById("schedule-table")
let selectedCell;

let color = ["red","orange","blue","green","gray"]

let subjectColor= {}
setSubjetColor()
function setSubjetColor() {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState==4&&this.status==200){
                let objs = JSON.parse(this.responseText);
                for(let i =0; i< objs.length;i++){
                    subjectColor[objs[i].subject_name]=color[i]
                    console.log(color[i])

                }

            }
        }
        request.open('GET','http://localhost:3001/php/subject/subject_read.php');
        request.send()

}

let newSchedule = function(e){
    selectedCell = e.target;
    createNewSchedule(e.target)
}

let dataSchedule = function(e){
    openModal(e.target)

}

document.addEventListener("DOMContentLoaded",function () {
    //clearTable()
    addScheduleEvent();
    getSchedule()
})

function addScheduleEvent() {
    let tablerows = table.rows.length;
    let tablecols= table.rows[0].cells.length;
    // console.log(tablerows,tablecols)


    for(let i = 1;i<tablerows;i++){
        for (let j = 1; j<tablecols;j++){
            if(i==1||i==6||i==11){

                table.rows[i].cells[j].addEventListener('click',newSchedule);



            }else {
                // console.log(i,j)
                table.rows[i].cells[j-1].addEventListener('click',newSchedule);

            }
        }
    }
}
function createNewSchedule(cell) {
    openAddModal(cell)
}



function clearTable() {
    let tablerows = table.rows.length;
    let tablecols= table.rows[0].cells.length;
    // console.log(tablerows,tablecols)


    for(let i = 1;i<tablerows;i++){
        for (let j = 1; j<tablecols;j++){
            if(i==1||i==6||i==11){

                table.rows[i].cells[j].innerText=="";
                table.rows[i].cells[j].outerHTML=table.rows[i].cells[j].outerHTML;


            }else {
                // console.log(i,j)
                table.rows[i].cells[j-1].innerText == "";
                table.rows[i].cells[j-1].outerHTML=table.rows[i].cells[j-1].outerHTML;

            }
        }
    }
}

function getSchedule() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState==4&& this.status==200){
            let jsondata = this.responseText;
            let objs = JSON.parse(jsondata);
            pushToTable(objs);
        }
    }
    let class_id = getCookie("class_id");
    request.open('GET',`http://localhost:3001/php/schedule/schedule_readWithClass.php?class_id=${class_id}`,true);
    request.send();
}

function pushToTable(objs) {
    tableheader = document.getElementsByTagName("th");
    sections = document.getElementsByClassName("section")
    for(let i = 0;i<objs.length;i++){
        for(let j=0;j<tableheader.length;j++){
            if(tableheader[j].innerText.toUpperCase()==objs[i].day_name.toUpperCase()){
                for (let k = 0 ; k<sections.length; k++){
                    if(objs[i].time_name.toUpperCase()==sections[k].innerText.toUpperCase()){

                        pushEvent(objs[i],tableheader[j].cellIndex,sections[k].parentNode.rowIndex)
                    }
                }
            }
        }
    }
}

function getColor(cell) {
    let x = cell.cellIndex;
    let y = cell.parentNode.rowIndex;
    let top
    let left
    let bottom
    let right

    if(y==1||y==6||y==11){
        top = table.rows[y-1].cells[x];
        bottom= table.rows[y+1].cells[x-1];
        left = table.rows[y].cells[x-1];
        right = table.rows[y].cells[x+1];
    }
    else if(y==2||y==7||y==12){
        top = table.rows[y-1].cells[x+1];
        bottom= table.rows[y+1].cells[x];
        left = table.rows[y].cells[x-1];
        right = table.rows[y].cells[x+1];
    }else if (y==5||y==10||y==15){
        top = table.rows[y-1].cells[x];
        bottom= table.rows[y+1].cells[x+1];
        left = table.rows[y].cells[x-1];
        right = table.rows[y].cells[x+1];
    }else{
        top = table.rows[y-1].cells[x];
        bottom= table.rows[y+1].cells[x];
        left = table.rows[y].cells[x-1];
        right = table.rows[y].cells[x+1];
    }
    for(let i = 0; i<color.length;i++){
        if(color[i]!=getCellColor(top)&&color[i]!=getCellColor(bottom)&&color[i]!=getCellColor(left)&&color[i]!=getCellColor(right)){
            return color[i]
        }
    }
}

function getCellColor(cell) {
    return cell.style.backgroundColor;
}

function pushEvent(obj,columnIndex,rowIndex) {
    if(table.rows[rowIndex].cells[columnIndex].innerText==""){
        let cell = table.rows[rowIndex].cells[columnIndex];

        addEvent(rowIndex,columnIndex)
        
        cell.style.background = subjectColor[obj.subject_name];
        cell.innerText= obj.subject_name.toUpperCase();
        cell.id=obj.schedule_id;
        return;
    }

        for(let i = rowIndex+1 ;i<rowIndex+5;i++){
            if(table.rows[i].cells[columnIndex-1].innerText==""){
                table.rows[i].cells[columnIndex-1].outerHTML = table.rows[i].cells[columnIndex].outerHTML;
                addEvent(i,columnIndex-1);
                table.rows[i].cells[columnIndex-1].style.background = subjectColor[obj.subject_name]
                table.rows[i].cells[columnIndex-1].innerText= obj.subject_name.toUpperCase();
                table.rows[i].cells[columnIndex-1].id=obj.schedule_id;
                break;
            }
        }
}


function addEvent(rowIndex,colIndex) {
    let cell = table.rows[rowIndex].cells[colIndex];
    cell.removeEventListener('click',newSchedule)
    cell.addEventListener('click',dataSchedule)
}





//control modal

// Get the modal
var modal = document.getElementById('myScheduleModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function openModal(cell) {
    selectedCell = cell;
    setModalInfo(cell);
    modal.style.display = "block";
    // modal.style.visibility = "visible"
    // setModalValue(rowIndex);



}




// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    // modal.style.visibility = "hidden"
}
function closeModal(){
    modal.style.display = "none";

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        // modal.style.visibility = "hidden"
    }else
        if (event.target == addModal) {
        addModal.style.display = "none";
        // modal.style.visibility = "hidden"
    }
}
function setModalInfo(cell) {
    let y = cell.parentNode.rowIndex;
    let id_input = document.getElementById("schedule-input")
    id_input.value = cell.id;
    getSubjects(cell.innerText.toLowerCase());
    let week_day = document.getElementById("weekday-input")
    let section = document.getElementById("section-input")
    let rowindex = parseInt(cell.parentNode.rowIndex/5);
    section.value = table.rows[rowindex*5+1].cells[0].innerText;
    if (y==1||y==6||y==11){
        week_day.value = table.rows[0].cells[cell.cellIndex].innerText
    }else{
        week_day.value = table.rows[0].cells[cell.cellIndex+1].innerText
    }

}

function getSubjects(selected) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState==4&&this.status==200){
            let objs = JSON.parse(this.responseText);
            addOption(objs,"subject-select",selected);

        }
    }
    request.open('GET','http://localhost:3001/php/subject/subject_read.php');
    request.send()
}

function addOption(objs, sel_id, selected) {
    let sel = document.getElementById(sel_id);
    removeOldOption(sel);

    for (let i = 0 ; i<objs.length;i++) {
        let newoption = document.createElement('option');
        newoption.appendChild(document.createTextNode(objs[i].subject_name))
        newoption.value = objs[i].subject_name;
        sel.appendChild(newoption);
    }

    sel.value = selected;
}
function removeOldOption(sel) {
    for (let i = sel.length-1 ;i>=0;i--){
        sel.remove(i);
    }
}

function getModalInfo() {
    let schedule_id = document.getElementById("schedule-input").value;
    let subject_name = document.getElementById("subject-select").value;
    let day_name = document.getElementById("weekday-input").value;
    let time_name = document.getElementById("section-input").value;

    let obj = {
        "schedule_id": schedule_id,
        "subject_name":subject_name.toLowerCase(),
        "day_name":day_name.toLowerCase(),
        "time_name":time_name.toLowerCase(),
        "class_id":getCookie("class_id")
    }

    return obj;
}

function saveModal() {
    let obj = getModalInfo()


    submitModal(obj)

}
function submitModal(obj) {
    let jsondata = JSON.stringify(obj)
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if(this.readyState==4&&this.status==200){
            selectedCell.innerText = obj.subject_name.toUpperCase();
            selectedCell.style.background = subjectColor[obj.subject_name]
            closeModal();

        }
    }

    request.open('POST','http://localhost:3001/php/schedule/schedule_update.php',true);
    request.send(jsondata);

}


let deletebt = document.getElementById("deleteModalBt");

deletebt.addEventListener('click',function () {
    delSchedule()
})

function delSchedule() {
    let obj = getModalInfo();
    let schedule_id = obj.schedule_id;


    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState==4&&this.status==200){
            setDefaultCell();
            closeModal();
        }
    }

    request.open('GET',`http://localhost:3001/php/schedule/schedule_deleteOne.php?schedule_id=${schedule_id}`);
    request.send();
}

function setDefaultCell() {
    selectedCell.style.background = "white";
    selectedCell.innerText = "";
    selectedCell.removeEventListener('click',dataSchedule)
    selectedCell.addEventListener('click',newSchedule);

}







//control modal

// Get the modal
var addModal = document.getElementById('myAddScheduleModal');


// Get the <span> element that closes the modal
var addspan = document.getElementsByClassName("addClose")[0];

// When the user clicks the button, open the modal
function openAddModal(cell) {
    getNewScheduleId()
    getAddSubjects()
    let week_day = document.getElementById("add-weekday-input")
    let section = document.getElementById("add-section-input")
    let rowindex = parseInt(cell.parentNode.rowIndex/5);
    if(cell.parentNode.rowIndex%5==0){
        rowindex=0
    }
    section.value = table.rows[rowindex*5+1].cells[0].innerText;
    if(cell.parentNode.rowIndex%5==1){
        week_day.value = table.rows[0].cells[cell.cellIndex].innerText

    }
    else {
        week_day.value = table.rows[0].cells[cell.cellIndex+1].innerText

    }
    addModal.style.display = "block";
    // modal.style.visibility = "visible"
    // setModalValue(rowIndex);

}


// When the user clicks on <span> (x), close the modal
addspan.onclick = function() {
    addModal.style.display = "none";
    // modal.style.visibility = "hidden"
}
function closeAddModal() {
    addModal.style.display = "none";

}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == addModal) {
//         addModal.style.display = "none";
//         // modal.style.visibility = "hidden"
//     }
// }

function getAddSubjects() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState==4&&this.status==200){
            let objs = JSON.parse(this.responseText);
            addAddOption(objs,"add-subject-select");

        }
    }
    request.open('GET','http://localhost:3001/php/subject/subject_read.php');
    request.send()
}

function addAddOption(objs, sel_id) {
    let sel = document.getElementById(sel_id);
    removeAddOldOption(sel);

    for (let i = 0 ; i<objs.length;i++) {
        let newoption = document.createElement('option');
        newoption.appendChild(document.createTextNode(objs[i].subject_name))
        newoption.value = objs[i].subject_name;
        sel.appendChild(newoption);
    }

}
function removeAddOldOption(sel) {
    for (let i = sel.length-1 ;i>=0;i--){
        sel.remove(i);
    }
}

function createSchedule() {
    //get modal info
    let obj = getaddModalInfo();
    let jsondata = JSON.stringify(obj);
    let request = new XMLHttpRequest()

    request.onreadystatechange =function () {
        if (this.readyState==4&&this.status==200){
            changeCellInfo(obj);
            closeAddModal();


        }
    }

    request.open('POST','http://localhost:3001/php/schedule/schedule_create.php',true);
    request.send(jsondata);
}
function changeCellInfo(obj) {
    console.log(obj)
    console.log(selectedCell);
    console.log(subjectColor);
    selectedCell.style.background = subjectColor[obj.subject_name];
    selectedCell.innerText = obj.subject_name.toUpperCase();
    selectedCell.id = obj.schedule_id;
    selectedCell.removeEventListener('click',newSchedule);
    selectedCell.addEventListener('click',dataSchedule)
}

function getNewScheduleId(){
    let request = new XMLHttpRequest()

    request.onreadystatechange = function () {
        if (this.readyState==4&&this.status==200){
            let obj = JSON.parse(this.responseText);
            document.getElementById("add-schedule-input").value=obj.schedule_id;


        }
    }

    request.open('GET','http://localhost:3001/php/schedule/schedule_getNewID.php',true)
    request.send();
}

function getaddModalInfo() {
    let schedule_id = document.getElementById("add-schedule-input").value;
    let subject_name = document.getElementById("add-subject-select").value;
    let day_name = document.getElementById("add-weekday-input").value;
    let time_name = document.getElementById("add-section-input").value;

    let obj = {
        "schedule_id": schedule_id,
        "subject_name":subject_name.toLowerCase(),
        "day_name":day_name.toLowerCase(),
        "time_name":time_name.toLowerCase(),
        "class_id":getCookie("class_id")
    }

    return obj;
}





