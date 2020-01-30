$(document).ready(function(){
    var FlightId = sessionStorage.getItem('FlightIdobject');
    var Passengers = sessionStorage.getItem('Passengersobject');
    document.getElementById("Passengers").value = Passengers;


    var url = "http://localhost:60483/api/FlightDetail/GetFlightsById/";
$.getJSON(url+FlightId, function (data) {
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
            if(col[j] === "Price")
            {
                var Price = flight_data[i][col[j]];
                document.getElementById("Price").value = (Price*Passengers);
            }
    }
    } 
})

    $("#book").click(function(){
        var ticket = {
        BookingStatus : 0,
        PassengerCount : Passengers,
        TotalFare : document.getElementById("Price").value,
        CancellationFare : "0",
        FlightDetailId : FlightId
    }

        $.ajax({
            url: "http://localhost:60483/api/TicketDetail/PostTicketBooking",
            type: "POST",
            data: JSON.stringify(ticket),
            contentType: "application/json",
            success: function (data) {
                callback(data);
            }
        })
        window.location="Result.html";
    })
})