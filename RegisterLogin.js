$(document).ready(function(){
    
    $("#Submit").click(function(){
        var UserName = document.getElementById("UserName").value;
        if(UserName.trim()=="")
        {
            alert("Please enter 'User Name'");
            return false;
        }
    var Password = document.getElementById("Password").value;
    if(Password.trim()=="")
    {
        alert("Please enter 'Password'");
        return false;
    }
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