<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/db.php';
include_once './teacher.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$teacher = new Teacher($db);


$teacher->teacher_id=isset($_GET['teacher_id'])? $_GET['teacher_id'] : die();

$jsondata = file_get_contents("php://input");
$obj = json_decode($jsondata);
$teacher->teacher_name = $obj->teacher_name;
$teacher->teacher_gmail= $obj->teacher_gmail;
$teacher->teacher_password=$obj->teacher_password;




if(
    !empty($teacher->teacher_id)&&
    !empty($obj->teacher_name)&&
    !empty($obj->teacher_gmail)&&
    !empty($obj->teacher_password)

){

    if($teacher->update()){
        http_response_code(200);
        echo json_encode(array("Message"=>"teacher was updated"));
    }else{
        http_response_code(503);
        echo json_encode(array("Message"=>"Unable to update teacher"));
    }
}
else{
    http_response_code(400);
    echo json_encode(array("Message"=> "Unable to update teacher, teacher info is not complete"));
}



?>