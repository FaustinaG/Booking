$(document).ready(function(){
    var flighdetailId = sessionStorage.getItem('FlightDetailIdobject');
    var url = "http://localhost:60483/api/FlightDetail/GetFlightsById/";
    $.getJSON(url+flighdetailId, function (data) {
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

    for (var i = 0; i < flight_data.length; i++) {
        for (var j = 0; j < col.length; j++) {
            if(col[j] === "DateOfJourney")
            {
                document.getElementById("Departure").value = flight_data[i][col[j]];
                document.getElementById("Arrival").value = flight_data[i][col[j]];
            }
            else if(col[j] === "From City")
            {
                document.getElementById("FromCity").value = flight_data[i][col[j]];
            }
            else if(col[j] === "To City")
            {
                document.getElementById("ToCity").value = flight_data[i][col[j]];
            }
            else if(col[j] === "Price")
            {
                document.getElementById("Price").value = flight_data[i][col[j]];
            }
            else if(col[j] === "Seat Availability")
            {
                document.getElementById("seats").value = flight_data[i][col[j]];
            }
            else if(col[j] === "Flight Name")
            {
                document.getElementById("FlightName").value = flight_data[i][col[j]];
            }
    }
    } 
})

var countries = ["Chennai","Delhi","Coimbatore","Bangalore","Vellore","Cochin","Mangalore","Hyderabad"];

    $("#FromCity").autocomplete({
    source: countries
    });
    $("#ToCity").autocomplete({
        source: countries
        });
    $("#submit").click(function(){
        var FromCity = document.getElementById("FromCity").value;
            if(FromCity.trim()=="")
        {
            alert("Please enter 'From' airport");
            return false;
        }
            var ToCity = document.getElementById("ToCity").value;
            if(ToCity.trim()=="")
        {
            alert("Please enter 'To' airport");
            return false;
        }
        var DepartureDate = $("#Departure").find("input").val();
            if(DepartureDate.trim()=="")
        {
            alert("Please enter 'Departure Date'");
            return false;
        }
        var ReturnDate = $("#Arrival").find("input").val();
            if(ReturnDate.trim()=="")
        {
            alert("Please enter 'Return Date'");
            return false;
        }
        var Price = document.getElementById("Price").value;
        if(Price.trim()=="")
        {
            alert("Please enter 'Price'");
            return false;
        }
        var seats = document.getElementById("seats").value;
        if(seats.trim()=="")
        {
            alert("Please enter 'Seat Availability'");
            return false;
        }
        var flight = {
            Id : flighdetailId,
            FromCity : document.getElementById("FromCity").value,
            ToCity : document.getElementById("ToCity").value,
            Departure : DepartureDate,
            Arrival : ReturnDate,
            Price : document.getElementById("Price").value,
            SeatAvailability : document.getElementById("seats").value
        }
        $.ajax({
            url: "http://localhost:60483/api/FlightDetail/PutFlightdetail",
            type: "PUT",
            data: JSON.stringify(flight),
            contentType: "application/json",
            success: function (data) { 
                alert("Data Saved Successfully");
                window.location="FlightDetailHistory.html";
            },
            error: function () {
                alert("An error occured while processing your request. Please contact program vendor if the problem persist.");
            }
        })
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