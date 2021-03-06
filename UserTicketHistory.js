$(document).ready(function(){
    var UserId = sessionStorage.getItem('UserIdobject');

$.ajax({
    url: 'http://localhost:60483/api/TicketDetail/GetTicketDetailHistory/'+UserId,
    method: 'GET',
    headers: {
        'Authorization': 'Bearer '
            + sessionStorage.getItem("accessToken")
    },
    success: function (data) {
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
                tabCell.innerHTML = flight_data[i][col[j]];
        }
    }
    var divContainer = document.getElementById("flighttable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    
    $('#flighttable th:last-child, #flighttable td:last-child').remove();
    $('#flighttable th:last-child, #flighttable td:last-child').remove();
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
});

$("#flighttable").click(function(e) {
    sessionStorage.setItem( 'TicketIdobject', e.target.id );
 
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