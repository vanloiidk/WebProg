<?php
	include_once '../config/db.php';

	$db = new Database();
	$conn = $db->getConnection();

	header("Content-Type: application/json; charset=UTF-8");
	$jsonData = file_get_contents("php://input");
	$obj = json_decode($jsonData);
	http_response_code(200);

	$images_str = "";
	$myObj = array();
	$last_id = 0;


	function checkStudentExist() {
		global $conn;
		global $obj;
		global $myObj;

		$sql = "SELECT * FROM students WHERE student_id = '" . $obj->rollNo . "';";
		$result = $conn->query($sql);

		if($result->num_rows > 0) {
			$myObj['exist'] = "True";
			return;
		} 
		$myObj['exist'] = "False";
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
		// echo "New records created successfully";
	}



	function addNewRecognition() {
		global $conn, $obj, $myObj, $images_str, $last_id;

		// Insert query 
		$query = "INSERT INTO face_recognition(student_id) VALUES('". $obj->rollNo ."')"; 

		mysqli_query($conn, $query); 

		// Get last insert id 
		$last_id = mysqli_insert_id($conn); 
	}




	// function getImageStr() {
	// 	global $obj;
	// 	global $images_str;

	// 	$student_id = $obj->rollNo;
	// 	$length = count($obj->image_src);

	// 	for($i = 0; $i < $length; $i++) {
	// 		$images_str .= $student_id . $i . '.png' . '-';
	// 	}
	// }




	function generateImages() {
		//generateImage	
		global $obj, $last_id;

		$rollNo = $obj->rollNo;
		$directory = "/var/www/html/attendance-project/face_reg_pytorial/uploads/";
		define('UPLOAD_DIR', $directory);
		$base64_str = $obj->image_src;

		for($i = 0; $i < count($base64_str); $i++) {
			$base64_str[$i] = str_replace('data:image/jpeg;base64,', '', $base64_str[$i]);
			$base64_str[$i] = str_replace(' ', '+', $base64_str[$i]);
			$data = base64_decode($base64_str[$i]);
			$basename = $rollNo . "." . $last_id . "." . $i . '.png';
			$file = UPLOAD_DIR . $basename;
			file_put_contents($file, $data);
		}
	}



	checkStudentExist();
	
	echo json_encode($myObj);

	if($myObj['exist'] == "False") {
		addNewStudent();
		addNewRecognition();
		generateImages();
	}

	CloseCon($conn);
?>