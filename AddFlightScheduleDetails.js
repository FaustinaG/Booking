$(document).ready(function(){
    var flightid = sessionStorage.getItem('FlightDetailIdobject');

    // $.ajax({
    //         url: 'http://localhost:60483/api/FlightDetail/GetFlightDetailsById/'+flightid,
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer '
    //                 + sessionStorage.getItem("accessToken")
    //         },
    //         success: function (data) {
    //             var flight_data = [];   
    //     $.each(data, function(key, value){
    //          flight_data.push(value);
    //     });
    //     var col = [];
    //     for (var i = 0; i < flight_data.length; i++) {
    //         for (var key in flight_data[i]) {
    //             if (col.indexOf(key) === -1) {
    //                 col.push(key);
    //             }
    //         }
    //     }
    
    //     var table = document.createElement("table");
    //     var tr = table.insertRow(-1);
    
    //     for (var i = 0; i < col.length; i++) {
    //         var th = document.createElement("th");
    //         th.innerHTML = col[i];
    //         tr.appendChild(th);
    //     }
    
    //     for (var i = 0; i < flight_data.length; i++) {
    //         document.getElementById("FromCity").value = flight_data[i]["From City"];
    //         document.getElementById("ToCity").value = flight_data[i]["To City"];
    //         break;

    //     }
    //     var divContainer = document.getElementById("flighttable");
    //     divContainer.innerHTML = "<b>Best Flights</b>";
    //     divContainer.appendChild(table);
    //     $('#flighttable th:last-child, #flighttable td:last-child').remove();
    //     $('#flighttable th:last-child').hide();
    //     var passengers = document.getElementById("PassengersCount").value;
    //     sessionStorage.setItem( 'Passengersobject', passengers );
    //         },
    //         error: function (jQXHR) {
    //             if (jQXHR.status == "401") {
    //                 alert("error");
    //             }
    //             else {
    //                 alert("error");
    //             }
    //         }
    //     });

    $("#submit").click(function(){
        var Price = document.getElementById("Price").value;
        if(Price.trim()=="")
        {
            alert("Please enter 'Price'");
            return false;
        }
        var seats = document.getElementById("seats").value;
        if(seats.trim()=="")
        {
            alert("Please enter 'Seat Availability'");
            return false;
        }
        var JourneyDate = $("#JourneyDate").find("input").val();
        if(JourneyDate.trim()=="")
        {
            alert("Please enter 'Journey Date'");
            return false;
        }
        var flightdetail = {
            JourneyDate : JourneyDate,
            Price : document.getElementById("Price").value,
            SeatAvailability : document.getElementById("seats").value,
            FlightDetailId : flightid
        }
        $.ajax({
            url: "http://localhost:60483/api/FlightScheduleDetail/PostFlightScheduleDetail",
            type: "POST",
            data: JSON.stringify(flightdetail),
            headers: {
                'Authorization': 'Bearer '
                    + sessionStorage.getItem("accessToken")
            },
            contentType: "application/json",
            success: function (data) {
                window.location="FlightScheduleDetailHistory.html";
            },
            error: function(xhr, textStatus, errorThrow)
            {
                if(errorThrow==='Unauthorized')
                {
                    sessionStorage.clear();
                    accessId=null;
                    window.location = "Index.html";
                }
                else
                {
                    alert("An error occured while processing your request. Please contact program vendor if the problem persist.");
                }
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