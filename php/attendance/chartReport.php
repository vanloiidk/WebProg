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
$date_arr = $obj->date_arr;
$report_arr = array();
for ($i = 0;$i<count($date_arr);$i++){
    $attendances->attendance_date = $date_arr[$i];


    $stmt = $attendances->getReport();
    $num = $stmt->rowCount();

//check if more than 0 record found
    if($num>0) {
        //classes array
        $report_arr[$attendances->attendance_date] = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            //extract row
            //this will make $row['name'] to
            //just $name only
//            for($k=1;$k<4;$k++){
//                if($k==1){
//                    $time->time_id =$k;
//                }
//            }

            $time->time_id = (int)$row['time_id'];
//            $time->time_id=2;
            $time->getTimeName();

            $report_item = array(
                "time_name" => $time->time_name,
                "number" => $row['numberCol']

            );
            array_push($report_arr[$attendances->attendance_date], $report_item);
        }
        $count = count($report_arr[$attendances->attendance_date]);
        for ($n=1;$n<4;$n++){
            $add = 1;

            $time->time_id = $n;
//            $time->time_id=2;
            $time->getTimeName();
            for ($m=0;$m<$count;$m++){
                if ($report_arr[$attendances->attendance_date][$m]['time_name']==$time->time_name){
                    $add = 0;
                    break;
                }
            }
            if ($add==1){
                $time->time_id = $n;
                $time->getTimeName();


                $report_item = array(
                    "time_name" => $time->time_name,
                    "number" => 0
                );
                array_push($report_arr[$attendances->attendance_date], $report_item);

            }
        }


    }
    else{
        $report_arr[$attendances->attendance_date] = array();

        for($j=1 ; $j<4;$j++){
            $time->time_id = $j;
            $time->getTimeName();


            $report_item = array(
                "time_name" => $time->time_name,
                "number" => 0
            );
            array_push($report_arr[$attendances->attendance_date], $report_item);
        }
    }

}

http_response_code(200);
echo json_encode($report_arr);


