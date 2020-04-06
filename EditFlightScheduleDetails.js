$(document).ready(function(){
    var flighdetailId = sessionStorage.getItem('FlightScheduleDetailIdobject');
    $("#JourneyDate").datepicker();
    var url = "http://localhost:60483/api/FlightScheduleDetail/GetFlightScheduleDetailsById/";
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
            if(col[j] === "Journey Date")
            {
                document.getElementById("JourneyDate").value = flight_data[i][col[j]];
            }
            if(col[j] === "Price")
            {
                document.getElementById("Price").value = flight_data[i][col[j]];
            }
            else if(col[j] === "Seat Availability")
            {
                document.getElementById("seats").value = flight_data[i][col[j]];
            }
    }
    } 
})


    $("#submit").click(function(){
        
        var JourneyDate = document.getElementById("JourneyDate").value;
            if(JourneyDate.trim()=="")
        {
            alert("Please enter 'Journey Date'");
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
            JourneyDate : JourneyDate,
            Price : document.getElementById("Price").value,
            SeatAvailability : document.getElementById("seats").value
        }
        $.ajax({
            url: "http://localhost:60483/api/FlightScheduleDetail/PutFlightScheduleDetail",
            type: "PUT",
            data: JSON.stringify(flight),
            headers: {
                'Authorization': 'Bearer '
                    + sessionStorage.getItem("accessToken")
            },
            contentType: "application/json",
            success: function (data) { 
                alert("Data Saved Successfully");
                window.location="FlightScheduleDetailHistory.html";
            },
            error: function(xhr, textStatus, errorThrow)
            {
                if(errorThrow==='Unauthorized')
                {
                    sessionStorage.clear();
                    accessId=null;
                    window.location = "Index.html";
                }
                else
                {
                    alert("An error occured while processing your request. Please contact program vendor if the problem persist.");
                }
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