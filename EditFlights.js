$(document).ready(function(){
    var flightId = sessionStorage.getItem('FlightIdobject');
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
                callback(data);
                window.location="FlightHistory.html";
            }
        })
    }) 
})