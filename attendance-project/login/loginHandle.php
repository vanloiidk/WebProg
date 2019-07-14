<?php
	include 'db_connection.php';

	$conn = OpenCon();

	header("Content-Type: application/json; charset=UTF-8");
	$jsonData = file_get_contents("php://input");
	$obj = json_decode($jsonData);
	//echo $jsonData;

	function getClass($teacher_id) {
		global $conn;

		$sql = "SELECT * FROM classes WHERE teacher_id = '" . $teacher_id . "' limit 1;";
		$result = $conn->query($sql);

		if($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			$class_id = $row["class_id"];
			return $class_id;
		} 
	}

	function checkStudent() {
		global $conn;
		global $obj;

		$myObj = array();

		$sql = "SELECT * FROM students WHERE student_gmail = '" . $obj->email . "' AND student_password = '" . $obj->password . "';";
		$result = $conn->query($sql);

		if($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			$myObj['user'] = "student";
			$myObj['id'] = $row['student_id'];
			$myObj['username'] = $row['student_name'];
			$myObj['class_id'] = $row['class_id'];
			http_response_code(200);
			echo json_encode($myObj);
			return true;
		} 
		return false;
	}

	function checkTeacher() {
		
		global $conn;
		global $obj;

		$myObj = array();

		$sql = "SELECT * FROM teachers WHERE teacher_gmail = '" . $obj->email . "' AND teacher_password = '" . $obj->password . "';";
		$result = $conn->query($sql);


		if($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			$myObj['user'] = "teacher";
			$myObj['id'] = $row['teacher_id'];
			$myObj['username'] = $row['teacher_name'];
			$myObj['class_id'] = getClass($myObj['id']);
			http_response_code(200);
			echo json_encode($myObj);
			return true;
		} 
		return false;
	}

	function checkUserExist() {
		if(!checkStudent()) {
			if(!checkTeacher()) {
				http_response_code(400);
			}

		};
	}

	checkUserExist();

	CloseCon($conn);
?>