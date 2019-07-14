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

    if($schedule->deleteOne()){
        http_response_code(200);
        echo json_decode(array("Message"=>"deleted"));
    }
    else {
        http_response_code(400);
        echo json_decode(array("Message"=>"unable to delete schedule"));
    }

?>