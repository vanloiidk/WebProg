<?php
//require header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//include
include_once '../config/db.php';
include_once './schedule.php';
include_once '../day/day.php';
include_once '../time/time.php';
include_once '../subject/subject.php';


$database = new Database();

$db = $database->getConnection();


$schedule = new Schedule($db);
$subject = new Subject($db);
$day = new Day($db);
$time = new Time($db);
//get data
//    $data = array(
//        "class_id"=>"A003",
//        "class_name"=>"cse A3",
//        "class_year"=>2016,
//        "branch_id"=>"cse",
//        "semester_id"=>"s1",
//        "class_strength"=>70,
//        "class_code"=>""
//    );
//    $jsondata = '{
//        "class_id": "A0005",
//        "class_name": "cseA5",
//        "class_year": 2016,
//        "branch_id": "cse",
//        "semester_id": "s1",
//        "class_strength": 70,
//        "class_code": ""
//    }';
$jsondata = file_get_contents("php://input");


//$data = json_encode($data);
$data = json_decode($jsondata);
//$data = array(
//    "class_id"=>"A0001",
//    "day_name"=>"friday",
//    "schedule_id"=>"sch11",
//    "subject_name"=>"toan",
//    "time_name"=>"morning"
//);

if(
    !empty($data->schedule_id)&&
    !empty($data->subject_name)&&
    !empty($data->day_name)&&
    !empty($data->time_name)

){
    //set class properties value
    $schedule->schedule_id = $data->schedule_id;
    $subject->subject_name = $data->subject_name;
    $day->day_name = $data->day_name;
    $time->time_name = $data->time_name;
    $schedule->subject_name = $data->subject_name;
    $schedule->subject_id = $subject->getSubjectId();
    $schedule->day_id=$day->getDayId();
    $schedule->time_id = $time->getTimeId();
    $schedule->class_id = $data->class_id;

//    create class
    if($schedule->create()){
        http_response_code(200);
        echo json_encode(array("Message"=>"schedule was created"));
    }else{
        http_response_code(503);
        echo json_encode(array("Message"=>"Unable to create new schedule"));
    }
}
else{
    http_response_code(400);
    echo json_encode(array("Message"=> "Unable to create schedule, class info is not complete"));
}



?>