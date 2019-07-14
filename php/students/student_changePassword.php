<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
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
$student->student_password= $obj->student_password;

if($student->updatePassword()){
    http_response_code(200);
    echo json_encode(array("Message"=>"student was updated"));
}else{
    http_response_code(503);
    echo json_encode(array("Message"=>"Unable to update student"));
}







?>