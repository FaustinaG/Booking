$(document).ready(function(){
    var flighdetailId = sessionStorage.getItem('FlightDetailIdobject');
    $("#submit").click(function(){
        $.ajax({
            url: "http://localhost:60483/api/FlightDetail/DeleteFlightDetail"+flighdetailId,
            type: "DELETE",
            //data: JSON.stringify(flight),
            contentType: "application/json",
            success: function (data) { 
                alert("Data deleted successfully");
                callback(data);
                window.location="FlightDetailHistory.html";
            }
        })
    }) 
})