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
    // var url = "http://localhost:60483/api/UserLogin/GetUser/"+UserName+"/"+Password;
    // $.get(url, function (data) {
    //     if(!jQuery.isEmptyObject(data))
    //     {
    //         sessionStorage.setItem( 'UserIdobject', data.id );
    //         sessionStorage.setItem( 'UserTypeobject', data.UserType );
    //         if(Status === "Booking")
    //         {
    //             window.location="BookFlight.html";
    //         }
    //         else if(Status === "Cancelled")
    //         {
    //             window.location="CancelFlight.html";
    //         }
    //         else
    //         {
    //             window.location="Index.html";
    //         }
    //     }
    //     else
    //     {
    //         alert("Invalid Login Credentails");
    //         $('#UserName').val('');
    //         $('#Password').val('');
    //         return false;
    //     }
    // })
    $.ajax({
        // Post username, password & the grant type to /token
        url: 'http://localhost:60483/token',
        method: 'POST',
        contentType: 'application/json',
        data: {
            username: UserName,
            password: Password,
            grant_type: 'password'
        },
        success: function (response) {
            sessionStorage.setItem("accessToken", response.access_token);
            sessionStorage.setItem("UserTypeobject", response.roleType);
            sessionStorage.setItem("UserIdobject", response.userId);
            //window.location.href = "BookFlight.html";
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
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
            alert("An error occured while processing your request. Please contact program vendor if the problem persist.");
        }
    });
})
})