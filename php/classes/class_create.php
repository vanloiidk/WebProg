<?php
    //require header
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    //include
    include_once './config/db.php';
    include_once './class.php';

    $database = new Database();
    $db = $database->getConnection();

    $class = new Classes($db);

    //get data
//    $data = array(
//        "class_id"=>"A003",
//        "class_name"=>"cse A3",
//        "class_year"=>2016,
//        "branch_id"=>"cse",
//        "semester_id"=>"s1",
//        "class_strength"=>70,
//        "class_code"=>""
//    );
//    $jsondata = '{
//        "class_id": "A0005",
//        "class_name": "cseA5",
//        "class_year": 2016,
//        "branch_id": "cse",
//        "semester_id": "s1",
//        "class_strength": 70,
//        "class_code": ""
//    }';
    $jsondata = file_get_contents("php://input");


//    $data = json_encode($data);
    $data = json_decode($jsondata);

    if(
                                                                                                                                                                                                                                                                                                                                    !empty($data->class_id)&&
        !empty($data->class_name)&&
        !empty($data->class_year)&&
        !empty($data->branch_id)&&
        !empty($data->semester_id)&&
        !empty($data->class_strength)

    ){
        //set class properties value
        $class->class_id=$data->class_id;
        $class->class_name=$data->class_name;
        $class->class_year=$data->class_year;
        $class->teacher_id=$data->teacher_id;
        $class->branch_id=$data->branch_id;
        $class->semester_id=$data->semester_id;
        $class->class_strength=$data->class_strength;
        $class->class_code=$data->class_code;

        //create class
        if($class->create()){
            http_response_code(200);
            echo json_encode(array("Message"=>"class was created"));
        }else{
            http_response_code(503);
            echo json_encode(array("Message"=>"Unable to create new class"));
        }
    }
    else{
        http_response_code(400);
        echo json_encode(array("Message"=> "Unable to create class, class info is not complete"));
    }



?>