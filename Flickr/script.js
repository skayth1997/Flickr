var input_val;
var repeat = 0;
var url;

$('#submit').click(function () {
	$('#images').empty();
	$('#div_but').empty();
	repeat_func();
});

function repeat_func() {
	input_val = $('#search').val();
	input_val = $('#search').val().split(' ');
	input_val = input_val.filter(function(v){return v !== ''});
	url = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + input_val[repeat];

	$.ajax({
	url: url,
	dataType: "jsonp",
	jsonpCallback: 'jsonFlickrFeed',
	success: images,
	});
}

function images (result) {

	if (result.items.length > 4){
	
		for (var i=0; i<result.items.length; i++) {
			$('#images').append(
				'<img src="'+result.items[i].media.m+'" class="image '+ input_val[repeat] +'"' +
				'style="width: 100px; height: 100px; padding: 10px; z-index: 1;">');
			if (i == 4) {
				break;
			}
		}
	
	    $('#div_but').append(
		'<div class="droppable text-center border col-3 pt-3 pb-3 mt-3 ml-5 mr-5"'+
		'style="display: inline-block;">'+ input_val[repeat] +'</div>');

	}

	repeat++;
	if (repeat != input_val.length) {
		repeat_func();
	}
	else if (repeat == input_val.length){
		repeat = 0;
	}

}

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
