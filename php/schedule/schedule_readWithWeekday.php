<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");

//include database and object files
include_once '../config/db.php';
include_once './schedule.php';

$database = new Database();
$db = $database->getConnection();

//initialize
$schedule = new Schedule($db);
//read classes
//query classes
$jsondata = file_get_contents("php://input");
$obj = json_decode($jsondata);

$schedule->class_id=$obj->class_id;
$schedule->day_id = $obj->day_id;
$stmt = $schedule->readWithWeekday();
$num = $stmt->rowCount();

//check if more than 0 record found
if($num>0){
//    //classes array
    $schedule_arr = array();
    $schedule_arr["morning"]=array();
    $schedule_arr["afternoon"]=array();
    $schedule_arr["evening"]=array();
//
//
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
//        //extract row
//        //this will make $row['name'] to
//        //just $name only
        if($row['time_id']==1){
            array_push($schedule_arr["morning"],$row['subject_name']);
        } else
        if($row['time_id']==2){
            array_push($schedule_arr["afternoon"],$row['subject_name']);
        } else
        if($row['time_id']==3){
            array_push($schedule_arr["evening"],$row['subject_name']);
        }
//
//
    }
//
//    //set response code -200 OK
    http_response_code(200);
//    //show classes data in json format
    echo json_encode($schedule_arr);
//
}
else{
    http_response_code(400);
    echo json_encode(
        array("message" => "No schedule found.")
    );
}



?>