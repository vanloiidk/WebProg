<?php
class Teacher{
    //database conection
    private $conn;
    private $table_name = "teachers";

    //object properties
    public $teacher_id;
    public $teacher_name;
    public $teacher_gmail;
    public $teacher_password;

    public function __construct($db)
    {
        $this->conn=$db;
    }


    public function read(){
        //select all query
        $query = "SELECT
                        *
                        FROM " .$this->table_name;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;

    }
    public function create(){
        $query = "INSERT INTO " . $this->table_name . " SET
            teacher_id=:teacher_id, teacher_name=:teacher_name, teacher_gmail=:teacher_gmail, teacher_password=:teacher_password ";
        $stmt = $this->conn->prepare($query);

        //
        $this->teacher_id=htmlspecialchars(strip_tags($this->teacher_id));
        $this->teacher_name=htmlspecialchars(strip_tags($this->teacher_name));
        $this->teacher_gmail=htmlspecialchars(strip_tags($this->teacher_gmail));
        $this->teacher_password=htmlspecialchars(strip_tags($this->teacher_password));

        //bind values
        $stmt->bindParam(":teacher_id",$this->teacher_id);
        $stmt->bindParam(":teacher_name",$this->teacher_name);
        $stmt->bindParam(":teacher_gmail",$this->teacher_gmail);
        $stmt->bindParam(":teacher_password",$this->teacher_password);


        //
        if($stmt->execute()){
            return true;
        }
        return false;

    }
    public function readOne(){
        $query = "SELECT * FROM ".$this->table_name." WHERE teacher_id=? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1,$this->teacher_id);

        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->teacher_id=$row['teacher_id'];
        $this->teacher_name=$row['teacher_name'];
        $this->teacher_gmail=$row['teacher_gmail'];
        $this->teacher_password=$row['teacher_password'];

    }
    public function update(){
        $query = "UPDATE ".$this->table_name." SET teacher_name=:teacher_name, teacher_gmail=:teacher_gmail,teacher_password=:teacher_password WHERE teacher_id=:teacher_id ";

        $stmt = $this->conn->prepare($query);

        $this->teacher_id=htmlspecialchars(strip_tags($this->teacher_id));
        $this->teacher_name=htmlspecialchars(strip_tags($this->teacher_name));
        $this->teacher_gmail=htmlspecialchars(strip_tags($this->teacher_gmail));
        $this->teacher_password=htmlspecialchars(strip_tags($this->teacher_password));


        $stmt->bindParam(":teacher_id",$this->teacher_id);
        $stmt->bindParam(":teacher_name",$this->teacher_name);
        $stmt->bindParam(":teacher_gmail",$this->teacher_gmail);
        $stmt->bindParam(":teacher_password",$this->teacher_password);


        if($stmt->execute()){
            return true;
        }
        return false;

    }
}

?>