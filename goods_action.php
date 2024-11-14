<?php
    if(isset($_POST['check'])){
        include_once("database/connection.php");

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $check = $_POST["check"];
            switch($check){
                case 'g_datas':
                    $sql = "select * from goods where enable = 1 ORDER BY o_level DESC";
                    $q = $pdo->prepare($sql);
                    $q->execute();

                    echo json_encode($q->fetchAll());

                    break;
                case 'g_list':
                    $limit = $_POST['limit'];
                    $page = $_POST['page'];
                    $start = $limit * ($page-1);

                    $sql = "select * from goods where enable = 1 and o_level = 1 ORDER BY o_level LIMIT ".$start.",".$limit;
                    $q = $pdo->prepare($sql);
                    $q->execute();
                    
                    echo json_encode($q->fetchAll());
                    

                    break;
                case 'g_rcm':
                    break;
                default:
                    http_response_code(400);    //Bad Request
                    break;
            }
    
        }else{
            http_response_code(405);    // Method Not Allowed
        }
    }

    if(isset($_POST["action"])){
        include_once("database/connection.php");

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $action = $_POST["action"];
            switch($action){
                case 'g_rcm':
                    break;
                default:
                    http_response_code(400);    //Bad Request
                    break;
            }
        }else{
            http_response_code(405);     // Method Not Allowed
        }
    }


?>