$(document).ready(function(){
    $('.page-header').height($(window).height());
    $("#One-way").addClass('active');
    var returnDate = document.getElementById("return-date");
    returnDate.style.display = 'none';
    $("#One-way").click(function(){
        returnDate.style.display = 'none';
    })
    $("#Return").click(function(){
        returnDate.style.display = 'block';
    })
    $("#departure-date").datepicker();
    $("#return-date").datepicker();
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


  })