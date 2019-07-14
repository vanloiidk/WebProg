<?php

include_once '../config/db.php';
include_once './attendance.php';
include_once  '../time/time.php';

#$date =isset($_GET['date'])? $_GET['date'] : die();
$database = new Database();

$db = $database->getConnection();
$jsondata = file_get_contents("php://input");
$obj = json_decode($jsondata);
$attendances = new Attendances($db);
$time = new Time($db);
#some thin
$attendances->class_id = $obj->class_id;
$attendances->attendance_date = $obj->attendance_date;

$stmt = $attendances->getReport();

$num = $stmt->rowCount();


if($num>0){

    $data_arr = array();
    $data_arr['record'] = array();


    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $time->time_id=$time_id;
        $time->getTimeName();
        $arr_item = array(
            "time_name"=>$time->time_name,
            "total"=>$numberCol
        );

        array_push($data_arr['record'],$arr_item);
    }

    $count = count($data_arr['record']);
    for ($n=1;$n<4;$n++){
        $add = 1;

        $time->time_id = $n;
//            $time->time_id=2;
        $time->getTimeName();
        for ($m=0;$m<$count;$m++){
            if ($data_arr['record'][$m]['time_name']==$time->time_name){
                $add = 0;
                break;
            }
        }
        if ($add==1){
            $time->time_id = $n;
            $time->getTimeName();


            $data_item = array(
                "time_name" => $time->time_name,
                "total" => 0
            );
            array_push($data_arr['record'], $data_item);

        }
    }


    http_response_code(200);
    echo json_encode($data_arr['record']);

}
else{
    http_response_code(400);
    echo json_encode(array("Message"=>"unable to get data, no data found"));
}


?>