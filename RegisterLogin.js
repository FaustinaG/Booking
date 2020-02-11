$(document).ready(function(){
    
    $("#Submit").click(function(){
        var UserName = document.getElementById("UserName").value;
        if(UserName.trim()=="")
        {
            alert("Please enter 'User Name'");
            return false;
        }
    var Password = document.getElementById("Password").value;
    var ConfirmPassword = document.getElementById("ConfirmPassword").value;
    if(Password.trim() != "" && Password == ConfirmPassword) {
        if(Password.length < 5) {
          alert("Password must contain at least five characters!");
          return false;
        }
        if(Password == UserName) {
          alert("Password must be different from Username!");
          return false;
        }
        re = /[0-9]/;
        if(!re.test(Password)) {
          alert("Password must contain at least one number (0-9)!");
          return false;
        }
        re = /[a-z]/;
        if(!re.test(Password)) {
          alert("Password must contain at least one lowercase letter (a-z)!");
          return false;
        }
        re = /[A-Z]/;
        if(!re.test(Password)) {
          alert("Password must contain at least one uppercase letter (A-Z)!");
          return false;
        }
        re = /[!@#$%^&*]/;
        if(!re.test(Password)) {
          alert("Password must contain at least one special character within (!@#$^&*)!");
          return false;
        }
      } 
      else {
        alert("Please check that you've entered and confirmed your password!");
        return false;
      }
        var userdetail = {
        UserName : UserName,
        Password : Password,
        TypeOfUser : "1"
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