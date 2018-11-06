$('#form').submit(function () {

    var data = $('#form').serialize();

    $.ajax({
        type: 'GET',
        url: 'flickr.php',
        dataType: 'html',
        data: data,
        success: function (data) {
            console.log(data);
        }
    });
    return false;

});
