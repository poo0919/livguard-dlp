var token;
$(document).ready(function() {
    token = localStorage.getItem('token');
    var adminFirstName = localStorage.getItem('first_name');
    $('#adminFirstName').prepend(adminFirstName);
    $.ajax({
        url: apiUrls.admindealerlist,
        type: 'GET',
        headers: {
            'Authorization': 'Token ' + token,
        },
        success: function(json) {
            for (var i = 0; i < json.length; i++) {
                var tr = '<tr><td>' + (i + 1) + '</td>' +
                    '<td>' + json[i].username + '</td>' +
                    '<td>' + json[i].dealership_name + '</td>' +
                    '<td>' + json[i].first_name + '</td>' +
                    '<td>' + json[i].phone + '</td>' +
                    '<td>' + json[i].total_loyalty + ' points</td>' +
                    '<td><a type="button" class="btn btn-link" href="particular-dealer-purchase-record.html?id=' + json[i].id + '" style="color: #ffffff ; background-color: #EB5757 ;border-color: #EB5757 ;text-decoration:none;"><img src="assets/images/viewRecord.png"> View Record</a></td></tr>';
                var key, val;
                key = 'name' + json[i].id;
                val = json[i].first_name;
                localStorage.setItem(key, val);
                $('#dealersListData').append(tr);
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr + status + error);
        }
    });


});