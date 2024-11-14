var url='database/user_action.php';   // PHP伺服器端腳本的URL

function userLogin(){
    // 獲取使用者輸入的資料
    var username = $('#username').val();
    var password = $('#password').val();
    if (username === "" || password === "") {
        alert("Please type the Account and Password in.");
        event.preventDefault(); // 防止表單提交
    }
    
    $.ajax({
        url: url,
        method: 'POST',
        data: {action: 1, username: username, password: password },
        success: function(data) {
            window.alert('Login Succes.');
            //window.history.go(-1);
            location.href='index.html';
        },
        error: function(error) {
            if(error.status===401){ 
                //Unauthorized
                window.alert('Login failed.Please check the Account and Password.');
            }else{
                window.console.log(error);
            }
        }
    });
}

function userSignup(){
    var username = $('#username').val();
    var password = $('#password').val();
    var fname = $('#fname').val();
    var lname = $('#lname').val();

    $.ajax({
        url: url, 
        method: 'POST',
        data: {
            action: 3,
            username: username,
            password: password,
            fname: fname,
            lname: lname 
        },
        success: function(data) {
            if(data==1){
                window.alert('Signup Success!');
                location.replace('login.html');
                //window.history.go(-1);
                //location.href='login.html';
                
            }else{
                window.alert(data);
                //window.location.reload();
            }

        },
        error: function(error) {
            if(error.status===401){ //Unauthorized
                window.alert('Signup failed.Please use other E-mail or Password.');
            }else{
                window.console.log(error);
            }
        }
    });
}