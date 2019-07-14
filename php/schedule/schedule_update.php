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

// prepare product object
$schedule = new Schedule($db);
$subject = new Subject($db);
$day = new Day($db);
$time = new Time($db);

$jsondata = file_get_contents("php://input");
$obj = json_decode($jsondata);

$schedule->schedule_id = $obj->schedule_id;
//echo $schedule->schedule_id;
$subject->subject_name = $obj->subject_name;

$day->day_name = $obj->day_name;
$time->time_name = $obj->time_name;

$schedule->subject_id = $subject->getSubjectId();
$schedule->day_id = $day->getDayId();
$schedule->time_id = $time->getTimeId();

$obj = array(
    "schedule_id" => $schedule->schedule_id,
    "day_name"=>$day->day_name,
    "time_name"=>$time->time_name,
    "subject_name"=>$subject->subject_name


);
$jsonObj = json_encode($obj);

if($schedule->update()){
    http_response_code(200);
    echo $jsonObj;
}
else {
    http_response_code(400);
    echo json_encode(array("Message"=>"fail to update schedule"));
}



?>