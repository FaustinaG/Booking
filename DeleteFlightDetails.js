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
            if(col[j] === "Journey Date")
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
    $("#submit").click(function(){
        $.ajax({
            url: "http://localhost:60483/api/FlightDetail/DeleteFlightDetail/"+flighdetailId,
            type: "DELETE",
            //data: JSON.stringify(flight),
            contentType: "application/json",
            success: function (data) { 
                alert("Data deleted successfully");
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