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

var data = {};
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

	data[input_val[repeat]] = [];

	
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
            	data[$(this).html()].push(ui.draggable.attr('src'));
                ui.draggable.remove();
                if ($('#images > img').length == 0) {
                	$('#images').html("Done. Search new pics to sort");
                }
            }
            else{
                ui.draggable.draggable('option', 'revert', true);
            }
        },
    });
});

$('#div_but').on('click', '.droppable', function () {
	if (data[$(this).html()].length > 0) {
		$('#final_look').css('display', 'block');
		for (var i=0; i<data[$(this).html()].length; i++) {
			$('#final_look').append(
				'<img style="width: 150px; height: 85px; margin: 30px 10px 10px 10px;"' +
				'src="'+data[$(this).html()][i]+'">');
		}
	}
});

$('#close').click(function() {
	$('#final_look').css('display', 'none');
	$('#final_look :not(#close)').remove();
});
