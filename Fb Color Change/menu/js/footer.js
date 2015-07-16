app.component.footer = new (function()
{
	
	this.run = function()
	{
	
		f( '#footer_component_rate' ).listen( 'click', _onRateLinkClick )
		//f( '#footer_component_like' ).listen( 'click', _onLikeButtonClick )
		f( '#footer_component_share' ).listen( 'click', _onShareButtonClick )
		f( '#footer_component_problems' ).listen( 'click', _onProblemsLinkClick )
		f( '#footer_component_improvements' ).listen( 'click', _onProblemsLinkClick )

	}
	
	function _onRateLinkClick()
	{
	
		window.open( 'https://chrome.google.com/webstore/detail/fb-color-changer/kfmpgofbpmkihnamkhcoohnmipjkfjph/reviews' )
	
	}
	
	function _onLikeButtonClick()
	{

		var w = 400
		var h = 340
		var l = ( screen.availWidth - w ) / 2
		var t = ( screen.availHeight - h ) / 3
		
		window.open( chrome.extension.getURL( '/like/index.html' ), '', 'width=' + w + ',height=' + h + ',left=' + l + ',top=' + t )
		
	}
	
	function _onShareButtonClick()
	{
	
		var w = 400
		var h = 340
		var l = ( screen.availWidth - w ) / 2
		var t = ( screen.availHeight - h ) / 3
		
		window.open( 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Ffb-color-changer%2Fkfmpgofbpmkihnamkhcoohnmipjkfjph', '', 'width=' + w + ',height=' + h + ',left=' + l + ',top=' + t )
	
	}
	
	function _onProblemsLinkClick()
	{

		window.open( 'http://addonstore.org/fbcolorchanger/problems/' )

	}

})()