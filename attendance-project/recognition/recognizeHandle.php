<?php 
	header("Content-Type: application/json; charset=UTF-8");
	$jsonData = file_get_contents("php://input");
	$obj = json_decode($jsonData);
	$myObj = array();

	$rollNo = $obj->rollNo;
	$base64_str = $obj->base64_str;

	

	echo "image was uploaded successfully";
 ?>