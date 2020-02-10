$(document).ready(function(){
    var FromCity = sessionStorage.getItem('FromCityobject');
    var ToCity = sessionStorage.getItem('ToCityobject');
    var DepartureDate = sessionStorage.getItem('DepartureDateobject').replace(/\//g,'-');
    var ReturnDate = sessionStorage.getItem('ReturnDateobject').replace(/\//g,'-');
    var PassengersCount = sessionStorage.getItem('PassengersCountobject');
    var ReturnDateStyle = sessionStorage.getItem('ReturnDateStyleobject');
    var returnDate = document.getElementById("return-date");
    if(ReturnDateStyle === 'none')
    {
        returnDate.style.display = 'none';
        $("#One-way").addClass('active');
    }
    else
    {
        returnDate.style.display = 'block';
        $("#Return").addClass('active');
    }
    $("#One-way").click(function(){
        $("#Return").removeClass('active');
        $("#One-way").addClass('active');
        returnDate.style.display = 'none';
        returnDate.clear();
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
    var countries = ["Chennai","Delhi","Coimbatore","Bangalore","Vellore","Cochin","Mangalore","Hyderabad"];

    $("#From-City").autocomplete({
    source: countries
    });
    $("#To-City").autocomplete({
        source: countries
        });
    document.getElementById("From-City").value = FromCity;
    document.getElementById("To-City").value = ToCity;
    document.getElementById("departure-date").value = DepartureDate;
    document.getElementById("return-date").value = ReturnDate;
    document.getElementById("PassengersCount").value = PassengersCount;

var url = "http://localhost:60483/api/FlightDetail/GetFlights";
$.getJSON(url, function (data) {
        var flight_data = [];   
    $.each(data, function(key, value){
         flight_data.push(value);
    });
    var col = [];
    for (var i = 0; i < flight_data.length; i++) {
        for (var key in flight_data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var table = document.createElement("table");
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < flight_data.length; i++) {
        if(flight_data[i]["FromCity"]===FromCity && flight_data[i]["ToCity"]===ToCity && flight_data[i]["JourneyDate"] === DepartureDate
        && flight_data[i]["SeatAvailability"]>=PassengersCount)
        {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if(col[j] === "Id")
            {
                tabCell.innerHTML = '<a href="#"><button><b id="'+flight_data[i][col[j]]+'">Book</b></button></a>';
            }
            else
            {
                tabCell.innerHTML = flight_data[i][col[j]];
            }
        }
    }
    }
    var divContainer = document.getElementById("flighttable");
    divContainer.innerHTML = "<b>Best Flights</b>";
    divContainer.appendChild(table);
    $('#flighttable th:last-child, #flighttable td:last-child').remove();
    $('#flighttable th:last-child').hide();
    var passengers = document.getElementById("PassengersCount").value;
    sessionStorage.setItem( 'Passengersobject', passengers );
   
})
var UserId = sessionStorage.getItem('UserIdobject');
$("#flighttable").click(function(e) {
    var Status = "Booking";
    sessionStorage.setItem( 'Statusobject', Status );
    sessionStorage.setItem( 'FlightIdobject', e.target.id );
    if(returnDate.style.display === 'none')
    {
        if(UserId>0)
        {
            window.location="BookFlight.html";
        }
        else
        {
            window.location="Login.html";
        }
    }
    else
    {
        var FromCity = document.getElementById("From-City").value;
        var ToCity = document.getElementById("To-City").value;
        var ReturnDate = document.getElementById("return-date").value.replace(/\//g,'-');
        sessionStorage.setItem( 'FromCityRobject', FromCity );
        sessionStorage.setItem( 'ToCityRobject', ToCity );
        sessionStorage.setItem( 'ReturnDateRobject', ReturnDate );
        window.location="ReturnFlightDetails.html";
    }
});
    

    $("#flip").click(function(){
        var temp = $("#From-City").val();
        $("#From-City").val($("#To-City").val());
        $("#To-City").val(temp);
    })

    $("#getflights").click(function(){
        $.getJSON(url,function(data){
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
            var DepartureDate = document.getElementById("departure-date").value.replace(/\//g,'-');
            if(DepartureDate.trim()=="")
        {
            alert("Please enter 'Departure Date'");
            return false;
        }
            var ReturnDate = document.getElementById("return-date").value.replace(/\//g,'-');
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
            var flight_data = [];   
        $.each(data, function(key, value){
             flight_data.push(value);
        });
        var col = [];
        for (var i = 0; i < flight_data.length; i++) {
            for (var key in flight_data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
    
        var table = document.createElement("table");
        var tr = table.insertRow(-1);
    
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
    
        for (var i = 0; i < flight_data.length; i++) {
            if(flight_data[i]["FromCity"]===FromCity && flight_data[i]["ToCity"]===ToCity && flight_data[i]["JourneyDate"] === DepartureDate
            && flight_data[i]["SeatAvailability"]>=PassengersCount)
            {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if(col[j] === "Id")
                {
                    tabCell.innerHTML = '<a href="#"><button><b id="'+flight_data[i][col[j]]+'">Book</b></button></a>';
                }
                else
                {
                    tabCell.innerHTML = flight_data[i][col[j]];
                }
            }
        }
        }
        var divContainer = document.getElementById("flighttable");
        divContainer.innerHTML = "<b>Best Flights</b>";
        divContainer.appendChild(table);
        $('#flighttable th:last-child, #flighttable td:last-child').remove();
        $('#flighttable th:last-child').hide();
        var passengers = document.getElementById("PassengersCount").value;
        sessionStorage.setItem( 'Passengersobject', passengers );
        })

        var UserId = sessionStorage.getItem('UserIdobject');
        $("#flighttable").click(function(e) {
            var Status = "Booking";
            sessionStorage.setItem( 'Statusobject', Status );
            sessionStorage.setItem( 'FlightIdobject', e.target.id );
            if(returnDate.style.display === 'none')
            {
                if(UserId>0)
                {
                    window.location="BookFlight.html";
                }
                else
                {
                    window.location="Login.html";
                }
            }
            else
            {
                var FromCity = document.getElementById("From-City").value;
                var ToCity = document.getElementById("To-City").value;
                var ReturnDate = document.getElementById("return-date").value.replace(/\//g,'-');
                sessionStorage.setItem( 'FromCityRobject', FromCity );
                sessionStorage.setItem( 'ToCityRobject', ToCity );
                sessionStorage.setItem( 'ReturnDateRobject', ReturnDate );
                window.location="ReturnFlightDetails.html";
            }
        });

    })
})

var timeout;
document.onmousemove = function(){
  clearTimeout(timeout);
  timeout = setTimeout(function(){
      sessionStorage.clear();
      window.location = "Index.html";

  }, 600000);
}

$("#logoutuser").click(function(){
  sessionStorage.clear();
  UserId=0;
  window.location = "Index.html";
})