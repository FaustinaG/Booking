$(document).ready(function(){
    var FlightId = sessionStorage.getItem('FlightIdobject');
    var userID = sessionStorage.getItem('clickedID');
    var Price = sessionStorage.getItem('Priceobject');
    var Passengers = sessionStorage.getItem('Passengersobject');
    var FlightId = sessionStorage.getItem('Idobject');
    document.getElementById("Passengers").value = Passengers;
    document.getElementById("Price").value = (Price*Passengers);
    $("#book").click(function(){
        var ticket = {
        BookingStatus : 0,
        PassengerCount : Passengers,
        TotalFare : "5000",
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