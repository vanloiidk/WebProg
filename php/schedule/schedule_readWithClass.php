<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");

//include database and object files
include_once '../config/db.php';
include_once './schedule.php';
include_once '../time/time.php';
include_once '../day/day.php';

$database = new Database();
$db = $database->getConnection();

//initialize
$schedule = new Schedule($db);

//read classes
//query classes
$schedule->class_id=isset($_GET['class_id'])? $_GET['class_id'] : die();

$stmt = $schedule->readWithClass();
$num = $stmt->rowCount();
$day = new Day($db);
$time = new Time($db);
//check if more than 0 record found
if($num>0){
    //classes array
    $schedule_arr = array();
    $schedule_arr["records"]=array();


    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        //extract row
        //this will make $row['name'] to
        //just $name only
        extract($row);

        $day->day_id = $day_id;
        $day->readOne();
        $day_name=$day->day_name;
        $time->time_id=$time_id;
        $time->readOne();
        $time_name=$time->time_name;

        $schedule_item=array(
            "schedule_id"=>$schedule_id,
            "subject_id"=>$subject_id,
            "subject_name"=>$subject_name,
            "day_name"=>$day_name,
            "time_name"=>$time_name,
        );
        array_push($schedule_arr["records"],$schedule_item);
    }

    //set response code -200 OK
    http_response_code(200);
    //show classes data in json format
    echo json_encode($schedule_arr['records']);

}
else{
    http_response_code(404);
    echo json_encode(
        array("message" => "No schedule found.")
    );
}



?>