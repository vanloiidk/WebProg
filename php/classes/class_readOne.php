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
//$class->class_id = "A0001";
$class->readOne();

if($class->class_name!=null){
    $class_arr = array(
        "class_id"=> $class->class_id,
        "class_name"=>$class->class_name,
        "class_year"=>$class->class_year,
        "teacher_id"=>$class->teacher_id,
        "branch_id"=>$class->branch_id,
        "semester_id"=>$class->semester_id,
        "class_strength"=>$class->class_strength,
        "class_code"=>$class->class_code

    );
    http_response_code(201);

    echo json_encode($class_arr);

}
else{
    http_response_code(404);
    echo json_encode(array("Message"=>"class does not exits"));

}

?>