var token;
$(document).ready(function(e) {

    token = localStorage.getItem('token');

    $('#main-menu-wrapper li').click(function(e) {
        $(this).addClass('open').siblings().removeClass('open');
    });
    var adminFirstName = localStorage.getItem('first_name');
    $('#adminFirstName').prepend(adminFirstName);
    $.ajax({

        url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/getproductbanner/',
        type: 'GET',
        headers: {
            'Authorization': 'Token ' + token,
        },
        success: function(msg, status, xhr) {
            console.log('msg: ' + msg + ' \nstatus: ' + status + ' \nxhr: ' + xhr);
            var NoOfBanners = msg.length;
            for (var i = 0; i < msg.length; i++) {
                var markup1 = '<div class="col-lg-6 Banner"  id="Banner1" style="background-image: url(' + msg[i].small_image + '); " >' +
                    '<i id="removeBanner1" class="fa fa-times" style="cursor:pointer;" onclick="deleteBanner(' + msg[i].id + ')"></i></div>';

                $('#bannersData').append(markup1);
            }

            for (var i = 0; i < 4 - msg.length; i++) {
                var markup2 = '<div class="col-lg-6 Banner"  id="Banner1" style="background-image: url(); " >' +
                    '<img src="../assets/images/addImage.png" style="display: block;margin-top: 90px !important;cursor:pointer;" id="addBanner1" class="addImage" onclick="addBanner(Banner1)"></div>';

                $('#bannersData').append(markup2);
            }
        }
    });

    $('#logout').click(function(e) {
        localStorage.removeItem('token');
        localStorage.removeItem('activeLoyaltySchemeTab');
    });


});
var files;

function deleteBanner(id) {
    var r = confirm("Are you sure you want delete this Banner?");
    if (r == true) {
        $.ajax({

            url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/deleteproductbanner/' + id + '/',
            type: 'DELETE',
            headers: {
                'Authorization': 'Token ' + token,
            },
            success: function(msg, status, xhr) {
                console.log('msg: ' + msg + ' \nstatus: ' + status + ' \nxhr: ' + xhr);
                window.location.reload();
            },
            error: function(xhr, status, error) {
                console.log(xhr + status + error);
            }
        });

    }

}

function prepareUpload(event) {
    files = event.target.files;
    var data = new FormData();
    $.each(files, function(key, value) {
        data.append('file', value);
    })
    $.ajax({

        url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/createproductbanner/',
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
            window.location.reload();

        },
        error: function(xhr, status, error) {
            console.log(xhr + status + error);
        }
    });
}


function addBanner() {
    $("#file").click();
    $('input[type=file]').on('change', prepareUpload);
}