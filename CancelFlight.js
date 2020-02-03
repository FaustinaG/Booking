$(document).ready(function(){
    var UserId = sessionStorage.getItem('UserIdobject');
    var url ="http://localhost:60483/api/TicketDetail/GetTicketDetail/";
    $.getJSON(url+UserId,function(data){
        //var FromCity = document.getElementById("From-City").value;
        //var ToCity = document.getElementById("To-City").value;
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
        //if((flight_data[i]["FromCity"]===FromCity && flight_data[i]["ToCity"]===ToCity) || (returnDate.style.display === 'block'
        //&& flight_data[i]["FromCity"]===ToCity && flight_data[i]["ToCity"]===FromCity))
        //{
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if(col[j] === "Id")
            {
                tabCell.innerHTML = '<a href="#" id="'+flight_data[i][col[j-1]]+'"><button><b>Cancel ticket</b></button></a>';
            }
            else
            {
                tabCell.innerHTML = flight_data[i][col[j]];
            }
        }
    //}
    }
    var divContainer = document.getElementById("cancelflighttable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    $('#cancelflighttable th:last-child, #cancelflighttable td:last-child').remove();
    $('#cancelflighttable th:last-child').hide();
})

$("#cancelflighttable").click(function(e) {
    sessionStorage.setItem( 'TicketIdobject', e.target.id );
    window.location="CancellationDetails.html";
});

})