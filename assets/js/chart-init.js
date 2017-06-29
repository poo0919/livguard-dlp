var token;
$(document).ready(function(e) {

    token = localStorage.getItem('token');

    var adminFirstName = localStorage.getItem('first_name');
    $('#adminFirstName').prepend(adminFirstName);

    $("#file").click();
    $('input[type=file]').on('change', prepareUpload);

    $('#appChartCSVimport').click(function(e) {
        var data = new FormData();
        $.each(files, function(key, value) {
            data.append('file', value);
        })
        $.ajax({

            url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/csvcarsegment/',
            type: 'POST',
            data: data,
            cache: false,
            //dataType: 'json',
            processData: false, // Don't process the files
            contentType: false,
            headers: {
                'Authorization': 'Token ' + token,
            },
            //async: false,
            success: function(msg, status, xhr) {
                console.log('msg: ' + msg + ' \nstatus: ' + status + ' \nxhr: ' + xhr);
                alert(msg.detail);
                //window.location.reload();

            },
            error: function(xhr, status, error) {
                console.log(xhr + status + error);
            }
        });
    });


    $.ajax({

        url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/carmodel/',
        type: 'GET',
        headers: {
            'Authorization': 'Token ' + token,
        },
        success: function(json) {
            console.log(json);
            for (var i = 0; i < json.length; i++) {

                tr = $('<tr>');
                tr.append("<td>" + (i + 1) + ".</td>");
                tr.append("<td>" + json[i].vehicle_manufacturer + "</td>");
                tr.append("<td>" + json[i].car_segment + "</td>");
                tr.append("<td>" + json[i].vehicle_model + "</td>");
                tr.append("<td>" + json[i].fuel + "</td>");
                tr.append("<td>" + json[i].product[0].capacity + "</td>");
                tr.append("<td>" + json[i].product[0].brand__name + "</td>");
                tr.append("<td>" + json[i].product[0].product + "</td>");
                tr.append("<td>" + json[i].product[0].warranty + "</td>");
                tr.append("</tr>");


                $('#applicationChartTableData').append(tr);
            }

        },
        error: function(xhr, status, error) {
            console.log(xhr + status + error);
        }
    });

    getPagination('#applicationChartTableData');


});
var files;

function prepareUpload(event) {
    files = event.target.files;
}