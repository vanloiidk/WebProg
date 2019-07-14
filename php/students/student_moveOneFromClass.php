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

$student->student_id=isset($_GET['student_id'])? $_GET['student_id'] : die();
//$class->class_id = "A0001";
if($student->moveOneFromClass()){
    http_response_code(200);
    echo json_encode(array("message"=>" student moved from class"));
}
else{
    http_response_code(400);
    echo json_encode(array("message"=>"unable move student from class"));
}


?>