var token;
$(document).ready(function() {

    token = localStorage.getItem('token');

    var adminFirstName = localStorage.getItem('first_name');
    $('#adminFirstName').prepend(adminFirstName);

    $.ajax({

        url: apiUrls.productwarranty,
        type: 'GET',
        headers: {
            'Authorization': 'Token ' + token,
        },
        success: function(json) {
            for (var i = 0; i < json.length; i++) {
                console.log(json);
                tr = $('<tr/>');
                tr.append("<td>" + (i + 1) + ".</td>");
                tr.append("<td>" + json[i].dealer_product + "</td>");
                tr.append("<td>" + json[i].unique_code + "</td>");
                tr.append("<td>" + json[i].sell_date.slice(0, 10) + "</td>");
                tr.append("<td>" + json[i].warranty + "</td>");
                tr.append("<td>" + json[i].customer_name + "</td>");
                tr.append("<td>" + json[i].customer_phone + "</td>");
                tr.append("<td>" + json[i].vehicle_number + "</td>");
                tr.append("<td>" + json[i].car_segment + "</td>");
                tr.append("<td>" + json[i].vehicle_manufacturer + "</td>");
                tr.append("<td>" + json[i].vehicle_model + "</td>");

                $('#productWarrantyTableData').append(tr);
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr + status + error);
        }
    });

});