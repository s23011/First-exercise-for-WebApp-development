setNavResource();
//checkLogin();













function setNavResource(){
    //$("#navbar").load("/final/part/navbar.html");

    $.ajax({
        url: 'part/navbar.php', 
        method: 'POST',
        success: function(data) {
            const e = document.querySelector('#navbar');
            e.innerHTML = data;
        },
        error: function(error) {
        }
    });
    /*const curPATH = window.location.pathname;
    const navPage =[
        '/final/index.html',
        '/final/shop.html',
        '/final/login.html',
        '/final/signup.html',
    ];
    if(navPage.includes(curPATH)){
        console.log('set Nav');
        $("#navbar").load("/final/part/navbar.html");
        //$("#navbar").load(("/final/part/navbar.html"),()=>{
        //    checkLogin();
        //});
    }*/
}


function userLogout(){
    $.ajax({
        url: 'part/navbar.php', 
        method: 'POST',
        data: {action: 0},
        success: function(data) {
            location.href='index.html';
        },
        error: function(error) {
            window.console.log(error);
        }
    });
}

/*
function checkLogin(){
    $.ajax({
        url: 'user_check.php', 
        method: 'POST',
        success: function(data) {
            if(data==1){
                setLoginResource(true);
            }else{
                setLoginResource(false);
            }
        },
        error: function(error) {
            console(error);
            setLoginResource(false);
        }
    });
}
function setLoginResource(isLogin){
    const es_logout = document.querySelectorAll('#logoutResource');
    const es_login = document.querySelectorAll('#loginResource');

    if(isLogin){
        window.console.log('set login elements');
        es_login.forEach((element) => element.hidden=false)
        es_logout.forEach((element) => element.remove());
    }
    else{
        window.console.log('set logout elements');
        es_logout.forEach((element) => element.hidden=false)
        es_login.forEach((element) => element.remove());
    }
}*/


function test()
{
    window.alert('Go');
}

function testMsg(msg)
{
    window.alert(msg);
}
