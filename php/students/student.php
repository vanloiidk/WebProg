<?php
class Student{

    //connection
    private $conn;
    private $table_name = "students";

    //attributes
    public $student_id;
    public $student_name;
    public $student_gmail;
    public $student_password;
    public $class_id;


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
        $query = "SELECT * FROM ".$this->table_name." WHERE student_id=? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1,$this->student_id);

        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->student_id=$row['student_id'];
        $this->student_name=$row['student_name'];
        $this->student_gmail=$row['student_gmail'];
        $this->student_password=$row['student_password'];
        $this->class_id=$row['class_id'];
    }

    public function update(){
        $query = "UPDATE ".$this->table_name." SET student_name=:student_name, student_gmail=:student_gmail,student_password=:student_password, class_id=:class_id WHERE student_id=:student_id ";

        $stmt = $this->conn->prepare($query);

        $this->student_id=htmlspecialchars(strip_tags($this->student_id));
        $this->student_name=htmlspecialchars(strip_tags($this->student_name));
        $this->student_gmail=htmlspecialchars(strip_tags($this->student_gmail));
        $this->student_password=htmlspecialchars(strip_tags($this->student_password));
        $this->class_id=htmlspecialchars(strip_tags($this->class_id));


        $stmt->bindParam(":student_id",$this->student_id);
        $stmt->bindParam(":student_name",$this->student_name);
        $stmt->bindParam(":student_gmail",$this->student_gmail);
        $stmt->bindParam(":student_password",$this->student_password);
        $stmt->bindParam(":class_id",$this->class_id);

        if($stmt->execute()){
            return true;
        }
        return false;

    }

    public function readWithClass(){
        $query = "SELECT * FROM ".$this->table_name." WHERE class_id=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1,$this->class_id);
        $stmt->execute();
        return $stmt;
    }

    public function deleteOne(){
        $query = "DELETE FROM ".$this->table_name. " WHERE student_id=?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1,$this->student_id);
        if($stmt->execute()){
            return true;
        }
        return false;
    }
    public function moveOneFromClass(){
        $query = "UPDATE ".$this->table_name. " SET class_id=null WHERE student_id=?";
        $stmt=$this->conn->prepare($query);

        $stmt->bindParam(1,$this->student_id);
        if($stmt->execute()){
            return true;
        }
        return false;
    }
    public function searchWithoutClass(){
        $query = "SELECT student_id,student_name,student_gmail FROM ".$this->table_name. " WHERE student_id LIKE :student_id AND student_name LIKE :student_name AND student_gmail LIKE :student_gmail AND isnull(class_id)";
        $stmt = $this->conn->prepare($query);

        $this->student_id = htmlspecialchars(strip_tags($this->student_id));
        $this->student_name=htmlspecialchars(strip_tags($this->student_name));
        $this->student_gmail = htmlspecialchars(strip_tags($this->student_gmail));

        $this->student_id = "%".$this->student_id."%";
        $this->student_name = "%".$this->student_name."%";
        $this->student_gmail = "%".$this->student_gmail."%";


        $stmt->bindParam(":student_id",$this->student_id);
        $stmt->bindParam(":student_name",$this->student_name);
        $stmt->bindParam(":student_gmail",$this->student_gmail);
        $stmt->execute();
        return $stmt;
    }
    public function updateClass(){
        $query = "UPDATE ".$this->table_name." SET class_id=:class_id WHERE student_id=:student_id";

        $stmt = $this->conn->prepare($query);
        $this->student_id = htmlspecialchars(strip_tags($this->student_id));
        $this->class_id = htmlspecialchars(strip_tags($this->class_id));

        $stmt->bindParam(":student_id",$this->student_id);
        $stmt->bindParam(":class_id",$this->class_id);

        if($stmt->execute()){
            return true;
        }

        return false;
    }

    public function teacherUpdate(){
        $query = "UPDATE ".$this->table_name." SET student_name=:student_name,student_gmail=:student_gmail WHERE student_id=:student_id";
        $stmt = $this->conn->prepare($query);

        $this->student_id = htmlspecialchars(strip_tags($this->student_id));
        $this->student_name = htmlspecialchars(strip_tags($this->student_name));
        $this->student_gmail = htmlspecialchars(strip_tags($this->student_gmail));

        $stmt->bindParam(":student_id",$this->student_id);
        $stmt->bindParam(":student_name",$this->student_name);
        $stmt->bindParam("student_gmail",$this->student_gmail);

        if($stmt->execute()){
            return true;
        }
        return false;
    }

    public function updatePassword(){
        $query = "UPDATE ".$this->table_name." SET student_password=:student_password WHERE student_id=:student_id";
        $stmt = $this->conn->prepare($query);

        $this->student_id = htmlspecialchars(strip_tags($this->student_id));
        $this->student_password = htmlspecialchars(strip_tags($this->student_password));

        $stmt->bindParam(":student_id",$this->student_id);
        $stmt->bindParam(":student_password",$this->student_password);

        if($stmt->execute()){
            return true;
        }
        return false;
    }
    public function countWithClass(){
        $query = "SELECT count(student_id) as total FROM ".$this->table_name." WHERE class_id=?";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1,$this->class_id);

        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $item = array(
            "total"=>$row['total']
        );
        http_response_code(200);
        echo json_encode($item);



 }


}


?>