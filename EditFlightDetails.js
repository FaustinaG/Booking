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
            if(col[j] === "Departure")
            {
                document.getElementById("Departure").value = flight_data[i][col[j]];
            }
            else if(col[j] === "Arrival")
            {
                document.getElementById("Arrival").value = flight_data[i][col[j]];
            }
            else if(col[j] === "FromCity")
            {
                document.getElementById("FromCity").value = flight_data[i][col[j]];
            }
            else if(col[j] === "ToCity")
            {
                document.getElementById("ToCity").value = flight_data[i][col[j]];
            }
            else if(col[j] === "Price")
            {
                document.getElementById("Price").value = flight_data[i][col[j]];
            }
            else if(col[j] === "SeatAvailability")
            {
                document.getElementById("seats").value = flight_data[i][col[j]];
            }
            else if(col[j] === "FlightName")
            {
                document.getElementById("FlightName").value = flight_data[i][col[j]];
            }
    }
    } 
})
    $("#submit").click(function(){
        var flight = {
            Id : flighdetailId,
            FromCity : document.getElementById("FromCity").value,
            ToCity : document.getElementById("ToCity").value,
            Departure : document.getElementById("Departure").value,
            Arrival : document.getElementById("Arrival").value,
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