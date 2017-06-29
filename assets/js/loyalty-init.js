var files, token;

function prepareUpload(event) {
    files = event.target.files;
}

$(document).ready(function() {

    token = localStorage.getItem('token');

    var adminFirstName = localStorage.getItem('first_name');
    $('#adminFirstName').prepend(adminFirstName);

    $('input[type=file]').on('change', prepareUpload);

    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
        localStorage.setItem('activeLoyaltySchemeTab', $(e.target).attr('href'));
    });
    var activeLoyaltySchemeTab = localStorage.getItem('activeLoyaltySchemeTab');
    if (activeLoyaltySchemeTab) {
        $('#myTab a[href="' + activeLoyaltySchemeTab + '"]').tab('show');
    }

    $.ajax({
        url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/offerloyalty/',
        type: 'GET',

        headers: {
            'Authorization': 'Token ' + token,
        },
        success: function(msg, status, xhr) {
            console.log('msg: ' + msg + ' \nstatus: ' + status + ' \nxhr: ' + xhr);

            var markup2 = '<section class="col-lg-6"  style="border: 1px solid #606060;border-radius: 4px;height:265px;width: 412px;margin-top:40px;margin-left: 40px;background-color:#EEEEEE">' +
                '<img src="assets/images/addImage.png" style="display: block;margin-top: 110px !important;cursor:pointer;" id="addBanner1" class="addImage" data-toggle="modal" data-target="#myModal">' +
                '</section>';
            $('#upload-schemes').append(markup2);
            var NoOfSchemes = msg.length;
            for (var i = 0; i < msg.length; i++) {
                var markup1 = '<section class="col-lg-6"  style="border: 1px solid #606060;border-radius: 4px;height:265px;width: 412px;margin-top:40px;margin-left: 40px;background-color:#EEEEEE">' +
                    '<div class="col-lg-12 Banner"  id="Banner' + msg[i].id + '" style="background-image:url(' + msg[i].small_image + ') ;"onclick=modalFunction2() data-id="' + msg[i].id + '" data-level1="' + msg[i].loyalty_point + '" data-bonus1="' + msg[i].offer_loyalty + '" data-expirydate1="' + msg[i].expiry_timestamp.slice(0, 10) + '" data-details1="' + msg[i].offer_detail + '" data-toggle="modal" data-target="#myModal2"  >' +
                    '</div>' +
                    '<div style="padding-top:10px !important;">' +
                    '<p  style="color:black;"> <b>Offer Expiry: </b>' + msg[i].expiry_timestamp.slice(0, 10) + '</p></div>' +
                    '</section>';

                $('#upload-schemes').append(markup1);
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr + status + error);
        }
    });
    //<i id="removeBanner1" class="fa fa-times" onclick="deleteScheme('+msg[i].id+')"></i>

    $('#offerLoyaltySubmitButton').click(function(e) {

        e.preventDefault();
        var loyalty_point = $("#level").val();
        var offer_loyalty = $("#bonus").val();
        var offer_detail = $("#details").val();
        var expiry_timestamp = $("#expiryDate").val();
        var data = new FormData();
        $.each(files, function(key, value) {
            data.append('file', value);
        })
        data.append('loyalty_point', loyalty_point);
        data.append('offer_loyalty', offer_loyalty);
        data.append('offer_detail', offer_detail);
        data.append('expiry_timestamp', expiry_timestamp);


        $.ajax({
            type: 'POST',
            url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/uploadofferloyalty/',
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
                //window.location.reload();
                //returnValue = msg;
            },
            error: function(xhr, status, error) {
                console.log(xhr + status + error);
            }

        });
    });


    $('#updateOfferLoyaltySubmitButton').click(function(e) {

        e.preventDefault();
        var id = $("#id1").val();
        var loyalty_point = $("#level1").val();
        var offer_loyalty = $("#bonus1").val();
        var offer_detail = $("#details1").val();
        var expiry_timestamp = $("#expiryDate1").val();
        var data = new FormData();
        /*    $.each(files, function(key, value)
            {
                data.append('file', value);
            })   */
        data.append('loyalty_point', loyalty_point);
        data.append('offer_loyalty', offer_loyalty);
        data.append('offer_detail', offer_detail);
        data.append('expiry_timestamp', expiry_timestamp);


        $.ajax({
            type: 'PUT',
            url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/uploadofferloyalty/' + id + '/',
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


    $('#productLoyaltySubmitButton').click(function(e) {

        e.preventDefault();
        var brand = $("#brand").val();
        var product = $("#prdName").val();
        var loyalty_point = $("#loyPoints").val();
        var warranty = $("#warranty").val();
        //    var warranty_month = $("#warrMonth").val();
        //    var warranty_year = $("#warrYear").val();
        var capacity = $("#capacity").val();
        /*var data = {
                        'brand':brand,
                        'loyalty_point':loyalty_point,
                        'product':product,
                        'warranty':warranty,
                        'warranty_year':warranty_year,
                        'warranty_month':warranty_month,
                        'capacity':capacity
                    };*/

        $.ajax({
            type: 'POST',
            url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/productloyalty/',
            dataType: "json",
            //async: false,
            data: JSON.stringify({
                'brand': brand,
                'loyalty_point': loyalty_point,
                'product': product,
                'warranty': warranty,
                //    'warranty_year':warranty_year,
                //    'warranty_month':warranty_month,
                'capacity': capacity
            }),
            //processData: false, // Don't process the files
            headers: {
                'Authorization': 'Token ' + token,
                //    'Content-Type':'application/json'
            },

            success: function(msg, status, xhr) {
                console.log('msg,status,xhr', msg, status, xhr);
                //window.location.reload();
                //returnValue = msg;
            },
            error: function(xhr, status, error) {
                console.log(xhr + status + error);
            }

        });
    });


    $('#updateProductLoyaltySubmitButton').click(function(e) {

        e.preventDefault();
        var id = $("#id2").val();
        var product = $("#prdName1").val();
        var loyalty_point = $("#loyPoints1").val();
        var warranty_month = $("#warrMonth1").val();
        var warranty_year = $("#warrYear1").val();
        //    var data = new FormData();
        /*    $.each(files, function(key, value)
            {
                data.append('file', value);
            })*/
        /*    data.append('loyalty_point', loyalty_point);
            data.append('product', product);
            data.append('warranty_month', warranty_month);
            data.append('warranty_year', warranty_year);*/


        $.ajax({
            type: 'PUT',
            url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/productloyalty/' + id + '/',
            data: JSON.stringify({
                'loyalty_point': loyalty_point,
                'product': product,
                //    'warranty':warranty,
                'warranty_year': warranty_year,
                'warranty_month': warranty_month,
                //   'capacity':capacity
            }),
            //cache: false,
            //dataType: 'json',
            //processData: false, // Don't process the files
            dataType: 'json',
            headers: {
                'Authorization': 'Token ' + token,
                //    'Content-Type':'application/json'
            },

            success: function(msg, status, xhr) {
                console.log('msg,status,xhr', msg, status, xhr);
                //window.location.reload();
                //returnValue = msg;
            },
            error: function(xhr, status, error) {
                console.log(xhr + status + error);
            }

        });
    });


    window.onload = productLoyaltyData();


});

function productLoyaltyData() {
    $.ajax({
        url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/productloyalty/',
        type: 'GET',

        headers: {
            'Authorization': 'Token ' + token,
        },
        success: function(json) {
            for (var i = 0; i < json.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + json[i].product + "</td>");
                tr.append("<td>" + json[i].loyalty_point + "</td>");
                tr.append("<td>" + json[i].warranty_year + " year " + json[i].warranty_month + " months</td>");
                tr.append("<td><span onclick=deleteProductLoyalty(" + json[i].id + ") style='color: black;float:right;padding-left:10px;padding-right:10px;cursor:pointer;'><i class='fa fa-trash fa-5x'></i></span><span  onclick=modalFunction4() data-id='" + json[i].id + "'data-product1='" + json[i].product + "' data-loyaltypoint1='" + json[i].loyalty_point + "' data-warryear1='" + json[i].warranty_year + "' data-warrmonth1='" + json[i].warranty_month + "'  data-toggle='modal' data-target='#myModal4' style='color: black;float:right;cursor:pointer;'><i class='fa fa-pencil fa-5x'></i></span></td>");
                $('#loyalty_points_table_data').append(tr);

            }
        },
        error: function(xhr, status, error) {
            console.log(xhr + status + error);
        }
    });
}

function modalFunction1() {
    //alert("0");;
    $("#myModal").on("show.bs.modal", function(event) {
        $('#myModal').find('input#id').val($(event.relatedTarget).data('id'));
        $('#myModal').find('input#level').val($(event.relatedTarget).data('level'));
        $('#myModal').find('input#bonus').val($(event.relatedTarget).data('bonus'));
        $('#myModal').find('input#expiryDate').val($(event.relatedTarget).data('date'));

    });

}


function deleteProductLoyalty(id) {
    var r = confirm("Are you sure you want delete this Loyalty Point?");
    if (r == true) {
        $.ajax({

            url: 'http://dlpdevelopment-env.ap-south-1.elasticbeanstalk.com/v1/productloyalty/' + id + '/',
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

function deleteScheme(id) {
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

function modalFunction2() {
    $("#myModal2").on("show.bs.modal", function(event) {
        $('#myModal2').find('input#id1').val($(event.relatedTarget).data('id'));
        $('#myModal2').find('input#level1').val($(event.relatedTarget).data('level1'));
        $('#myModal2').find('input#bonus1').val($(event.relatedTarget).data('bonus1'));
        $('#myModal2').find('input#details1').val($(event.relatedTarget).data('details1'));
        $('#myModal2').find('input#expiryDate1').val($(event.relatedTarget).data('expirydate1'));
    });

}

function modalFunction4() {
    $("#myModal4").on("show.bs.modal", function(event) {
        $('#myModal4').find('input#id2').val($(event.relatedTarget).data('id'));
        $('#myModal4').find('input#prdName1').val($(event.relatedTarget).data('product1'));
        $('#myModal4').find('input#loyPoints1').val($(event.relatedTarget).data('loyaltypoint1'));
        $('#myModal4').find('input#warrYear1').val($(event.relatedTarget).data('warryear1'));
        $('#myModal4').find('input#warrMonth1').val($(event.relatedTarget).data('warrmonth1'));
    });

}