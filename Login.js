$(document).ready(function(){
    
    $("#Login").click(function(){
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
    var Status = sessionStorage.getItem('Statusobject');
    var url = "http://localhost:60483/api/UserLogin/GetUser/"+UserName+"/"+Password;
    $.get(url, function (data) {
        if(!jQuery.isEmptyObject(data))
        {
            sessionStorage.setItem( 'UserIdobject', data.id );
            sessionStorage.setItem( 'UserTypeobject', data.UserType );
            if(Status === "Booking")
            {
                window.location="BookFlight.html";
            }
            else if(Status === "Cancelled")
            {
                window.location="CancelFlight.html";
            }
            else
            {
                window.location="Index.html";
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