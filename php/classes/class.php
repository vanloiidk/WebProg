<?php
    class Classes{
        //database conection
        private $conn;
        private $table_name = "classes";

        //object properties
        public $class_id;
        public $class_name;
        public $class_year;
        public $teacher_id;
        public $branch_id;
        public $semester_id;
        public $class_strength;
        public $class_code;


        public function __construct($db)
        {
            $this->conn=$db;
        }
        public function setClassId($class_id){
            $this->class_id = $class_id;
        }

        public function setClassName($class_Name){
            $this->class_Name = $class_Name;
        }
        public function setClassYear($class_year){
            $this->class_year = $class_year;
        }
        public function setBranchId($branch_id){
            $this->branch_id = $branch_id;
        }
        public function setSemesterId($semester_id){
            $this->semester_id = $semester_id;
        }
        public function setClassStrength($class_strength){
            $this->class_strength = $class_strength;
        }
        public function setClassCode($class_code){
            $this->class_code = $class_code;
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
            class_id=:class_id, class_name=:class_name, class_year=:class_year,teacher_id=:teacher_id branch_id=:branch_id, semester_id=:semester_id, class_strength=:class_strength, class_code=:class_code";
            $stmt = $this->conn->prepare($query);

            //
            $this->class_id=htmlspecialchars(strip_tags($this->class_id));
            $this->class_name=htmlspecialchars(strip_tags($this->class_name));
            $this->class_year=htmlspecialchars(strip_tags($this->class_year));
            $this->teacher_id=htmlspecialchars(strip_tags($this->teacher_id));
            $this->branch_id=htmlspecialchars(strip_tags($this->branch_id));
            $this->semester_id=htmlspecialchars(strip_tags($this->semester_id));
            $this->class_strength=htmlspecialchars(strip_tags($this->class_strength));
            $this->class_code=htmlspecialchars(strip_tags($this->class_code));

            //bind values
            $stmt->bindParam(":class_id",$this->class_id);
            $stmt->bindParam(":class_name",$this->class_name);
            $stmt->bindParam(":class_year",$this->class_year);
            $stmt->bindParam(":teacher_id",$this->teacher_id);
            $stmt->bindParam(":branch_id",$this->branch_id);
            $stmt->bindParam(":semester_id",$this->semester_id);
            $stmt->bindParam(":class_strength",$this->class_strength);
            $stmt->bindParam(":class_code",$this->class_code);

            //
            if($stmt->execute()){
                return true;
            }
            return false;

        }
        public function readOne(){
            $query = "SELECT * FROM ".$this->table_name." WHERE class_id=? LIMIT 0,1";
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(1,$this->class_id);

            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->class_id=$row['class_id'];
            $this->class_name=$row['class_name'];
            $this->class_year=$row['class_year'];
            $this->teacher_id=$row['teacher_id'];
            $this->branch_id=$row['branch_id'];
            $this->semester_id=$row['semester_id'];
            $this->class_strength=$row['class_strength'];
            $this->class_code=$row['class_code'];
        }
        public function update(){
            $query = "UPDATE ".$this->table_name." SET class_name=:class_name, class_year=:class_year,teacher_id=:teacher_id, branch_id=:branch_id, semester_id=:semester_id, class_strength=:class_strength, class_code=:class_code WHERE class_id=:class_id ";

            $stmt = $this->conn->prepare($query);

            $this->class_id=htmlspecialchars(strip_tags($this->class_id));
            $this->class_name=htmlspecialchars(strip_tags($this->class_name));
            $this->class_year=htmlspecialchars(strip_tags($this->class_year));
            $this->teacher_id=htmlspecialchars(strip_tags($this->teacher_id));
            $this->branch_id=htmlspecialchars(strip_tags($this->branch_id));
            $this->semester_id=htmlspecialchars(strip_tags($this->semester_id));
            $this->class_strength=htmlspecialchars(strip_tags($this->class_strength));
            $this->class_code=htmlspecialchars(strip_tags($this->class_code));

            $stmt->bindParam(":class_id",$this->class_id);
            $stmt->bindParam(":class_name",$this->class_name);
            $stmt->bindParam(":class_year",$this->class_year);
            $stmt->bindParam(":teacher_id",$this->teacher_id);
            $stmt->bindParam(":branch_id",$this->branch_id);
            $stmt->bindParam(":semester_id",$this->semester_id);
            $stmt->bindParam(":class_strength",$this->class_strength);
            $stmt->bindParam(":class_code",$this->class_code);

            if($stmt->execute()){
                return true;
            }
            return false;

        }
    }

?>