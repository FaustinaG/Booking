$(document).ready(function(){
    var flightId = sessionStorage.getItem('FlightIdobject');
    var url = "http://localhost:60483/api/Flight/GetFlightsById/";
    $.getJSON(url+flightId, function (data) {
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
            if(col[j] === "FlightName")
            {
                document.getElementById("FlightName").value = flight_data[i][col[j]];
            }
            else if(col[j] === "TotalSeats")
            {
                document.getElementById("TotalSeats").value = flight_data[i][col[j]];
            }
    }
    } 
})

    $("#submit").click(function(){
        var flight = {
            Id : flightId,
            FlightName : document.getElementById("FlightName").value,
            TotalSeats : document.getElementById("TotalSeats").value
        }
        $.ajax({
            url: "http://localhost:60483/api/Flight/PutFlight",
            type: "PUT",
            data: JSON.stringify(flight),
            contentType: "application/json",
            success: function (data) { 
                window.location="FlightHistory.html";
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