<?php
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
$jsondata = file_get_contents("php://input");
$obj = json_decode($jsondata);
$schedule->class_id = $obj->class_id;
$schedule->day_id = $obj->day_id;
$schedule->time_id = $obj->time_id;

if(
    !empty($schedule->class_id)&&
    !empty($schedule->day_id)&&
    !empty($schedule->time_id)
){
    $stmt = $schedule->check();
    $num = $stmt->rowCount();
    if($num>0){
        $schedule_arr = array();
        $schedule_arr["record"]=array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

            extract($row);

            $schedule_item = array(
              "schedule_id"=>$schedule_id
            );

            array_push($schedule_arr["record"],$schedule_item);



        }
        http_response_code(200);
        echo json_encode($schedule_arr["record"]);
    }
    else{
        http_response_code(401);
        echo json_encode(array("Message"=>"unable to check schedule, there is no record found"));
    }
}
else{
    http_response_code(400);
    echo json_encode(array("Message"=>"unable to check schedule, data is incomplete"));
}



?>