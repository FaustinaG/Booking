$(document).ready(function(){
    var flighdetailId = sessionStorage.getItem('FlightScheduleDetailIdobject');
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
            if(col[j] === "Departure")
            {
                document.getElementById("Departure").value = flight_data[i][col[j]];
            }
            else if(col[j] === "Arrival")
            {
                document.getElementById("Arrival").value = flight_data[i][col[j]];
            }
            else if(col[j] === "Journey Date")
            {
                document.getElementById("JourneyDate").value = flight_data[i][col[j]];
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
    $("#submit").click(function(){
        $.ajax({
            url: "http://localhost:60483/api/FlightScheduleDetail/DeleteFlightScheduleDetail/"+flighdetailId,
            type: "DELETE",
            headers: {
                'Authorization': 'Bearer '
                    + sessionStorage.getItem("accessToken")
            },
            //data: JSON.stringify(flight),
            contentType: "application/json",
            success: function (data) { 
                alert("Data deleted successfully");
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
                    alert(errorThrow);
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