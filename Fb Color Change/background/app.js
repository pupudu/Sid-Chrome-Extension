chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        var headers = info.responseHeaders;
        for (var i=headers.length-1; i>=0; --i) {
            var header = headers[i].name.toLowerCase();
            if (header == 'x-frame-options' || header == 'frame-options') {
                headers.splice(i, 1); // Remove header
            }
        }
        return {responseHeaders: headers};
    },
    {
        urls: [ '*://*/*' ], // Pattern to match all http(s) pages
        types: [ 'sub_frame' ]
    },
    ['blocking', 'responseHeaders']
);




var app = new (function()
{

	var _MENU_WIDTH_PIXELS						= 350
	var _MENU_HEIGHT_PIXELS						= 320
	var _MENU_LEFT_ADJUSTMENT					= -100
	var _MENU_SQUISH_RELIEF						= 25
	var _SYNC_DELAY								= 2000
	
	var _contentUpdateTime						= 0
	var _syncKeys								= {}
	var _memory									= {}
	var _activeTabs								= {}
	var _actionIconTimer						= new f.timer( 1000, _onActionIconTimer, true )
	var _actionIconState						= false
	var _usePeriod								= 86400000*3
	
	this.version 								= ''
	this.base									= chrome.extension.getURL( '/' )
	this.notifications							= {}
	this.options 								= {}
	this.session								= ''
	this.facebook								= {}
	this.installed								= 0
	this.period									= 0
	this.source									= ''
	
	this.run = function( savedMemory )
	{

		_initGA()

		// set the saved memory
		_memory = savedMemory || {}
		
		// set browser action click
		chrome.pageAction.onClicked.addListener( _onActionIconClick )
		
		// listen for content script messages
		chrome.extension.onMessage.addListener( _onIncomingMessage )
		
		// set the saved info
		app.version			= _get( app.library.key.VERSION ) || ''
		app.session 		= _get( app.library.key.SESSION ) || ''
		app.facebook 		= _get( app.library.key.FACEBOOK ) || {}
		app.notifications 	= _get( app.library.key.NOTIFICATIONS ) || {}
		app.installed		= ( _get( app.library.key.INSTALLED ) * 1 ) || 0
		app.popup			= ( _get( app.library.key.POPUP ) * 1 ) || 0
		app.period			= ( _get( app.library.key.PERIOD ) * 1 ) || 0
		app.source			= _get( app.library.key.SOURCE ) || ''
		app.options 		= _getOptionsFromMemory()
		
		_updateAlertIcon()
		
		if( !app.installed )
		{
		
			chrome.tabs.create( { 'url': '/welcome/index.html' } ) 

			_set( app.library.key.INSTALLED, f.now() )
			app.installed = ( _get( app.library.key.INSTALLED ) * 1 ) || 0

			_set( app.library.key.POPUP, -1 )
			app.popup = ( _get( app.library.key.POPUP ) * 1 ) || 0

			_set( app.library.key.PERIOD, Math.floor(app.installed/_usePeriod) )
			app.period = ( _get( app.library.key.PERIOD ) * 1 ) || 0

			_set( app.library.key.VERSION, chrome.app.getDetails().version )
			app.version = _get( app.library.key.VERSION ) || ''

			//_gaq.push(['_trackEvent', chrome.app.getDetails().version, 'Install']);
			
		}

		if( app.version != chrome.app.getDetails().version )
		{

			_set( app.library.key.VERSION, chrome.app.getDetails().version )
			//_gaq.push(['_trackEvent', chrome.app.getDetails().version, 'Update']);

		}

		var actPeriod = Math.floor((f.now() * 1)/_usePeriod)

		if( app.period != actPeriod )
		{
			_set( app.library.key.PERIOD, actPeriod )
			app.period = ( _get( app.library.key.PERIOD ) * 1 ) || 0

			//_gaq.push(['_trackEvent', chrome.app.getDetails().version, 'Use']);
		}

		f.log( 'app has started:', app )
		
	}
	
	// executes a function without colliding, used for content scripts
	this.syncFunction = function( key )
	{
		//alert("SYNC");
		
		if( _syncKeys[ key ] )
		{
			
			return true
			
		}
		
		_syncKeys[ key ] = true
			
		f.delay( function()
		{
			
			delete _syncKeys[ key ]
			
		}, _SYNC_DELAY )
			
		return false
	
	}
		
	this.setOption = function( name, property, value )
	{
		
		if( value === true )
		{
			
			value = '1'
			
		}
		else if( value === undefined || value === null || value === false || value.length === 0 )
		{
			
			value = ''
			
		}
		else if( typeof( value ) == 'object' )
		{
			
			var c = false
			
			for( var i in value )
			{
				
				c = true
				
				break
				
			}
			
			if( !c )
			{
				
				value = ''
				
			}
			
		}
		
		f.log( 'setting option ' + name + '.' + property + ' to (' + value + ')' )
		
		if( value )
		{
			
			app.options[ name ][ property ] = value
		
		}
		else
		{
			
			delete app.options[ name ][ property ]
			
		}
		
		_set( app.library.key.OPTIONS, app.options )
		
		// set the flag to indicate the content script must update
		_contentUpdateTime = f.now()
		
	}
	
	this.setFacebook = function( obj )
	{
		
		for( var i in obj )
		{
			
			if( obj[ i ] )
			{
				
				this.facebook[ i ] = obj[ i ]
				
			}
			
		}
		
		_set( this.library.key.FACEBOOK, this.facebook )
		
		f.log( 'app.facebook is now:', this.facebook )
		
	}

	this.onSiteLinkClicked = function( )
	{
		_onActionIconClick()
	}

	function _initGA( )
	{
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = 'https://ssl.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	}
	
	function _set( name, value )
	{
		
		// clean objects and arrays to null
		if( typeof( value ) == 'object' )
		{
			
			var found = false
			
			for( var i in value )
			{
				
				found = true
				
				break
				
			}
			
			if( !found ) value = null
			
		}
		
		_memory[ name ] = value
		
		// set the memory how chrome likes it, object format
		var obj = {}
		
		obj[ name ] = value
		
		chrome.storage.local.set( obj )	
		
	}
	
	function _get( name )
	{
		
		if( !name ) throw 'missing name of memory key to get'
		
		return _memory[ name ]
		
	}
	
	// act on any "sendMessage" calls from scripts
	function _onIncomingMessage( data, sender, callback )
	{
		
		if( !data ) throw new Error( 'no data received for content message' )
		
		var name = data.a
		
		/*
		if( !name )
		{
			
			throw new Error( 'no name received for content message' )
			
		}
		*/
		
		var args	= data.b || null
		var value 	= null
		var method 	= null
		
		//f.log( 'received message "' + name + '"', args )
		
		if( name == 'app' ) 
		{
			
			var list 	= {}
			var obj 	= {}
			
			for( var i in app )
			{
				
				if( !/^_/.test( i ) )
				{
					
					if( typeof( app[ i ] ) == 'function' )
					{
						
						
						list[ i ] = i
						
					}
					else
					{
						
						obj[ i ] = f.copy( app[ i ] )
						
					}
					
				}
				
			}
			
			obj._ = list
	
			method = function()
			{ 
			
				return obj
				
			}
		
		}
		else if( name == 'option_check' )
		{
			
			method = function()
			{
								
				return _contentUpdateTime
				
			}
			
		}
		else if( name == 'show_icon' )
		{
			
			// save this for later
			_activeTabs[ sender.tab.id ] = true
			
			method = function()
			{
				
				chrome.pageAction.show( sender.tab.id )
		
			}
			
		}
		else if( name == 'check_popup' )
		{
			method = function()
			{ 
			
				return app.popup
				
			}
		}
		else if( name == 'set_popup' )
		{
			_set( app.library.key.POPUP, f.now() )
			app.popup = ( _get( app.library.key.POPUP ) * 1 ) || 0

			f.log("POPPI POPUP")

			method = function()
			{ 
			
				return null
				
			}
		}
		else
		{
			
			method = app[ name ]
			
		}
		
		/*
		if( method == undefined ) 
		{
			
			throw new Error( 'method "' + name + '" not found' )
		
		}
		*/
		
		if( name && method != undefined)
		{
			value = method.apply( app, args )
		}
		
		//f.log( 'content script sent message "' + name + '"', args, value )
	
		// execute a callback with the value if needed
		if( callback )
		{
		
			callback( value )
			
		}
		
		return false
		
	}
		
	function _updateAlertIcon()
	{
		
		var has = false
		
		// force to true if notifications exist
		for( var i in app.notifications )
		{
				
			has = true
			
			break
			
		}
		
		if( has )
		{
		
			_actionIconTimer.restart()
			
		}
		else
		{
			
			_actionIconTimer.stop()
			
			_setActionIconState( false )
			
		}
		
	}
	
	function _onActionIconTimer()
	{
		
		_setActionIconState( !_actionIconState )
		
	}
	
	function _setActionIconState( state )
	{
		
		_actionIconState = state
		
		var path = '/icons/' + ( state ? 'alert' : 'default' ) + '.png'
		
		for( var i in _activeTabs )
		{
			
			try
			{
				chrome.pageAction.setIcon( { 'path':path, 'tabId':( i * 1 ) } )
			}
			catch(e)
			{
				delete _activeTabs[ i ]
			}
			
		}
		
	}
		
	function _onActionIconClick( tab )
	{
		
		// reset the icon for now
		_setActionIconState( false )
		_actionIconTimer.stop()
		
		var url 		= tab ? tab.url : ''
		
		_openMenu()
		
	}
		
	function _openMenu()
	{
				
		chrome.windows.getCurrent( function( props )
		{
			
			var top 	= props.top
			var left 	= props.left + props.width + _MENU_LEFT_ADJUSTMENT
			
			// dont let the menu squish against the absolute screen
			if( left + _MENU_WIDTH_PIXELS >= window.screen.availWidth )
			{
				
				left = window.screen.availWidth - _MENU_WIDTH_PIXELS - _MENU_SQUISH_RELIEF
				
			}
			
			window.open( 'menu/index.html', '__ffMenu', 'height=' + _MENU_HEIGHT_PIXELS + ',width=' + _MENU_WIDTH_PIXELS + ',top=' + top + ',left=' + left )
			// using window.open because we can target the same window
			//chrome.windows.create( { 'url':'menu/index.html', 'height':height, 'width':_MENU_WIDTH_PIXELS, 'top':top, 'left':left, 'type':'normal', 'focused':true } )
			
		} )
			
	}
		
	function _getOptionsFromMemory()
	{
		
		var options 		= {}
		var optionsNode 	= _get( app.library.key.OPTIONS ) || {}
		
		for( var i in app.library.option )
		{
			
			var key		= app.library.option[ i ]
			var value 	= optionsNode[ key ]
			
			options[ key ] = {}
			
			for( var j in value )
			{
			
				options[ key ][ j ] = value[ j ]
				
			}
			
		}
		
		return options
		
	}

})()