<?php
class Time
{

    //connection
    private $conn;
    private $table_name = "times";

    //attributes
    public $time_id;
    public $time_name;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE time_id=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->time_id);

        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->time_name = $row['time_name'];
    }

    public function getTimeId()
    {
        $query = "SELECT time_id FROM " . $this->table_name . " WHERE time_name=?";

        $stmt = $this->conn->prepare($query);

        $this->time_name = htmlspecialchars(strip_tags($this->time_name));

        $stmt->bindParam(1, $this->time_name);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['time_id'];
    }

    public function getTimeName()
    {
//        $query = "SELECT * FROM " . $this->table_name . " WHERE time_id=?";
//
//        $stmt = $this->conn->prepare($query);
//
//        $stmt->bindParam(1, $this->time_id,PDO::PARAM_INT);
//
//        $stmt->execute();
//
//        $row = $stmt->fetch(PDO::FETCH_ASSOC);
//        echo $row['time_name'];
//        $this->time_name = $row['time_name'];

        if($this->time_id==1){
            $this->time_name="morning";
        }
        if($this->time_id==2){
            $this->time_name="afternoon";
        }
        if ($this->time_id==3){
            $this->time_name="evening";
        }
    }
}