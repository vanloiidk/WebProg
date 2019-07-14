<?php
class Day{

    //connection
    private $conn;
    private $table_name = "days";

    //attributes
    public $day_id;
    public $day_name;


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
    public function readOne(){
        $query = "SELECT * FROM ".$this->table_name." WHERE day_id=?";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->day_id);

        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->day_name = $row['day_name'];
    }
    public function getDayId(){
        $query = "SELECT day_id FROM ".$this->table_name." WHERE day_name=?";

        $stmt = $this->conn->prepare($query);

        $this->day_name = htmlspecialchars(strip_tags($this->day_name));

        $stmt->bindParam(1,$this->day_name);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['day_id'];
    }


}


?>