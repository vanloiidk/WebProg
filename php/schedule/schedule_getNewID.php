<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/db.php';
include_once './schedule.php';
include_once '../day/day.php';
include_once '../time/time.php';
include_once '../subject/subject.php';

// get database connection
$database = new Database();
$db = $database->getConnection();


$schedule = new Schedule($db);

if($schedule->createNewID()){
    http_response_code(200);
    echo json_encode(array("schedule_id"=>$schedule->schedule_id));
}
else
    http_response_code(400);




?>