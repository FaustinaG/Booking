$(document).ready(function(){
    var TicketId = sessionStorage.getItem('TicketIdobject');
    var UserId = sessionStorage.getItem('UserIdobject');
    var url ="http://localhost:60483/api/TicketDetail/GetTicketDetailByTicketId/";

$.ajax({
    url: 'http://localhost:60483/api/TicketDetail/GetTicketDetailByTicketId/'+TicketId,
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
    
        for (var i = 0; i < flight_data.length; i++) {
            for (var j = 0; j < col.length; j++) {          
                if(col[j] === "From City")
                {
                    document.getElementById("From-City").value = flight_data[i][col[j]];
                }
                else if(col[j] === "To City")
                {
                    document.getElementById("To-City").value = flight_data[i][col[j]];
                }
                else if(col[j] === "Passenger Count")
                {
                    document.getElementById("Passengers").value = flight_data[i][col[j]];
                }
                else if(col[j] === "Total Fare")
                {
                    document.getElementById("Price").value = flight_data[i][col[j]];
                }
            }
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
});

    $("#cancel").click(function(){

        $.ajax({
            url: "http://localhost:60483/api/TicketDetail/PutTicketCancellation/"+TicketId,
            type: "PUT",
            headers: {
                'Authorization': 'Bearer '
                    + sessionStorage.getItem("accessToken")
            },
            contentType: "application/json",
            success: function (data) {
                var history = {
                    UserId : UserId,
                    TicketDetailId : TicketId
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
                            callback(data);
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
                window.location="CancellationResult.html";
            },
            error: function () {
                alert("An error occured while processing your request. Please contact program vendor if the problem persist.");
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