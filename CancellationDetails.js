$(document).ready(function(){
    var TicketId = sessionStorage.getItem('TicketIdobject');
    var UserId = sessionStorage.getItem('UserIdobject');
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
                        }
                    })
                window.location="CancellationResult.html";
            }
        })
        
    })
})