function getMaincontent() {
    hashtag = getHashTag();
    maincontent = document.getElementById("content");
    switch (hashtag) {
        case "edit-setting":
            maincontent.setAttribute("src","editSettingPage.html")
            break
        case "edit-tutor-profile":
            maincontent.setAttribute("src","editTutorProfile.html")
            break
        case "add-new-student":
            maincontent.setAttribute("src", "addNewStudent.html")
            break
        case "create-new-student":
            maincontent.setAttribute("src","../attendance-project/register/index.html")
            break
        case "edit-student":
            maincontent.setAttribute("src","editStudents.html")
            break
        case "add-schedule":
            maincontent.setAttribute("src","addSchedule.html")
            break
        case "edit-schedule":
            maincontent.setAttribute("src","editSchedule.html")
            break
        case "dashboard":
            maincontent.setAttribute("src","../attendance-project/dashboard/index.html")

    }
}
function getHashTag() {
    return window.location.hash.substring(1);
}
    