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
    var countries = ["Chennai","Delhi","Coimbatore","Bangalore","Vellore","Cochin","Mangalore","Hyderabad"];

    $("#From-City").autocomplete({
    source: countries
    });
    $("#To-City").autocomplete({
        source: countries
        });
    $("#submit").click(function(){
        var FromCity = document.getElementById("FromCity").value;
            if(FromCity.trim()=="")
        {
            alert("Please enter 'From' airport");
            return false;
        }
            var ToCity = document.getElementById("ToCity").value;
            if(ToCity.trim()=="")
        {
            alert("Please enter 'To' airport");
            return false;
        }
            var DepartureDate = document.getElementById("Departure").value.replace(/\//g,'-');
            if(DepartureDate.trim()=="")
        {
            alert("Please enter 'Departure Date'");
            return false;
        }
            var ReturnDate = document.getElementById("Arrival").value.replace(/\//g,'-');
            if(returnDate.style.display === 'block' && ReturnDate.trim()=="")
        {
            alert("Please enter 'Return Date'");
            return false;
        }
        var Price = document.getElementById("Price").value;
        if(Price.trim()=="")
        {
            alert("Please enter 'Price'");
            return false;
        }
        var seats = document.getElementById("seats").value;
        if(seats.trim()=="")
        {
            alert("Please enter 'Seat Availability'");
            return false;
        }
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