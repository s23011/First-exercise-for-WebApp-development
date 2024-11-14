<?php
if (!$_SERVER["REQUEST_METHOD"] == "POST") {
    http_response_code(405); 

}

if(isset($_POST['action'])){
    $action = $_POST['action'];
    if($action == 0){
        unset($_COOKIE['username']);
        setcookie('username',"", time() -300, '/');
    }
}
?>

<div class="container top_menu bg_col_b2">
    <a class="bar_button" href='index.html'>Home</a>   
    <p class="gap_bar">|</p>
    <a class="bar_button" href='shop.html'>Shop</a>

    <div style="float:right;">
        <?php
            if (isset($_COOKIE['username'])) {
                echo '
                    <div id="loginResource" class="dropdown">
                    <button class="bar_button dropbtn">User Infos <i class=\'fa fa-caret-down\'></i></button>            
                    <div class="dropdown-content">                   
                        <a href="cart.html">Cart</a>
                        <a href="history.html">Shopping History</a>
                        <a href="profile.html">Profile</a>
                        <a href="javascript:userLogout()">Logout</a>
                        </div>
                    </div>
                ';
            } else {
                echo '
                    <div id="logoutResource">
                    <a class="bar_button" href=\'login.html\'>Login</a>
                    </div>
                ';
            }
        ?>

    </div>
</div>