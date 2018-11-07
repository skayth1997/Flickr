$('#form').submit(function () {

    var data = $('#form').serialize();

    $.ajax({
        type: 'GET',
        url: 'flickr.php',
        dataType: 'json',
        data: data,
        success: function (data) {
            console.log(data);
            console.log(data[0][1]);
        }
    });
    return false;

});
