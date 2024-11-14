<?php
    if(!isset($_COOKIE['username'])){
        echo "not user";
        exit;
    }
    if (!$_SERVER["REQUEST_METHOD"] == "POST"){
        echo "not post";
        http_response_code(405);    // Method Not Allowed
        exit;
    }

    include_once("database/connection.php");
    $username = $_COOKIE['username'];

    $sql = "select user_id from users where user_name = ?";
    $q = $pdo->prepare($sql);
    $q->execute(array($username));
    
    $user_id = $q->fetch()['user_id'];      

    if(isset($_POST['check'])){
        $check = $_POST["check"];
        switch($check){
            case 'count':
                $sql = "select * from carts where user_id = ? and pay_date is NULL";
                $q = $pdo->prepare($sql);
                $q->execute(array($user_id));

                $carts = $q->fetchAll();
                $count = 0;
                foreach($carts as $goods){
                    $count+=$goods['num']; 
                }
                echo $count; 

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
    }

    if(isset($_POST["action"])){
        $action = $_POST["action"];

        switch($action){
            case 'add':
                $sql = "select * from carts where user_id = ? and pay_date is NULL";
                $q = $pdo->prepare($sql);
                $q->execute(array($user_id));

                $row = $q->fetch();
                $goods_id = $_POST["goods_id"];
                if(!$row){
                    //add new cart
                    echo 'add new cart';
                    $sql = "select * from carts where user_id = ? ORDER BY cart_id DESC LIMIT 1";
                    $q = $pdo->prepare($sql);
                    $q->execute(array($user_id));
                    $row = $q->fetch();

                    if(!$row){
                        $cart_id = 1;
                    }else{
                        $cart_id = $row['cart_id'] + 1;
                    }

                    echo 'new id='.$cart_id;
                }else{
                    //add cur cart
                    echo "add cur cart";
                    $cart_id = $row['cart_id'];
                    echo 'cart id='.$cart_id;
                }
                $sql = "insert into carts (user_id,cart_id,goods_id,num) values(?,?,?,1)";
                $q = $pdo->prepare($sql);
                $q->execute(array($user_id,$cart_id,$goods_id));

                break;
            default:
                http_response_code(400);    //Bad Request
                break;
        }
    }


?>