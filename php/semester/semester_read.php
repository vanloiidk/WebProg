<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");

//include database and object files
include_once '../config/db.php';
include_once './semester.php';

$database = new Database();
$db = $database->getConnection();

$semester = new Semester($db);

$stmt = $semester->read();

$num = $stmt->rowCount();

if($num>0){

    $semesters_arr = array();
    $semesters_arr["records"]=array();

    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
        $semester_item = array(
            "semester_id"=>$semester_id,
            "semester_name"=>$semester_name
        );
        array_push($semesters_arr['records'],$semester_item);


    }
    http_response_code(200);
    echo json_encode($semesters_arr);



}else{
    http_response_code(400);
    echo json_encode(array("Message"=>"No semester found"));
}

?>