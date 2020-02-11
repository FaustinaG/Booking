$(document).ready(function(){
    var flightid = sessionStorage.getItem('FlightIdobject');
    //var flightname = sessionStorage.getItem('FlightNameobject');
    //document.getElementById("FlightName").value = flightname;
    // $("#Departure").datetimepicker();
    // $('#Arrival').datetimepicker();
    var countries = ["Chennai","Delhi","Coimbatore","Bangalore","Vellore","Cochin","Mangalore","Hyderabad"];

    $("#FromCity").autocomplete({
    source: countries
    });
    $("#ToCity").autocomplete({
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
            var DepartureDate = $("#Departure").find("input").val();
            if(DepartureDate.trim()=="")
        {
            alert("Please enter 'Departure Date'");
            return false;
        }
            var ReturnDate = $("#Arrival").find("input").val();
            if(ReturnDate.trim()=="")
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
            Departure : DepartureDate,
            Arrival : ReturnDate,
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