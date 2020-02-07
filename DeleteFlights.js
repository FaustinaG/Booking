$(document).ready(function(){
    var flightId = sessionStorage.getItem('FlightIdobject');
    $("#delete").click(function(){
        $.ajax({
            url: "http://localhost:60483/api/Flight/DeleteFlight/"+flightId,
            type: "DELETE",
            //data: JSON.stringify(flight),
            contentType: "application/json",
            success: function (data) { 
                callback(data);
                alert("Data deleted successfully");
                window.location="FlightHistory.html";
            }
        })
    }) 
})