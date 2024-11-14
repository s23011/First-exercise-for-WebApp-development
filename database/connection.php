<?php
$dsn = 'mysql:dbname=app_final;host=localhost;charset=utf8;';
try{
    $pdo = new PDO($dsn,'root','kic23011');
    
}catch(PDOException $e){
    echo 'Failed to connect to MySQL:'.e->getMessage();
}
?>