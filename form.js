document.getElementById('loginForm').addEventListener('submit', function(event) {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === "" || password === "") {
        alert("請輸入使用者名稱和密碼");
        event.preventDefault(); // 防止表單提交
    }
});

