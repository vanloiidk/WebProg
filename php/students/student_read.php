<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");

//include database and object files
include_once '../config/db.php';
include_once './student.php';

$database = new Database();
$db = $database->getConnection();

$student = new Student($db);

$stmt = $student->read();

$num = $stmt->rowCount();

if($num>0){

    $student_arr = array();
    $student_arr["records"]=array();

    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
        $student_item = array(
            "student_id"=>$student_id,
            "student_name"=>$student_name,
            "student_gmail"=>$student_gmail,
            "student_password"=>$student_password,
            "class_id"=>$class_id
        );
        array_push($student_arr['records'],$student_item);


    }
    http_response_code(200);
    echo json_encode($student_arr);



}else{
    http_response_code(400);
    echo json_encode(array("Message"=>"No student found"));
}

?>
