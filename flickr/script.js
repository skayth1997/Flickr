$('#form').submit(function () {

    var data = $('#form').serialize();

    $.ajax({
        type: 'GET',
        url: 'flickr.php',
        dataType: 'json',
        data: data,
        success: function (data) {
            for (var i=0; i<data.length; i++){
                for (var j=1; j<data[i].length; j++){
                    var image_name = data[i][j].replace('background-image: url(','');
                    $('#images').append('<img src="https:'+ image_name +'" class="image s'+ data[i][0] +'" style="width: 50px; height: 50px;">');
                }
                $('#div_but').append('<button>'+ data[i][0] +'</button>');
            }
        }
    });
    return false;
});

$('#images').on('mouseover', '.image', function () {
    var img_class = $(this).attr('class').replace('image ', '');
    $( "." + img_class ).draggable();
    console.log(img_class);
});
