$(document).ready(function(){
    var flightId = sessionStorage.getItem('FlightDetailIdobject');
    var url ="http://localhost:60483/api/FlightScheduleDetail/GetFlightScheduleDetailsByFlightDetailId/";
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
                tabCell.innerHTML = '<a href="EditFlightScheduleDetails.html"><button><b id="'+flight_data[i][col[j]]+'">Edit Flight Schedule Detail</b></button></a>';
            }
            else if(col[j] === "FlightId")
            {
                tabCell.innerHTML = '<a href="DeleteFlightScheduleDetails.html"><button><b id="'+flight_data[i][col[j]]+'">Delete Flight Schedule Detail</b></button></a>';
            }
            else
            {
                tabCell.innerHTML = flight_data[i][col[j]];
            }
        }
    }
    var divContainer = document.getElementById("flightscheduledetailtable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    $('#flightscheduledetailtable th:last-child').hide();
    $('#flightscheduledetailtable th:nth-child(10)').hide();
    $('#flightscheduledetailtable th:nth-child(9)').hide();
    $('#flightscheduledetailtable td:last-child').hide();
})

$("#flightscheduledetailtable").click(function(e) {
    sessionStorage.setItem( 'FlightScheduleDetailIdobject', e.target.id );
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