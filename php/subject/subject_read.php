<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");

//include database and object files
include_once '../config/db.php';
include_once './subject.php';

$database = new Database();
$db = $database->getConnection();

$subject = new Subject($db);

$stmt = $subject->read();

$num = $stmt->rowCount();

if($num>0){

    $subjects_arr = array();
    $subjects_arr["records"]=array();

    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
        $subject_item = array(
            "subject_id"=>$subject_id,
            "subject_name"=>$subject_name
        );
        array_push($subjects_arr['records'],$subject_item);


    }
    http_response_code(200);
    echo json_encode($subjects_arr['records']);



}else{
    http_response_code(400);
    echo json_encode(array("Message"=>"No subject found"));
}

?>