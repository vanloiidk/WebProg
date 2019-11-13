<?php
    class Branchs{

        //connection
        private $conn;
        private $table_name="branchs";

        //attributes
        public $branch_id;
        public $branch_name;
        public $branch_des; 

        public function __construct($db)
        {
            $this->conn=$db;
        }
        public function read(){
            $query = "SELECT
                        *
                        FROM " .$this->table_name;

            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }


    }


?>