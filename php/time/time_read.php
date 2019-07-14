<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");

//include database and object files
include_once '../config/db.php';
include_once './time.php';

$database = new Database();
$db = $database->getConnection();

$time = new Time($db);

$stmt = $time->read();

$num = $stmt->rowCount();

if($num>0){

    $times_arr = array();
    $times_arr["records"]=array();

    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
        $time_item = array(
            "time_id"=>$time_id,
            "time_name"=>$time_name
        );
        array_push($times_arr['records'],$time_item);


    }
    http_response_code(200);
    echo json_encode($times_arr['records']);



}else{
    http_response_code(400);
    echo json_encode(array("Message"=>"No time found"));
}

?>