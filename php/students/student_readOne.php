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
$student->readOne();

if($student->student_name!=null){
    $student_arr = array(
        "student_id"=> $student->class_id,
        "student_name"=>$student->student_name,
        "student_gmail"=>$student->student_gmail,
        "student_password"=>$student->student_password,
        "class_id"=>$student->class_id

    );
    http_response_code(200);

    echo json_encode($student_arr);

}
else{
    http_response_code(404);
    echo json_encode(array("Message"=>"student does not exits"));

}

?>