<?php
include_once './db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// get database connection
$database = new Database();
$db = $database->getConnection();

?>