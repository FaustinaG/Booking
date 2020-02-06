$(document).ready(function(){
    $("#submit").click(function(){
        var flight = {
            FlightName : document.getElementById("FlightName").value,
            TotalSeats : document.getElementById("TotalSeats").value
        }
        $.ajax({
            url: "http://localhost:60483/api/Flight/PostFlight",
            type: "POST",
            data: JSON.stringify(flight),
            contentType: "application/json",
            success: function (data) {
                var flightid = data.id;
                sessionStorage.setItem( 'flightidobject', flightid );
                sessionStorage.setItem( 'FlightNameobject', document.getElementById("FlightName").value );
                callback(data);
                window.location="AddFlightDetails.html";
            }
        })
    }) 
})