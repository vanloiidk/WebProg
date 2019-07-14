<?php
class Semester{

    //connection
    public $conn;
    public $table_name = "semesters";

    //attributes
    private $semester_id;
    private $semester_name;


    public function __construct($db)
    {
        $this->conn=$db;
    }
    public function read(){
        $query = "SELECT * FROM " .$this->table_name;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }


}


?>