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
 
        var flightdetail = {
            FromCity : document.getElementById("FromCity").value,
            ToCity : document.getElementById("ToCity").value,
            Departure : DepartureDate,
            Arrival : ReturnDate,
            FlightId : flightid
        }
        $.ajax({
            url: "http://localhost:60483/api/FlightDetail/PostFlightDetail",
            type: "POST",
            data: JSON.stringify(flightdetail),
            headers: {
                'Authorization': 'Bearer '
                    + sessionStorage.getItem("accessToken")
            },
            contentType: "application/json",
            success: function (data) {
                //callback(data);
                var flightdetailid = data.id;
                sessionStorage.setItem( 'FlightDetailIdobject', flightdetailid );
                //sessionStorage.setItem( 'FlightNameobject', document.getElementById("FlightName").value );
                window.location="AddFlightScheduleDetails.html";
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