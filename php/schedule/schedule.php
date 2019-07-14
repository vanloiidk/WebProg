<?php
class Schedule{

    //connection
    private $conn;
    private $table_name = "schedules";

    //attributes
    public $schedule_id;
    public $subject_id;
    public $subject_name;
    public $day_id;
    public $time_id;
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

    public function readWithClass(){
        $query = "SELECT schedule_id,s.subject_id,subject_name,day_id,time_id FROM ".$this->table_name." AS s JOIN subjects as su on s.subject_id=su.subject_id WHERE s.class_id=?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1,$this->class_id);

        $stmt->execute();
        return $stmt;

    }
    public function moveOneFromClass(){
        $query = "DELETE FROM ".$this->table_name. " WHERE schedule_id=?";
        $stmt=$this->conn->prepare($query);

        $stmt->bindParam(1,$this->schedule_id);
        if($stmt->execute()){
            return true;
        }
        return false;
    }
    public function update(){
        $query = "UPDATE ".$this->table_name." SET subject_id=:subject_id, day_id=:day_id,time_id=:time_id WHERE schedule_id=:schedule_id";
        $stmt = $this->conn->prepare($query);

        $this->schedule_id = htmlspecialchars(strip_tags($this->schedule_id));
        $this->subject_id = htmlspecialchars(strip_tags($this->subject_id));
        $this->day_id = htmlspecialchars(strip_tags($this->day_id));
        $this->time_id = htmlspecialchars(strip_tags($this->time_id));
        $stmt->bindparam(":subject_id",$this->subject_id);
        $stmt->bindParam(":day_id",$this->day_id,PDO::PARAM_INT);
        $stmt->bindParam(":time_id",$this->time_id,PDO::PARAM_INT);
        $stmt->bindParam(":schedule_id",$this->schedule_id);
         if ($stmt->execute()){
             return true;
         }
         return false;

    }
    public function createNewID(){
        $query = "SELECT schedule_id FROM ".$this->table_name." ORDER BY schedule_id DESC LIMIT 1";
        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->schedule_id = $row['schedule_id'];
        $n = strlen($this->schedule_id);
        $number = (int)trim($this->schedule_id,"sch");
        $number = $number+1;
        $number= (string)$number;

        $n = $n-strlen($number)-3;
        $this->schedule_id = "sch";
        for ($i=0;$i<$n;$i++){
            $this->schedule_id  = $this->schedule_id."0";
        }
        $this->schedule_id = $this->schedule_id."".$number;
        return true;


    }
    public function create(){
        $query = "INSERT INTO ".$this->table_name." VALUES(:schedule_id,:subject_id,:day_id,:time_id,:class_id)";
        $stmt = $this->conn->prepare($query);
        $this->schedule_id = htmlspecialchars(strip_tags($this->schedule_id));
        $this->subject_id = htmlspecialchars(strip_tags($this->subject_id));
        $this->day_id = htmlspecialchars(strip_tags($this->day_id));
        $this->time_id = htmlspecialchars(strip_tags($this->time_id));
        $this->class_id = htmlspecialchars(strip_tags($this->class_id));

        $stmt->bindParam(":schedule_id",$this->schedule_id);
        $stmt->bindParam(":subject_id",$this->subject_id);
        $stmt->bindParam(":day_id",$this->day_id,PDO::PARAM_INT);
        $stmt->bindParam(":time_id",$this->time_id,PDO::PARAM_INT);
        $stmt->bindParam(":class_id",$this->class_id);

        if($stmt->execute()){
            return true;
        }

        return false;

    }
    public function deleteOne(){
        $query = "DELETE FROM ".$this->table_name." WHERE schedule_id=?";

        $stmt = $this->conn->prepare($query);
        $this->schedule_id = htmlspecialchars(strip_tags($this->schedule_id));
        $stmt->bindParam(1, $this->schedule_id);

        if($stmt->execute()){
            return true;
        }
        return false;
    }

    public function check(){
        $query = "SELECT schedule_id FROM ".$this->table_name." WHERE day_id=:day_id AND time_id=:time_id AND class_id=:class_id";
        $stmt = $this->conn->prepare($query);

        $this->day_id = htmlspecialchars(strip_tags($this->day_id));
        $this->time_id = htmlspecialchars(strip_tags($this->time_id));
        $this->class_id = htmlspecialchars(strip_tags($this->class_id));

        $stmt->bindParam(":day_id",$this->day_id, PDO::PARAM_INT);
        $stmt->bindParam(":time_id",$this->time_id,PDO::PARAM_INT);
        $stmt->bindParam(":class_id",$this->class_id);
        $stmt->execute();
        return $stmt;
    }
    public function readWithWeekday(){
        $query = "SELECT subject_name, time_id FROM ".$this->table_name." AS s JOIN subjects as su on s.subject_id=su.subject_id WHERE s.class_id=? AND s.day_id=?";

        $stmt = $this->conn->prepare($query);
        $this->class_id = htmlspecialchars(strip_tags($this->class_id));
        $stmt->bindParam(1,$this->class_id);
        $stmt->bindParam(2,$this->day_id,PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }


}


?>