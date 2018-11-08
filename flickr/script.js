$('#form').submit(function () {

    $('#images').empty();
    $('#div_but').empty();
    var input = $('#search').val();
    input = input.split(' ');
    input = input.filter(function(v){return v !== ''});

    $.ajax({
        type: 'GET',
        url: 'flickr.php',
        dataType: 'json',
        data: { search: input },
        beforeSend: function (){
            $('#images').html('Pleace Wait');
        },
        success: function (data) {
            if (typeof data != 'string') {

                $('#images').empty();

                var p = 0;

                for (var i=0; i<data.length; i++){
                    for (var j=1; j<data[i].length; j++) {
                        var image_name = data[p][j].replace('background-image: url(', '');
                        $('#images').append(
                            '<img src="https:'+ image_name +'" class="image '+ data[p][0] +'" style="width: 100px; height: 100px; padding: 10px; z-index: 1;">'
                        );
                        p++;
                        if (p == data.length){
                            p = 0;
                        }
                    }
                    $('#div_but').append('<div class="droppable text-center border pt-3 pb-3 pl-5 pr-5 ml-5 mr-5" style="display: inline-block;">'+ data[i][0] +'</div>');
                }
            }else{
                $('#images').html(data);
            }
        }
    });
    return false;
});

$('#images').on('mouseover', '.image', function () {
    var img_class = $(this).attr('class').replace('image ', '');
    $( "." + img_class ).draggable({ revert: 'invalid' });
    $( ".droppable" ).droppable({
        drop: function(event, ui) {
            if (ui.draggable.hasClass($(this).html())){
                ui.draggable.remove();
            }
            else{
                ui.draggable.draggable('option', 'revert', true);
            }
        },
    });
    $("#images").on('mouseup', function() {
        if ($('#images > img').length == 1){
            $('#images').html("Done. Search new pics to sort");
        }
    });
});


