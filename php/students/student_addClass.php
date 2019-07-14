<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/db.php';
include_once './student.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$student = new Student($db);

$jsondata = file_get_contents("php://input");
$obj = json_decode($jsondata);
$student->student_id = $obj->student_id;
$student->class_id= $obj->class_id;


if(
    !empty($student->class_id)&&
    !empty($student->student_id)


){

    if($student->updateClass()){
        http_response_code(200);
        echo json_encode(array("Message"=>"student was added to class"));
    }else{
        http_response_code(503);
        echo json_encode(array("Message"=>"Unable to add student to class"));
    }
}
else{
    http_response_code(400);
    echo json_encode(array("Message"=> "Unable to add student to class, student info is not complete"));
}



?>