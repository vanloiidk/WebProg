<?php
class Attendances{

    //connection
    private $conn;
    private $table_name = "attendances";

    //attributes
    public $attendance_id;
    public $schedule_id;
    public $student_id;
    public $attendance_date;
    public $class_id;


    public function __construct($db)
    {
        $this->conn=$db;
    }

    public function getReport(){

        $query = "CALL getCount(?,?)";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1,$this->class_id);
        $stmt->bindParam(2,$this->attendance_date);

        $stmt->execute();
        return $stmt;
    }
    public function createNewId(){
        $query = "SELECT attendance_id FROM ".$this->table_name." ORDER BY attendance_id DESC LIMIT 1";
        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->attendance_id = $row['attendance_id'];
        $n = strlen($this->attendance_id);
        $number = (int)trim($this->attendance_id,"atd");

          $number = $number+1;
        $number= (string)$number;
        if($n==0){
            $n=2;
        }else{
            $n = $n-strlen($number)-3;

        }
        $this->attendance_id = "atd";
        for ($i=0;$i<$n;$i++){
            $this->attendance_id  = $this->attendance_id."0";
        }
        $this->attendance_id = $this->attendance_id."".$number;
        return true;
    }
    public function addOne(){
        echo $this->attendance_id;
        $query = "INSERT INTO ".$this->table_name." VALUES(?,?,?,?)";
        $stmt = $this->conn->prepare($query);
        $this->attendance_date = htmlspecialchars(strip_tags($this->attendance_date));
        $this->schedule_id = htmlspecialchars(strip_tags($this->schedule_id));
        $this->student_id = htmlspecialchars(strip_tags($this->student_id));


        $stmt->bindParam(1,$this->attendance_id);
        $stmt->bindParam(2,$this->student_id);
        $stmt->bindParam(3,$this->schedule_id);
        $stmt->bindParam(4,$this->attendance_date);

        if ($stmt->execute()){
            http_response_code(200);
            echo json_encode(array("Message"=>"new attendance added"));

        }
        else{
            http_response_code(400);
            echo json_encode(array("Message"=>"unable to add new attendance"));
        }
    }








}


?>