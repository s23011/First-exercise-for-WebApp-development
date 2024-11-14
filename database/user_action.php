<?php
include_once("connection.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST["action"];

    switch($action){
        case 0: //logout
            unset($_COOKIE['username']);
            setcookie('username',"", time() -300, '/');
            break;
        case 1: //login
            $username = $_POST["username"];
            $password = $_POST["password"];

            $sql = "select * from users where user_name = ? and user_pwd = ?";
            $q = $pdo->prepare($sql);
            $q->execute(array($username,$password));
            
            $row = $q->fetch();
            if($row){
                setcookie('username', $username, time() + 3600, '/');
            }else{
                http_response_code(401);// Unauthorized
            }
            break;
        case 2: //check state
            if (isset($_COOKIE['username'])) {
                echo 1;
            } else {
                echo 0;
            }
            break;
        case 3: //signup
            $username = $_POST["username"];
            $password = $_POST["password"];
            $fname = $_POST["fname"];
            $lname = $_POST["lname"];

            $sql = "select * from users where user_name = ?";
            $q = $pdo->prepare($sql);
            $q->execute(array($username));
            
            $row = $q->fetch();
            if(!$row){
                $sql = "select count(*) from users";
                $new_id = $pdo->query($sql)->fetchColumn() +1;

                $sql = "insert into users values (?,?,?,?,?,?)";
                $q = $pdo->prepare($sql);
                $q->execute(array($new_id,$username,$password,$fname,$lname,1));
                if($q){
                    echo 1;
                }else{
                    http_response_code(400);    //Bad Request
                }
            }else{
                echo 'Account already exist.';
            }
            break;
        default:
            http_response_code(405);    // Method Not Allowed
            break;
    }

}else{
    http_response_code(405); 
}
?>