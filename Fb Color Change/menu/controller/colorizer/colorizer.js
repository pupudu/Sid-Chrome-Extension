app.controller.colorizer = new (function()
{
	
	var _MAX_PICTURE_WIDTH 			= 1500
	var _MAX_PICTURE_HEIGHT 		= 800
	var _PICTURE_QUALITY 			= 0.65
	var _MAX_PICTURE_INPUT_BYTES	= 5000000
	var _MAX_PICTURE_OUTPUT_BYTES	= 250000
	
	var _self						= this
	var _isDown 					= false
	var _curColorProperty 			= ''
	var _spectrumElement			= null
	var _saturationElement			= null
	var _emptyElement				= null
	var _curSpectrumColor			= ''
	var _uploadElement				= null
	var _previewElement				= null
	var _tabElements				= {}
	var _colorGrid					= []
	
	this.run = function()
	{

		_saturationElement 	= f( '#colorizer_controller_picker > *:first-child' )
		_emptyElement		= f( '#colorizer_controller_picker > *:last-child > *:first-child' )
		_spectrumElement	= f( '#colorizer_controller_picker > *:last-child > *:last-child' )
		
		// set the grid colors
		_makeColorGrid()
		
		// listen for events on the color picker elements
		_saturationElement.listen( 'mousedown', _onPickDown )
		_spectrumElement.listen( 'mousedown', _onPickDown )
		
		_emptyElement.listen( 'click', _setEmpty )
		
		// enable the color tabs
		var tabs = this.element.select( '#colorizer_controller_tabs > *' )
		
		for( var i = 0; i < tabs.length; ++i ) 
		{
			
			var tab 	= tabs[ i ]
			var name 	= tab.get( 'name' )
			
			_tabElements[ name ] = tab
			
			tab.listen( 'click', f.bind( _onColorTabClick, [ name ] ) )
			
			_setColorTabPreviewColor( name, this.get( name ) )
				
		}
		
		// set the initial state
		_onColorTabClick( 'color_a' )
		
		_uploadElement	= f( '#colorizer_controller_picture_upload' )
		_previewElement	= f( '#colorizer_controller_picture_preview' )
		
		// listen for upload
		_uploadElement.listen( 'change', _onUploadChange )
		_uploadElement.listen( 'click', _onUploadClick )
		
		//listen for preview elements stuff
		_previewElement.listen( 'click', _onPreviewClick )
		
		// update picture saved state
		_setPicture( this.get( 'picture' ) )
		
		// enable the boxes
		f( '#colorizer_controller_picture_size_fill' ).listen( 'click', f.bind( _setPictureSize, [ 'fill' ] ) )
		f( '#colorizer_controller_picture_size_fit' ).listen( 'click', f.bind( _setPictureSize, [ 'fit' ] ) )
		f( '#colorizer_controller_picture_size_repeat' ).listen( 'click', f.bind( _setPictureSize, [ 'repeat' ] ) )
		f( '#colorizer_controller_picture_size_center' ).listen( 'click', f.bind( _setPictureSize, [ 'center' ] ) )
		
		// set the saved state or default
		_setPictureSize( this.get( 'size' ) || 'fill' )
		
	}
	
	function _setPictureSize( type )
	{
		
		var children = f( '#colorizer_controller_picture_size' ).children()
		
		for( var i in children )
		{
			
			children[ i ].class[ children[ i ].get( 'id' ).indexOf( 'size_' + type ) == -1 ? 'remove' : 'add' ]( 'on' )
			
		}
		
		_self.set( 'size', type )
			
	}
	
	function _onColorTabClick( colorProperty )
	{
	
		_curColorProperty = colorProperty
		
		var target = _tabElements[ colorProperty ]
		
		target.class.add( 'on' )
		
		for( var i in _tabElements )
		{
			
			if( _tabElements[ i ] != target ) _tabElements[ i ].class.remove( 'on' )
			
		}
		
		_setColorSaturation( _self.get( colorProperty ) )
		
	}
	
	function _onPickDown( e )
	{
		
		_isDown = true
		
		_pickColor( e )
		
		_spectrumElement.listen( 'mousemove', _onPickMove )
		_saturationElement.listen( 'mousemove', _onPickMove )
		
		f( window ).listen( 'mouseup', _onPickUp )
		
	}
	
	function _onPickMove( e )
	{
		
		if( _isDown ) _pickColor( e )
		
	}
	
	function _onPickUp( e )
	{
		
		_isDown = false
		
		_spectrumElement.deafen( 'mousemove', _onPickMove )
		_saturationElement.deafen( 'mousemove', _onPickMove )

		f( window ).deafen( 'mouseup', _onPickUp )
		
	}
	
	function _setEmpty()
	{
		
		_setTheColor()
		
	}
	
	function _pickColor( e )
	{
		
		var percentX 	= e.x / e.target.width()
		var percentY 	= e.y / e.target.height()
		var curColor	= _curSpectrumColor || 'rgb(0,0,0)'
		var r			= 0
		var g 			= 0
		var b 			= 0		
		
		// fix percents
		if( percentX < 0 ) percentX = 0
		if( percentX > 1 ) percentX = 1
		if( percentY < 0 ) percentY = 0
		if( percentY > 1 ) percentY = 1
		
		if( e.target.element == _spectrumElement.element )
		{
			
			var rgb = _getColorAt( percentX )
			
			r = rgb[ 0 ]
			g = rgb[ 1 ]
			b = rgb[ 2 ]
			
			_setColorSaturation( _createRgb( r, g, b ) )
			
		}
		else
		{
		
			var parts = curColor.split( /[\(,\)]/ )
			
			r = parts[ 1 ] * 1
			g = parts[ 2 ] * 1
			b = parts[ 3 ] * 1
			
			var saturationDown 	= 256 * percentY
			var saturationUp	= 256 - ( 256 * percentX )
			
			r += saturationUp
			g += saturationUp
			b += saturationUp
			
			if( r > 256 ) r = 256
			if( g > 256 ) g = 256
			if( b > 256 ) b = 256

			r -= saturationDown
			g -= saturationDown
			b -= saturationDown
			
			if( r < 0 ) r = 0
			if( g < 0 ) g = 0
			if( b < 0 ) b = 0
			
			r = Math.round( r ) 
			g = Math.round( g ) 
			b = Math.round( b ) 
			
		}
		
		if( r > 256 ) r = 256
		if( g > 256 ) g = 256
		if( b > 256 ) b = 256
		
		if( r < 0 ) r = 0
		if( g < 0 ) g = 0
		if( b < 0 ) b = 0

		var color = _createRgb( r, g, b )
		
		_setTheColor( color )
		
	}
	
	function _setTheColor( color )
	{
		
		_setColorTabPreviewColor( _curColorProperty, color )
		
		_self.set( _curColorProperty, color )
	
	}
	
	function _createRgb( r, g, b )
	{
		
		if( !r ) r = 0
		if( !g ) g = 0
		if( !b ) b = 0
		
		return 'rgb(' + r + ',' + g + ',' + b + ')'
		
	}
	
	function _setColorTabPreviewColor( key, color )
	{
		
		color = color || ''
		
		_tabElements[ key ].style.set( 'background-color', color )
		_tabElements[ key ].style.set( 'background-image', color ? 'url()' : '' )
		
	}
	
	function _setColorSaturation( color )
	{
		
		_saturationElement.style.set( 'background-color', color )
		
		_curSpectrumColor = color
		
	}
	
	function _getColorAt( percent )
	{
	
		return _colorGrid[ Math.round( ( _colorGrid.length - 1 ) * percent ) ]
		
	}
	
	function _makeColorGrid()
	{
		
		for( var a = 0; a < 6; ++a )
		{
			
			for( var i = 0; i <= 255; i+=1 )
			{
			
				var r = 0
				var g = 0
				var b = 0
			
				if( a == 0 )
				{
					r = 255
					g = i
					b = 0
			
				}
				else if( a == 1 )
				{
					
					r = 255 - i
					g = 255
					b = 0
				
				}
				else if( a == 2 )
				{
					r = 0
					g = 255
					b = i
						
				}
				else if( a == 3 )
				{
					
					r = 0
					g = 255 - i
					b = 255
					
				}
				else if( a == 4 )
				{
					
					r = i
					g = 0
					b = 255
						
				}
				else if( a == 5 )
				{
					
					r = 255
					g = 0
					b = 255 - i
					
				}
				
				_colorGrid.push( [ r, g, b ] )
				
			}
			
		}
		
	}
	
	function _setPicture( value )
	{
		value = value || ''
		
		_self.set( 'picture', value )
		
		_previewElement.style( 'background-image', value ? 'url("' + value + '")' : '' ) 
		_previewElement.class[ value ? 'add' : 'remove' ]( 'filled' )
		
	}
	
	function _onPreviewClick( e )
	{
		
		if( e.target.element != _previewElement.element )
		{
			
			_setPicture( '' )
			
		}
		else
		{
			
			_uploadElement.click()
			
		}
		
	}
	
	function _getImageFromFile( file, callback )
	{
		
		var whenDone = function( url, error )
		{
			
			if( error ) f.log( 'error:' + error )
			
			url = url || ''
			
			callback( url )
			
		}
		
		if( file.size > _MAX_PICTURE_INPUT_BYTES ) 
		{
			
			whenDone( '', 'select a picture less than ' + ( _MAX_PICTURE_INPUT_BYTES / 1000000 ) + 'mb' )
		
		}
		else
		{
			
			try
			{
				
				var image 	= document.createElement( 'img' );
				var reader 	= new window.FileReader()
				
				image.onload = function( )
				{
					
					var canvas 	= document.createElement( 'canvas' )
					var drawing = canvas.getContext( '2d' )
					var width 	= image.width
					var height 	= image.height
					var maxW	= _MAX_PICTURE_WIDTH
					var maxH	= _MAX_PICTURE_HEIGHT
					var quality = _PICTURE_QUALITY
					
					// reduce the width
					if( width > maxW )
					{
						
						width = maxW
						
						height *= ( maxW / image.width )
						
					}
					
					if( height > maxH )
					{
						
						height = maxH
						
						width *= ( maxH / width )
						
					}
					
					canvas.width	= width
					canvas.height 	= height
					
					drawing.drawImage( image, 0, 0, image.width, image.height, 0, 0, width, height )
					
					var result 	= canvas.toDataURL( 'image/jpeg', quality )
					var size 	= result.length
					
					if( size > _MAX_PICTURE_OUTPUT_BYTES )
					{
						
						whenDone( '', 'picture could not be formatted: ' + size )
						
					}
					else
					{
						
						f.log( 'picture resized to ' + size )
						
						whenDone( result )
						
					}
					
				}
				
				reader.onload = function( e )
				{
					
					 image.src = e.target.result
					 
				}
				
				reader.readAsDataURL( file )
				
			}
			catch( e )
			{
				
				whenDone()
				
			}
			
		}
		
	}
	
	function _onUploadChange()
	{
		
		app.toggleAutoClose( true )
		
		var file = _uploadElement.element.files[ 0 ]
		
		if( file ) _getImageFromFile( file, _onUploadFileComplete )
		
	}
	
	function _onUploadFileComplete( url )
	{
		
		if( !url ) return
		
		_uploadElement.clear()
			
		_setPicture( url )
		
	}
	
	function _onUploadClick()
	{
		
		app.toggleAutoClose( false )

	}
	
})()