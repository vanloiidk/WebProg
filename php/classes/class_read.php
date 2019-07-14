<?php
    header("Access-Control-Allow-Origin:*");
    header("Content-Type: application/json; charset=UTF-8");

    //include database and object files
    include_once '../config/db.php';
    include_once './class.php';

    $database = new Database();
    $db = $database->getConnection();

    //initialize
    $class = new Classes($db);

    //read classes
    //query classes
    $stmt = $class->read();
    $num = $stmt->rowCount();

    //check if more than 0 record found
    if($num>0){
        //classes array
        $classes_arr = array();
        $classes_arr["records"]=array();


        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            //extract row
            //this will make $row['name'] to
            //just $name only
            extract($row);

            $class_item=array(
                "class_id"=>$class_id,
                "class_name"=>$class_name,
                "class_year"=>$class_year,
                "teacher_id"=>$teacher_id,
                "branch_id"=>$branch_id,
                "semester_id"=>$semester_id,
                "class_strength"=>$class_strength,
                "class_code"=>$class_code
            );
            array_push($classes_arr["records"],$class_item);
        }

        //set response code -200 OK
        http_response_code(200);
        //show classes data in json format
        echo json_encode($classes_arr);

    }
    else{
        http_response_code(404);
        echo json_encode(
            array("message" => "No classes found.")
        );
    }



?>