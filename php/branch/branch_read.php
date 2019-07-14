<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");

//include database and object files
include_once '../config/db.php';
include_once './branch.php';

$database = new Database();
$db = $database->getConnection();

$branch = new Branchs($db);

$stmt = $branch->read();

$num = $stmt->rowCount();

if($num>0){
    $branchs_arr = array();
    $branchs_arr["records"]=array();

    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);

        $branch_item = array(
            "branch_id"=>$branch_id,
            "branch_name"=>$branch_name,
            "branch_des"=>html_entity_decode($branch_description)
        );

        array_push($branchs_arr['records'],$branch_item);


    }
    http_response_code(200);
    echo json_encode($branchs_arr);



}else{
    http_response_code(400);
    echo json_encode(array("Message"=>"No branch found"));
}

?>