$(document).ready(function(){
    var flighdetailId = sessionStorage.getItem('FlightDetailIdobject');
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
                callback(data);
                window.location="FlightDetailHistory.html";
            }
        })
    }) 
})