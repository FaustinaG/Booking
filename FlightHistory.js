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
                tabCell.innerHTML = '<a href="FlightDetailHistory.html" id="'+flight_data[i][col[j]]+'"><button><b>Flight Details</b></button></a>';
            }
            else if(col[j] === "FlightId")
            {
                tabCell.innerHTML = '<a href="EditFlights.html" id="'+flight_data[i][col[j]]+'"><button><b>Edit Flights</b></button></a>';
            }
            else if(col[j] === "FlightIdTobeCanceled")
            {
                tabCell.innerHTML = '<a href="DeleteFlights.html" id="'+flight_data[i][col[j]]+'"><button><b>Delete Flights</b></button></a>';
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
    //$('#flighttable th:last-child, #cancelflighttable td:last-child').remove();
    $('#flighttable th:last-child').hide();
    $('#flighttable th:last-child').hide();
    $('#flighttable th:last-child').hide();
})

$("#flighttable").click(function(e) {
    sessionStorage.setItem( 'FlightIdobject', e.target.id );
});
})