$(document).ready(function(){
    var url ="http://localhost:60483/api/Flight/GetFlights/";
    $.getJSON(url,function(data){
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
                tabCell.innerHTML = '<a href="FlightDetailHistory.html"><button><b id="'+flight_data[i][col[j]]+'">Flight Details</b></button></a>';
            }
            else if(col[j] === "FlightId")
            {
                tabCell.innerHTML = '<a href="EditFlights.html"><button><b id="'+flight_data[i][col[j]]+'">Edit Flights</b></button></a>';
            }
            else if(col[j] === "FlightIdTobeCanceled")
            {
                tabCell.innerHTML = '<a href="DeleteFlights.html"><button><b id="'+flight_data[i][col[j]]+'">Delete Flights</b></button></a>';
            }
            else
            {
                tabCell.innerHTML = flight_data[i][col[j]];
            }
        }
    }
    var divContainer = document.getElementById("flighttable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    
    $('#flighttable th:last-child').hide();
    $('#flighttable th:nth-child(3)').hide();
    $('#flighttable th:nth-child(4)').hide();
})

$("#flighttable").click(function(e) {
    sessionStorage.setItem( 'FlightIdobject', e.target.id );
 
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