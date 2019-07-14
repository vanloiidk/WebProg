<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");

//include database and object files
include_once '../config/db.php';
include_once './student.php';

$database = new Database();
$db = $database->getConnection();

//initialize
$student = new Student($db);

//read classes
//query classes
$student->class_id=isset($_GET['class_id'])? $_GET['class_id'] : die();

$stmt = $student->readWithClass();
$num = $stmt->rowCount();

//check if more than 0 record found
if($num>0){
    //classes array
    $student_arr = array();
    $student_arr["records"]=array();


    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        //extract row
        //this will make $row['name'] to
        //just $name only
        extract($row);

        $student_item=array(
            "student_id"=>$student_id,
            "student_name"=>$student_name,
            "student_gmail"=>$student_gmail,
            "student_password"=>$student_password,

        );
        array_push($student_arr["records"],$student_item);
    }

    //set response code -200 OK
    http_response_code(200);
    //show classes data in json format
    echo json_encode($student_arr['records']);

}
else{
    http_response_code(404);
    echo json_encode(
        array("message" => "No student found.")
    );
}



?>