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
//$teacher->teacher_id='gv01';
$teacher->readOne();

if($teacher->teacher_name!=null){
    $teacher_arr = array(
        "teacher_id"=> $teacher->teacher_id,
        "teacher_name"=>$teacher->teacher_name,
        "teacher_gmail"=>$teacher->teacher_gmail,
        "teacher_password"=>$teacher->teacher_password
    );
    http_response_code(200);

    echo json_encode($teacher_arr);

}
else{
    http_response_code(404);
    echo json_encode(array("Message"=>"teacher does not exits"));

}

?>