<?php
	
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
//include database and object files
include_once '../config/db.php';
include_once './student.php';

$database = new Database();
$db = $database->getConnection();

$student = new Student($db);
$student->class_id=isset($_GET['class_id'])? $_GET['class_id'] : die();

$student->countWithClass();





 ?>