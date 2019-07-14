<?php
class Subject{

    //connection
    private $conn;
    private $table_name = "subjects";

    //attributes
    public $subject_id;
    public $subject_name;


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

    public function getSubjectId(){
        $query = "SELECT subject_id FROM ".$this->table_name." WHERE subject_name=?";

        $stmt = $this->conn->prepare($query);

        $this->subject_name = htmlspecialchars(strip_tags($this->subject_name));

        $stmt->bindParam(1,$this->subject_name);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['subject_id'];
    }


}


?>