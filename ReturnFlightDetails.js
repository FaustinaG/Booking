$(document).ready(function(){
    var FromCity = sessionStorage.getItem('FromCityRobject');
    var ToCity = sessionStorage.getItem('ToCityRobject');
    var ReturnDate = sessionStorage.getItem('ReturnDateRobject');
    var Passengers = sessionStorage.getItem('Passengersobject');

    document.getElementById("From-City").value = ToCity;
    document.getElementById("To-City").value = FromCity;
    document.getElementById("departure-date").value = ReturnDate;
    document.getElementById("PassengersCount").value = Passengers;

    var url = "http://localhost:60483/api/FlightDetail/GetFlights";
$.getJSON(url, function (data) {
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
        if(flight_data[i]["From City"]===ToCity && flight_data[i]["To City"]===FromCity 
        && flight_data[i]["Journey Date"] === ReturnDate && flight_data[i]["Seat Availability"]>=Passengers)
        {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if(col[j] === "Id")
            {
                tabCell.innerHTML = '<a href="#"><button><b id="'+flight_data[i][col[j]]+'">Book</b></button></a>';
            }
            else
            {
                tabCell.innerHTML = flight_data[i][col[j]];
            }
        }
    }
    }
    var divContainer = document.getElementById("returnflighttable");
    divContainer.innerHTML = "<b>Best Flights</b>";
    divContainer.appendChild(table);
    $('#returnflighttable th:last-child, #returnflighttable td:last-child').remove();
    $('#returnflighttable th:last-child').hide();
    $('#returnflighttable td:last-child').hide();

    var rowCount = $('#returnflighttable tr').length;
    if(rowCount === 1)
    {
    alert("No Flights Found for return journey");
    if(UserId>0)
    {
        window.location="BookFlight.html";
    }
    else
    {
        window.location="Login.html";
    }
    }
   
})
var UserId = sessionStorage.getItem('UserIdobject');
$("#returnflighttable").click(function(e) {
    sessionStorage.setItem( 'ReturnFlightIdobject', e.target.id );
    if(UserId>0)
    {
        window.location="BookFlight.html";
    }
    else
    {
        window.location="Login.html";
    }
});
})

var timeout;
document.onmousemove = function(){
  clearTimeout(timeout);
  timeout = setTimeout(function(){
      sessionStorage.clear();
      window.location = "Index.html";

  }, 600000);
}

$("#logoutuser").click(function(){
  sessionStorage.clear();
  UserId=0;
  window.location = "Index.html";
})