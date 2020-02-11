$(document).ready(function(){
    var TicketId = sessionStorage.getItem('TicketIdobject');
    var UserId = sessionStorage.getItem('UserIdobject');
    var url ="http://localhost:60483/api/TicketDetail/GetTicketDetailByTicketId/";
    $.getJSON(url+TicketId,function(data){
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
            if(col[j] === "FromCity")
            {
                document.getElementById("From-City").value = flight_data[i][col[j]];
            }
            else if(col[j] === "ToCity")
            {
                document.getElementById("To-City").value = flight_data[i][col[j]];
            }
            else if(col[j] === "PassengerCount")
            {
                document.getElementById("Passengers").value = flight_data[i][col[j]];
            }
            else if(col[j] === "TotalFare")
            {
                document.getElementById("Price").value = flight_data[i][col[j]];
            }
        }
    }
})
    $("#cancel").click(function(){

        $.ajax({
            url: "http://localhost:60483/api/TicketDetail/PutTicketCancellation/"+TicketId,
            type: "PUT",
            contentType: "application/json",
            success: function (data) {
                var history = {
                    UserLoginId : UserId,
                    TicketDetailId : TicketId
                }
                    $.ajax({
                        url: "http://localhost:60483/api/UserTicketHistory/PostUserTicketHistory",
                        type: "POST",
                        data: JSON.stringify(history),
                        contentType: "application/json",
                        success: function (data) {
                            callback(data);
                        },
                        error: function () {
                            alert("An error occured while processing your request. Please contact program vendor if the problem persist.");
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