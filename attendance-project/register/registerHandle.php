<?php
	include 'db_connection.php';

	$conn = OpenCon();

	header("Content-Type: application/json; charset=UTF-8");
	$jsonData = file_get_contents("php://input");
	$obj = json_decode($jsonData);

	$myObj = array();


	function checkStudentExist() {
		global $conn;
		global $obj;
		global $myObj;

		$sql = "SELECT * FROM students WHERE student_id = '" . $obj->rollNo . "';";
		$result = $conn->query($sql);

		if($result->num_rows > 0) {
			$myObj['id_exist'] = "True";
			return;
		} 
		$myObj['id_exist'] = "False";
	}


	function checkGmailExist() {
		global $conn;
		global $obj;
		global $myObj;

		$sql = "SELECT * FROM students WHERE student_gmail = '" . $obj->email . "';";
		$result = $conn->query($sql);

		if($result->num_rows > 0) {
			$myObj['gmail_exist'] = "True";
			return;
		} 
		$myObj['gmail_exist'] = "False";
	}


	function addNewStudent() {
		global $conn;
		global $obj;
		// prepare and bind
		$stmt = $conn->prepare("INSERT INTO students (student_id, student_name, student_gmail, student_password) VALUES (?, ?, ?, ?)");
		$stmt->bind_param("ssss", $student_id, $student_name, $student_gmail, $student_password);

		$student_id = $obj->rollNo;
		$student_name = $obj->firstname . " " . $obj->lastname;
		$student_gmail = $obj->email;
		$student_password = $obj->password;

		$stmt->execute();
	}


	checkStudentExist();

	checkGmailExist();
	
	echo json_encode($myObj);

	if($myObj['id_exist'] == "False" && $myObj['gmail_exist'] == "False") {
		addNewStudent();
	}

	CloseCon($conn);
?>