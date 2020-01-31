$(document).ready(function(){
    
    $("#Login").click(function(){
    var UserName = document.getElementById("UserName").value;
    var Password = document.getElementById("Password").value;
    var Status = sessionStorage.getItem('Statusobject');
    var url = "http://localhost:60483/api/UserLogin/GetUser/"+UserName+"/"+Password;
    $.get(url, function (data) {
        if(data>0)
        {
            sessionStorage.setItem( 'UserIdobject', data );
            if(Status === "Booking")
            {
                window.location="BookFlight.html";
            }
            else
            {
                window.location="CancelFlight.html";
            }
        }
        else
        {
            alert("Invalid Login Credentails");
            return false;
        }
    })
})
})