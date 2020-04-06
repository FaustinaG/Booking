$(document).ready(function(){
    var UserId = sessionStorage.getItem('UserIdobject');
    var url ="http://localhost:60483/api/TicketDetail/GetTicketDetail/";


$.ajax({
        url: 'http://localhost:60483/api/TicketDetail/GetTicketDetail/'+UserId,
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
            if(col[j] === "Id")
            {
                tabCell.innerHTML = '<a href="#"><button><b id="'+flight_data[i][col[j]]+'">Cancel ticket</b></button></a>';
            }
            else
            {
                tabCell.innerHTML = flight_data[i][col[j]];
            }
        }
    }
    var divContainer = document.getElementById("cancelflighttable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    $('#cancelflighttable th:last-child, #cancelflighttable td:last-child').remove();
    $('#cancelflighttable th:last-child').hide();
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

$("#cancelflighttable").click(function(e) {
    sessionStorage.setItem( 'TicketIdobject', e.target.id );
    window.location="CancellationDetails.html";
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