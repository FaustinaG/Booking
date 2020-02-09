$(document).ready(function(){
    var flightid = sessionStorage.getItem('flightidobject');
    var flightname = sessionStorage.getItem('FlightNameobject');
    document.getElementById("FlightName").value = flightname;
    $("#Departure").datepicker({
        onSelect: function(dateText, inst) {
            var today = new Date();
            today = Date.parse(today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear());
            var selDate = Date.parse(dateText);

            if(selDate < today) {
                $('#Departure').val('');
                $(inst).datepicker('show');
            }
        }
    });
    $("#Arrival").datepicker({
        onSelect: function(dateText, inst) {
            var today = new Date();
            today = Date.parse(today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear());
            var selDate = Date.parse(dateText);

            if(selDate < today) {
                $('#Arrival').val('');
                $(inst).datepicker('show');
            }
        }
    });
    $("#submit").click(function(){
        var flightdetail = {
            FromCity : document.getElementById("FromCity").value,
            ToCity : document.getElementById("ToCity").value,
            Departure : document.getElementById("Departure").value,
            Arrival : document.getElementById("Arrival").value,
            Price : document.getElementById("Price").value,
            SeatAvailability : document.getElementById("seats").value,
            FlightId : flightid
        }
        $.ajax({
            url: "http://localhost:60483/api/FlightDetail/PostFlightDetail",
            type: "POST",
            data: JSON.stringify(flightdetail),
            contentType: "application/json",
            success: function (data) {
                //callback(data);
                window.location="FlightDetailHistory.html";
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