<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");

//include database and object files
include_once '../config/db.php';
include_once './day.php';

$database = new Database();
$db = $database->getConnection();

$day = new Day($db);

$stmt = $day->read();

$num = $stmt->rowCount();

if($num>0){

    $days_arr = array();
    $days_arr["records"]=array();

    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
        $day_item = array(
            "day_id"=>$day_id,
            "day_name"=>$day_name
        );
        array_push($days_arr['records'],$day_item);


    }
    http_response_code(200);
    echo json_encode($days_arr['records']);



}else{
    http_response_code(400);
    echo json_encode(array("Message"=>"No subject found"));
}

?>