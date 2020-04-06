$(document).ready(function(){
    $('.page-header').height($(window).height());
    var accessId = sessionStorage.getItem('accessToken');
    var UserType = sessionStorage.getItem('UserTypeobject');
    $("#One-way").addClass('active');
    var returnDate = document.getElementById("return-date");
    returnDate.style.display = 'none';
    $("#One-way").click(function(){
        returnDate.style.display = 'none';
        $("#Return").removeClass('active');
        $("#One-way").addClass('active');
    })
    $("#Return").click(function(){
        returnDate.style.display = 'block';
        $("#One-way").removeClass('active');
        $("#Return").addClass('active');
    })
    $("#departure-date").datepicker({
        onSelect: function(dateText, inst) {
            var today = new Date();
            today = Date.parse(today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear());
            var selDate = Date.parse(dateText);

            if(selDate < today) {
                $('#departure-date').val('');
                $(inst).datepicker('show');
            }

            $("#return-date").datepicker("option","minDate",
     $("#departure-date").datepicker("getDate"));
        }
    });
    $("#return-date").datepicker();

    if(accessId!= null && UserType === "1")
    {
        $('#Login').hide();
        $('#usertickethistory').hide();
        $('#CancelTicket').hide();
    }
    else if(accessId!= null && UserType === "2")
    {
        $('#Login').hide();
        $('#flighthistory').hide();
    }
    else
    {
        $('#flighthistory').hide();
        $('#usertickethistory').hide();
        $('#logoutuser').hide(); 
    }

    var countries = ["Chennai","Delhi","Coimbatore","Bangalore","Vellore","Cochin","Mangalore","Hyderabad"];

    $("#From-City").autocomplete({
    source: countries
    });
    $("#To-City").autocomplete({
        source: countries
        });
    
    $("#flip").click(function(){
        var temp = $("#From-City").val();
        $("#From-City").val($("#To-City").val());
        $("#To-City").val(temp);
    })
    $("#getflights").click(function(){
        var FromCity = document.getElementById("From-City").value;
        if(FromCity.trim()=="")
        {
            alert("Please enter 'From' airport");
            return false;
        }
        var ToCity = document.getElementById("To-City").value;
        if(ToCity.trim()=="")
        {
            alert("Please enter 'To' airport");
            return false;
        }
        var DepartureDate = document.getElementById("departure-date").value;
        if(DepartureDate.trim()=="")
        {
            alert("Please enter 'Departure Date'");
            return false;
        }
        var ReturnDate = document.getElementById("return-date").value;
        if(returnDate.style.display === 'block' && ReturnDate.trim()=="")
        {
            alert("Please enter 'Return Date'");
            return false;
        }
        var PassengersCount = document.getElementById("PassengersCount").value;
        if(PassengersCount.trim()=="")
        {
            alert("Please enter 'Passengers Count'");
            return false;
        }
        sessionStorage.setItem( 'FromCityobject', FromCity );
        sessionStorage.setItem( 'ToCityobject', ToCity );
        sessionStorage.setItem( 'DepartureDateobject', DepartureDate );
        sessionStorage.setItem( 'ReturnDateobject', ReturnDate );
        sessionStorage.setItem( 'PassengersCountobject', PassengersCount );
        sessionStorage.setItem( 'ReturnDateStyleobject', returnDate.style.display );
        window.location="FlightDetails.html";
    })

    $("#CancelTicket").click(function(){
        var Status = "Cancelled";
        sessionStorage.setItem( 'Statusobject', Status );
        if(accessId!=null)
        {
            window.location="CancelFlight.html";
        }
        else{
        window.location="Login.html";
        }
    })

    var triptype = returnDate.style.display === 'block' ? "Return":"Oneway";
    SessionStorage.setItem( 'triptypeobject', triptype );


  })

//   var timeout;
//   document.onmousemove = function(){
//     clearTimeout(timeout);
//     timeout = setTimeout(function(){
//         sessionStorage.clear();
//         accessId=null;
//         window.location = "Index.html";

//     }, 600000);
//   }

  $("#logoutuser").click(function(){
    sessionStorage.clear();
    accessId=null;
    window.location = "Index.html";
})