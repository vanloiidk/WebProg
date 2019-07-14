<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/db.php';
include_once './schedule.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$schedule = new Schedule($db);

$schedule->schedule_id=isset($_GET['schedule_id'])? $_GET['schedule_id'] : die();
//$class->class_id = "A0001";
if($schedule->moveOneFromClass()){
    http_response_code(200);
    echo json_encode(array("message"=>" schedule moved from class"));
}
else{
    http_response_code(400);
    echo json_encode(array("message"=>"unable move schedule from class"));
}


?>