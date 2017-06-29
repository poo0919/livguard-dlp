var files, token;
$(document).ready(function() {

    token = localStorage.getItem('token');

    var adminFirstName = localStorage.getItem('first_name');
    $('#adminFirstName').prepend(adminFirstName);

    $('input[type=file]').on('change', prepareUpload);

    $('#add_new_notification_button').click(function(e) {

        e.preventDefault();
        var notification = $("#notification").val();
        var link = $("#link").val();
        var description = $("#description").val();
        var data = new FormData();
        $.each(files, function(key, value) {
            data.append('file', value);
        })
        data.append('notification', notification);
        data.append('link', link);
        data.append('description', description);
        data.append('is_active', true);


        $.ajax({
            type: 'POST',
            url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/uploadnotification/',
            data: data,
            cache: false,
            //dataType: 'json',
            processData: false, // Don't process the files
            contentType: false,
            headers: {
                'Authorization': 'Token ' + token,
            },
            //async: false,
            //processData:false,
            success: function(msg, status, xhr) {
                console.log('msg,status,xhr', msg, status, xhr);
                window.location.reload();
                //returnValue = msg;
            },
            error: function(xhr, status, error) {
                console.log(xhr + status + error);
            }

        });
    });

    $('#update_notification_button').click(function(e) {

        e.preventDefault();
        var notification = $("#notification1").val();
        var link = $("#link1").val();
        var description = $("#description1").val();
        var id = $("#id1").val();
        //   alert(id);
        var data = new FormData();
        /* $.each(files, function(key, value)
         {
             data.append('file', value);
         })*/
        data.append('notification', notification);
        data.append('link', link);
        data.append('description', description);
        //    data.append('is_active', true);


        $.ajax({
            type: 'PUT',
            url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/uploadnotification/' + id + '/',
            data: data,
            cache: false,
            //dataType: 'json',
            processData: false, // Don't process the files
            contentType: false,
            headers: {
                'Authorization': 'Token ' + token,
            },
            //async: false,
            //processData:false,
            success: function(msg, status, xhr) {
                console.log('msg,status,xhr', msg, status, xhr);
                window.location.reload();
                //returnValue = msg;
            },
            error: function(xhr, status, error) {
                console.log(xhr + status + error);
            }

        });
    });



    $.ajax({

        url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/notification/',
        type: 'GET',
        headers: {
            'Authorization': 'Token ' + token,
        },
        success: function(json) {

            for (var i = 0; i < json.length; i++) {
                var state, status, bckCol;
                if (json[i].is_active == true) {
                    status = "Deactivate";
                    state = false;
                    bckCol = "#EB5757";
                } else {
                    status = "Activate";
                    state = true;
                    bckCol = "#6FCF97";
                }
                var markup = '<section class="col-lg-6"  style="border: 1px solid #606060;border-radius: 4px;height:344px;width: 466px;margin-left:25px;margin-top:20px;background-color:#EEEEEE">' +

                    '<div class="col-lg-12 Banner"  id="Banner' + json[i].id + '" style="background-image:url(' + json[i].small_image + ');background-size: 100% 100%;margin-bottom:15px;" >' +

                    '</div>' +


                    '<button style="float:right;color:white;background-color:' + bckCol + ';" onclick="changeNotifyState(' + state + ',' + json[i].id + ')">' + status + '</button><br>' +
                    '<span onclick=deleteNotification(' + json[i].id + ') style="color: black;float:right;padding-left:10px;padding-right:10px;cursor:pointer;"><i class="fa fa-trash fa-5x"></i></span>' +
                    '<span id="id" onclick=modalFunction2() data-id="' + json[i].id + '" data-notification1="' + json[i].notification + '" data-link1="' + json[i].link + '" data-description1="' + json[i].description + '" data-img-url="' + json[i].small_image + '" data-toggle="modal" data-target="#myModal2" style="color: black;float:right;cursor:pointer;"><i class="fa fa-pencil fa-5x"></i></span>' +
                    '<div><h4 style="color:black;">' + json[i].notification + '</h4>' +
                    '<p style="color:black;">' + json[i].description + '</p></div>' +
                    '</section>';


                $('#notificationData').append(markup);
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr + status + error);
        }


    });

});

function prepareUpload(event) {
    files = event.target.files;
}

function deleteNotification(id) {
    var r = confirm("Are you sure you want delete this Notification?");
    if (r == true) {
        $.ajax({

            url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/notification/' + id + '/',
            type: 'DELETE',
            headers: {
                'Authorization': 'Token ' + token,
            },
            success: function(msg, status, xhr) {
                console.log(msg + " " + status + " " + xhr);
                window.location.reload();

            },
            error: function(xhr, status, error) {
                console.log(xhr + status + error);
            }
        });
    }


}

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function changeNotifyState(state, id) {
    var data = {
        "is_active": state
    };
    $.ajax({

        url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/uploadnotification/' + id + '/',
        type: 'PUT',
        data: data,
        cache: false,

        headers: {
            'Authorization': 'Token ' + token,
        },
        success: function(msg, status, xhr) {
            console.log(msg + " " + status + " " + xhr);
            window.location.reload();

        },
        error: function(xhr, status, error) {
            console.log(xhr + status + error);
        }
    });

}

$("#file").change(function() {
    readURL(this);
});

function modalFunction2() {
    $("#myModal2").on("show.bs.modal", function(event) {
        $('#myModal2').find('input#id1').val($(event.relatedTarget).data('id'));
        $('#myModal2').find('input#notification1').val($(event.relatedTarget).data('notification1'));
        $('#myModal2').find('input#link1').val($(event.relatedTarget).data('link1'));
        $('#myModal2').find('textarea#description1').val($(event.relatedTarget).data('description1'));

    });
}