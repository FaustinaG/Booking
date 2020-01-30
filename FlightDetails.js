$(document).ready(function(){
    var FromCity = sessionStorage.getItem('FromCityobject');
    var ToCity = sessionStorage.getItem('ToCityobject');
    var DepartureDate = sessionStorage.getItem('DepartureDateobject');
    var ReturnDate = sessionStorage.getItem('ReturnDateobject');
    var PassengersCount = sessionStorage.getItem('PassengersCountobject');
    var ReturnDateStyle = sessionStorage.getItem('ReturnDateStyleobject');
    sessionStorage.clear();
    var returnDate = document.getElementById("return-date");
    if(ReturnDateStyle === 'none')
    {
        returnDate.style.display = 'none';
        $("#One-way").addClass('active');
    }
    else
    {
        returnDate.style.display = 'block';
        $("#Return").addClass('active');
    }
    $("#One-way").click(function(){
        returnDate.style.display = 'none';
        returnDate.clear();
    })
    $("#Return").click(function(){
        returnDate.style.display = 'block';
    })
    $("#departure-date").datepicker();
    $("#return-date").datepicker();
    var countries = ["Chennai","Delhi","Coimbatore","Bangalore","Vellore","Cochin","Mangalore","Hyderabad"];

    $("#From-City").autocomplete({
    source: countries
    });
    $("#To-City").autocomplete({
        source: countries
        });
    document.getElementById("From-City").value = FromCity;
    document.getElementById("To-City").value = ToCity;
    document.getElementById("departure-date").value = DepartureDate;
    document.getElementById("return-date").value = ReturnDate;
    document.getElementById("PassengersCount").value = PassengersCount;

var url = "http://localhost:60483/api/FlightDetail/GetFlights";
$.getJSON(url, function (data) {
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
        if((flight_data[i]["FromCity"]===FromCity && flight_data[i]["ToCity"]===ToCity) || (returnDate.style.display === 'block'
            && flight_data[i]["FromCity"]===ToCity && flight_data[i]["ToCity"]===FromCity))
        {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if(col[j] === "FlightName")
            {
                tabCell.innerHTML = '<a href="#" id="'+flight_data[i][col[j-1]]+'">'+flight_data[i][col[j]]+'</a>';
            }
            else
            {
                tabCell.innerHTML = flight_data[i][col[j]];
            }
        }
    }
    }
    var divContainer = document.getElementById("flighttable");
    divContainer.innerHTML = "<b>Best Flights</b>";
    divContainer.appendChild(table);
    $('#flighttable th:nth-child(1), #flighttable td:nth-child(1)').remove();
    $('#flighttable th:last-child, #flighttable td:last-child').remove();
    var passengers = document.getElementById("PassengersCount").value;
    sessionStorage.setItem( 'Passengersobject', passengers );
   
})
    

    $("#flip").click(function(){
        var temp = $("#From-City").val();
        $("#From-City").val($("#To-City").val());
        $("#To-City").val(temp);
    })

    $("#getflights").click(function(){
        $.getJSON(url,function(data){
            var FromCity = document.getElementById("From-City").value;
            var ToCity = document.getElementById("To-City").value;
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
            if((flight_data[i]["FromCity"]===FromCity && flight_data[i]["ToCity"]===ToCity) || (returnDate.style.display === 'block'
            && flight_data[i]["FromCity"]===ToCity && flight_data[i]["ToCity"]===FromCity))
            {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if(col[j] === "FlightName")
                {
                    tabCell.innerHTML = '<a href="#" id="'+flight_data[i][col[j-1]]+'">'+flight_data[i][col[j]]+'</a>';
                }
                else
                {
                    tabCell.innerHTML = flight_data[i][col[j]];
                }
            }
        }
        }
        var divContainer = document.getElementById("flighttable");
        divContainer.innerHTML = "<b>Best Flights</b>";
        divContainer.appendChild(table);
        $('#flighttable th:nth-child(1), #flighttable td:nth-child(1)').remove();
        $('#flighttable th:last-child, #flighttable td:last-child').remove();
        var passengers = document.getElementById("PassengersCount").value;
        sessionStorage.setItem( 'Passengersobject', passengers );
        })


        $("#flighttable").click(function(e) {
            sessionStorage.setItem( 'FlightIdobject', e.target.id );
            window.location="Login.html";
        });

    })
})