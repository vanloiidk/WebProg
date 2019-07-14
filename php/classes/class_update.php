<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/db.php';
include_once './class.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$class = new Classes($db);


$class->class_id=isset($_GET['class_id'])? $_GET['class_id'] : die();

$jsondata = file_get_contents("php://input");
$obj = json_decode($jsondata);
$class->class_name = $obj->class_name;
$class->class_year= $obj->class_year;
$class->teacher_id=$obj->teacher_id;
$class->branch_id = $obj->branch_id;
$class->semester_id = $obj->semester_id;
$class->class_strength = $obj->class_strength;
$class->class_code = $obj->class_code;



if(
    !empty($class->class_id)&&
    !empty($obj->class_name)&&
    !empty($obj->class_year)&&
    !empty($obj->branch_id)&&
    !empty($obj->semester_id)&&
    !empty($obj->class_strength)

){

    if($class->update()){
        http_response_code(200);
        echo json_encode(array("Message"=>"class was updated"));
    }else{
        http_response_code(503);
        echo json_encode(array("Message"=>"Unable to update class"));
    }
}
else{
    http_response_code(400);
    echo json_encode(array("Message"=> "Unable to update class, class info is not complete"));
}



?>