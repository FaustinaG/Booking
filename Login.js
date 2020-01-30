$(document).ready(function(){
    
    $("#Login").click(function(){
    var UserName = document.getElementById("UserName").value;
    var Password = document.getElementById("Password").value;
    var url = "http://localhost:60483/api/UserLogin/GetUser/"+UserName+"/"+Password;
    $.getJSON(url, function (data) {
        if(jQuery.isEmptyObject(data))
        {
            alert("Invalid Login Credentails");
            return false;
        }
        else
        {
            window.location="BookFlight.html";
        }
    })
})
})