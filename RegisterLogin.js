$(document).ready(function(){
    
    $("#Submit").click(function(){
        var userdetail = {
        UserName : document.getElementById("UserName").value,
        Password : document.getElementById("Password").value,
        TypeOfUser : 1
    }

        $.ajax({
            url: "http://localhost:60483/api/UserLogin/PostUser",
            type: "POST",
            data: JSON.stringify(userdetail),
            contentType: "application/json",
            success: function (data) {
                callback(data);
            }
        })
        window.location="Login.html";
    })
})