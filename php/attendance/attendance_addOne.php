<?php

include_once '../config/db.php';
include_once './attendance.php';


#$date =isset($_GET['date'])? $_GET['date'] : die();
$database = new Database();

$db = $database->getConnection();
$jsondata = file_get_contents("php://input");
$obj = json_decode($jsondata);
$attendances = new Attendances($db);

$attendances->student_id=$obj->student_id;
$schedule_arr = $obj->schedule_arr;
$attendances->attendance_date = $obj->attendance_date;

if(
    !empty($attendances->student_id)&&
    !empty($attendances->attendance_date)&&
    count($schedule_arr)>0
){
    for ($i=0;$i<count($schedule_arr);$i++){
        $attendances->schedule_id = $schedule_arr[$i];
        if($attendances->createNewId()){
            $attendances->addOne();
        }else{
            http_response_code(400);
            echo json_encode(array("Message"=>"unable to add new attendance, failed to create new id"));
        }
    }



}else{
    echo json_encode(array("Message"=>"unable for create attendance, info is incomplete"));
}



?>