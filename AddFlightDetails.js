$(document).ready(function(){
    var flightid = sessionStorage.getItem('flightidobject');
    var flightname = sessionStorage.getItem('FlightNameobject');
    document.getElementById("FlightName").value = flightname;
    $("#submit").click(function(){
        var flightdetail = {
            FromCity : document.getElementById("FromCity").value,
            ToCity : document.getElementById("ToCity").value,
            Departure : document.getElementById("Departure").value,
            Arrival : document.getElementById("Arrival").value,
            Price : document.getElementById("Price").value,
            SeatAvailability : document.getElementById("seats").value,
            FlightId : flightid
        }
        $.ajax({
            url: "http://localhost:60483/api/FlightDetail/PostFlightDetail",
            type: "POST",
            data: JSON.stringify(flightdetail),
            contentType: "application/json",
            success: function (data) {
                callback(data);
                window.location="AddFlightDetails.html";
            }
        })
    }) 
})