app.worker.colorizer = new (function()
{

	var _style 		= null
	var _picture	= ''
	var _cover 		= null
	var _size		= ''
	var _colors		= {}
	
	this.run = function()
	{
		
		if( !this.on )
		{
			
			if( _style )
			{
				
				app.removeStyle( _style )
				
				_style = null
				
				_colors = {}
				
			}
			
			if( _cover )
			{
				
				_cover.parentNode.removeChild( _cover )
				
				_cover = null
				
			}
			
		}
		else if( this.changed )
		{
			
			_picture = this.get( 'picture' ) || ''
			_size 	 = this.get( 'size' ) || ''
			
			_colors = {
				
				'a':this.get( 'color_a' ),
				'b':this.get( 'color_b' ),
				'c':this.get( 'color_c' ),
				'd':this.get( 'color_d' ),
				
			}
			
			if( _style )
			{
				
				app.removeStyle( _style )
				
				_style = null
				
			}
			
			_style = app.addStyle( _makeStyle() )
			
			if( !_cover )
			{
				
				var div = document.createElement( 'div' )
			
				div.id = 'ff_coverer'
			
				document.body.appendChild( div )
			
				_cover = div
			
			}
			
		}
		
	}
	
	function _makeStyle()
	{
		
		var backgroundSize 		= 'cover'
		var backgroundRepeat 	= 'no-repeat'
		var backgroundPosition 	= 'center center'
		
		if( _size == 'fit' )
		{
			
			backgroundSize = 'contain'
			
		}
		else if( _size == 'center' )
		{
			
			backgroundSize = 'auto';
			
		}
		else if( _size == 'repeat' )
		{
			
			backgroundRepeat = 'repeat'
			backgroundSize = 'auto'
			
		}
		
		var obj = {
			
			'#navFacebar > *:first-child':
			{
				'border':'none',
				'background':'none',
			},
			
			'#blueBar, .fbNubFlyoutTitlebar, #pagelet_bluebar, #blueBarDOMInspector, #blueBarNAXAnchor':
			{
				'background':_makeColor( _colors.a, 1 ),
				'border-bottom':'none'
				
			},
			
			'#blueBar:after':
			{
				'background-image':'none',
			},
			
			/*
			'.fbPhotoContributorName a, .UIActionLinks a, .UFIContainer a, .uiAttachmentTitle > *, .uiStreamMessage a, .passiveName, .actorName > a, .ogContentTitle > *, .comment_link > *, .UFILikeLink > *, .share_action_link, .pronoun-link':
			{
				'color':_makeColor( _cs )
			},
			*/
			
			/*'.UFIRow':
			{
				'opacity':'0.7',
				//'background-color':'rgba(0,0,0,0.1)',
				//'background-color':_makeColor( _cs )//, 0.7),
			},
			*/
			'#ff_coverer':
			{
				'background':( _picture ? 'url(\'' + _picture.replace( /'/g, "\'" ) + '\') ' : '' ) + _makeColor( _colors.b ),
				'background-size':backgroundSize,
				'background-repeat':backgroundRepeat,
				'background-position':backgroundPosition,
				'height':'100%',
				'width':'100%',
				'position':'fixed',
				'z-index':'-9999',
				'top':'0px',
				'left':'0px',
			},
			
			'#contentCol':
			{
				'background-color':'transparent',	
			},
			
			'#mainContainer':
			{
				'background':'none',
				//'box-shadow':_picture ? '0px 0px 15px 10px ' + _makeColor( _colors.b, 0.77 ) : '',
				'border':'none',
				'margin-top':'-1px',
				
			},
			
			'#content':
			{
				'background-color':_picture ?  _makeColor( _colors.b, 0.77 ): _makeColor( 'rgb(255,255,255)', 0.5 ),
				'padding-left':'8px',
				'padding-right':'8px',
				'margin-left':'-8px',
				'margin-right':'-8px',
				//'margin-top':'-1px',
				//'padding-left':'10px',
				//'padding-right':'10px',
				//'margin-left':'-15px',
				//'border-right':_picture ? '2px solid #ccc': 'none',
				//'border-left':_picture ? '2px solid #ccc': 'none',
			},
			
			/*
			'.fbNubFlyoutBody, .photoUfiContainer':
			{
				'background-color':_makeColor( _colors.b ),
			},
			*/
			
			'#pageFooter':
			{
				'display':'none',
			},
			
			'.genericStreamStory, .uiStreamHeader, #contentCol, #leftCol .item':
			{
				'border':'none'
			},
			
			/*'#boulder_fixed_header > *, .UFIRow':
			{
				'background-color':'transparent'
			},*/
			'#boulder_fixed_header > *, .UFIRow':
			{
				'background-color':'rgba(217, 221, 230, 0.5)'
			},
			
			'.uiStreamEdgeStoryLine > hr':
			{
				'visibility':'hidden'
			},
			
			'#pageLogo > a:hover, .jewelButton:hover, .navItem > * > a:hover, .navItem > a:hover':
			{
				'background-color':'transparent',
				'opacity':'0.66',
			}
			
		}
		
		if( _colors.c )
		{
			
			obj[ '*' ] = { 'color':_makeColor( _colors.c, 1 ) }
			
		}
		
		if( _colors.d )
		{
			
			obj[ 'a' ] = { 'color':_makeColor( _colors.d, 1 ) }
			
		}
			
		return obj
			
	}
	
	function _makeColor( color, opacity )
	{
		
		if( !color )
		{
			
			return ''
			
		}
		
		if( !opacity )
		{
			
			opacity = 1
			
		}
		
		var p 		= color.split( /[\(\),]/ )
		var r 		= p[ 1 ] * 1
		var g 		= p[ 2 ] * 1
		var b 		= p[ 3 ] * 1
		
		/*
		r += ( saturation * 255 )
		g += ( saturation * 255 )
		b += ( saturation * 255 )
		
		if( r > 255 ) 
		{
			
			r = 255
			
		}
		
		if( g > 255 ) 
		{
			
			g = 255
			
		}
		
		if( b > 255 ) 
		{
			
			b = 255
			
		}
		
		r = Math.round( r )
		g = Math.round( g )
		b = Math.round( b )
		*/
	
		return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')'
		
	}
	
	/*
	
	function _makeColorFade( color, fadeA, fadeB, useTransparency )
	{
		return _makeColor( color, fadeA, fadeB )
		return '-webkit-gradient(linear, left top, left bottom, color-stop(0%,' + _makeColor( color, fadeA, useTransparency ) + '), color-stop(100%,' + _makeColor( color, fadeB, useTransparency ) + '))'
		
	}
	*/
	
})()