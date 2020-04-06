$(document).ready(function(){
    var FlightId = sessionStorage.getItem('FlightIdobject');
    var Passengers = sessionStorage.getItem('Passengersobject');
    var ReturnFlightId = sessionStorage.getItem('ReturnFlightIdobject');
    var UserId = sessionStorage.getItem('UserIdobject');
    sessionStorage.removeItem('FlightIdobject');
    sessionStorage.removeItem('ReturnFlightIdobject');
    sessionStorage.removeItem('Passengersobject');
    var ReturnTotalFare = 0;
    var OnwardTotalFare = 0;

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

    var table = document.createElement("table");
        var tr = table.insertRow(-1);
    
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
    
        for (var i = 0; i < flight_data.length; i++) {

            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if(col[j] === "Price")
            {
                var Price = flight_data[i][col[j]];
                OnwardTotalFare = (Price*Passengers);
                tabCell.innerHTML = flight_data[i][col[j]];
            }
            else
            {
                tabCell.innerHTML = flight_data[i][col[j]];
            }
            }

        }
        var divContainer = document.getElementById("bookflighttable");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        $('#bookflighttable th:last-child, #bookflighttable td:last-child').remove();
        $('#bookflighttable th:last-child, #bookflighttable td:last-child').remove();
        $('#bookflighttable th:last-child, #bookflighttable td:last-child').remove();

})
if(ReturnFlightId>0)
{
$.getJSON(url+ReturnFlightId, function (data) {
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

var table = document.createElement("table");
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < flight_data.length; i++) {

        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if(col[j] === "Price")
            {
                var Price = flight_data[i][col[j]];
                ReturnTotalFare = (Price*Passengers);
                tabCell.innerHTML = flight_data[i][col[j]];
            }
            else
            {
                tabCell.innerHTML = flight_data[i][col[j]];
            }
        }

    }
    var divContainer = document.getElementById("returnflighttable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    $('#returnflighttable th:last-child, #returnflighttable td:last-child').remove();
    $('#returnflighttable th:last-child, #returnflighttable td:last-child').remove();
    $('#returnflighttable th:last-child, #returnflighttable td:last-child').remove();

})
}
else
{
    $('#returnflighttable').remove();
    $("#returnjourney").remove();
}


    $("#book").click(function(){
        var ticket = {
        BookingStatus : 0,
        PassengerCount : Passengers,
        TotalFare : OnwardTotalFare,
        CancellationFare : "0",
        FlightScheduleDetailId : FlightId
    }

        $.ajax({
            url: "http://localhost:60483/api/TicketDetail/PostTicketBooking",
            type: "POST",
            data: JSON.stringify(ticket),
            headers: {
                        'Authorization': 'Bearer '
                            + sessionStorage.getItem("accessToken")
                    },
            contentType: "application/json",
            success: function (data) {
                var ticketid = data.id;
                var history = {
                    UserId : UserId,
                    TicketDetailId : ticketid
                }
                    $.ajax({
                        url: "http://localhost:60483/api/UserTicketHistory/PostUserTicketHistory",
                        type: "POST",
                        data: JSON.stringify(history),
                        headers: {
                            'Authorization': 'Bearer '
                                + sessionStorage.getItem("accessToken")
                        },
                        contentType: "application/json",
                        success: function (data) {
                            if(!(ReturnFlightId>0))
                            {
                                window.location="Result.html";
                            }
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
        if(ReturnFlightId>0)
        {
            var returnticket = {
                BookingStatus : 0,
                PassengerCount : Passengers,
                TotalFare : ReturnTotalFare,
                CancellationFare : "0",
                FlightScheduleDetailId : ReturnFlightId
            }
        
                $.ajax({
                    url: "http://localhost:60483/api/TicketDetail/PostTicketBooking",
                    type: "POST",
                    data: JSON.stringify(returnticket),
                    headers: {
                        'Authorization': 'Bearer '
                            + sessionStorage.getItem("accessToken")
                    },
                    contentType: "application/json",
                    success: function (data) {
                        var ticketid = data.id;
                        var returnhistory = {
                            UserId : UserId,
                            TicketDetailId : ticketid
                        }
                            $.ajax({
                                url: "http://localhost:60483/api/UserTicketHistory/PostUserTicketHistory",
                                type: "POST",
                                data: JSON.stringify(returnhistory),
                                headers: {
                                    'Authorization': 'Bearer '
                                        + sessionStorage.getItem("accessToken")
                                },
                                contentType: "application/json",
                                success: function (data) {
                                    window.location="Result.html";
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
        }

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