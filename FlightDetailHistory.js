$(document).ready(function(){
    var flightId = sessionStorage.getItem('FlightIdobject');
    var url ="http://localhost:60483/api/FlightDetail/GetFlightDetailsByFlightId/";
    $.getJSON(url+flightId,function(data){
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
            if(col[j] === "Id")
            {
                tabCell.innerHTML = '<a href="FlightScheduleDetailHistory.html"><button><b id="'+flight_data[i][col[j]]+'">Flight schedule details</b></button></a>';
            }
            else if(col[j] === "FlightId")
            {
                tabCell.innerHTML = '<a href="EditFlightDetails.html"><button><b id="'+flight_data[i][col[j]]+'">Edit Flight Detail</b></button></a>';
            }
            else if(col[j] === "FlightIdTobeCanceled")
            {
                tabCell.innerHTML = '<a href="DeleteFlightDetails.html"><button><b id="'+flight_data[i][col[j]]+'">Delete Flight Detail</b></button></a>';
            }
            else
            {
                tabCell.innerHTML = flight_data[i][col[j]];
            }
        }
    }
    var divContainer = document.getElementById("flightdetailtable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    $('#flightdetailtable th:last-child').hide();
    $('#flightdetailtable th:nth-child(9)').hide();
    $('#flightdetailtable th:nth-child(10)').hide();
    $('#flightdetailtable th:nth-child(8)').hide();
    $('#flightdetailtable td:nth-child(8)').hide();
    $('#flightdetailtable th:nth-child(7)').hide();
    $('#flightdetailtable td:nth-child(7)').hide();
})

$("#flightdetailtable").click(function(e) {
    sessionStorage.setItem( 'FlightDetailIdobject', e.target.id );
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