$(document).ready(function(){
    $("#submit").click(function(){
        var FlightName = document.getElementById("FlightName").value;
        if(FlightName.trim()=="")
        {
            alert("Please enter 'Flight Name'");
            return false;
        }
        var TotalSeats = document.getElementById("TotalSeats").value;
        if(TotalSeats.trim()=="")
        {
            alert("Please enter 'Total Seats'");
            return false;
        }
        var flight = {
            FlightName : document.getElementById("FlightName").value,
            TotalSeats : document.getElementById("TotalSeats").value
        }
        $.ajax({
            url: "http://localhost:60483/api/Flight/PostFlight",
            type: "POST",
            data: JSON.stringify(flight),
            headers: {
                'Authorization': 'Bearer '
                    + sessionStorage.getItem("accessToken")
            },
            contentType: "application/json",
            success: function (data) {
                var flightid = data.id;
                sessionStorage.setItem( 'FlightIdobject', flightid );
                sessionStorage.setItem( 'FlightNameobject', document.getElementById("FlightName").value );
                //callback(data);
                window.location="AddFlightDetails.html";
            },
            error: function(xhr, textStatus, errorThrow)
            {
                if(errorThrow==='Unauthorized')
                {
                    sessionStorage.clear();
                    accessId=null;
                    window.location = "Index.html";
                }
                alert(errorThrow);
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