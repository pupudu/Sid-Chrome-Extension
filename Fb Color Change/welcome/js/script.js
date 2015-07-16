$(function() {

	$('#fb_share > a').click(function(e) {
		e.preventDefault();

		var w = 400
		var h = 340
		var l = ( screen.availWidth - w ) / 2
		var t = ( screen.availHeight - h ) / 3
		
		window.open( 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Ffb-color-changer%2Fkfmpgofbpmkihnamkhcoohnmipjkfjph', '', 'width=' + w + ',height=' + h + ',left=' + l + ',top=' + t )
	});

 });