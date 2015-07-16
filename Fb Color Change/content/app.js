var app = new (function()
{
	
	var _KILL_TEST 					= /\?_/
	var _MODIFY_PAGE_INTERVAL		= 250
	var _DOCUMENT_CHECK_INTERVAL 	= 50
	var _CHECK_UPDATES_INTERVAL		= 200
	
	var _lastUpdateTime				= 0
	var _lastOptions				= null
	var _lastUrl					= ''
	
	this.worker = {}
	
	this.run = function()
	{
		
		// stop if kill test, or not on facebook
		if( _KILL_TEST.test( window.location.href ) || !/^https?:\/\/www.facebook\./.test( window.location.href ) )
		{
			
			return
		
		}
		
		// need to keep telling the background to show the icon due to ajax page changes
		setInterval( _onIconTimer, 250 )
		_onIconTimer()
		
		_startDocumentBodyCheck()
		
	}
	
	this.sendRequest = function( url, callback )
	{
		
		var request = new window.XMLHttpRequest()
		
		request.open( 'get', url )
		
		if( callback )
		{
			
			request.onreadystatechange = function()
			{
				
				if( request.status == 200 && ( request.readyState == 4 || request.readyState == 0 ) )
				{
					
					callback( request.responseText )
					
				}
				
			}
			
		}
			
		request.send()
		
		return request
		
	}
	
	this.addStyle = function( styleObject )
	{
		
		var element = null
		
		if( typeof( styleObject ) == 'string' )
		{
			
			element = document.createElement( 'link' )
			
			element.rel 	= 'stylesheet'
			element.type 	= 'text/css'
			element.href 	= styleObject
			
		
		}
		else
		{
			
			var text = ''
			
			for( var i in styleObject )
			{
			
				text += i + '{'
				
				for( var j in styleObject[ i ] )
				{
					
					var rule = styleObject[ i ][ j ]
					
					if( /important/.test( rule ) )
					{
						
						throw Error( 'rules cannot have important in them' )
						
					}
					
					text += j + ':' + rule + ' !important;'
						
				}
				
				text += '}'
				
			}
		
			element = document.createElement( 'style' )
			
			element.innerHTML = text
			
		}
		
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( element )
			
		return element
	
	}
	
	this.removeStyle = function( styleElement )
	{
		
		try
		{
			
			styleElement.parentNode.removeChild( styleElement )
		
		}
		catch(e){}
		
	}
	
	function _onIconTimer()
	{
		
		var url = window.location.href
		
		if( _lastUrl != url )
		{
			
			// tell the app to show the icon
			_doFunction( 'show_icon', null )
			
			_lastUrl = url
			
		}
		
	}
	
	function _scrapeFacebookInfo()
	{
	
		var id = ''
		var methods = [
		
			function(){ return document.body.innerHTML.match(/profile_pic_header_([0-9]+)/)[1] },
			function(){ return document.body.innerHTML.match( /id="profile_pic_welcome_([0-9]+)/ )[ 1 ] },
			function(){ return document.getElementsByTagName("head")[ 0 ].innerHTML.match( /}envFlush\({"user":"([0-9]+)/ )[ 1 ] },
		
		]
		
		for( var i = 0; i < methods.length; ++i )
		{
			
			try
			{
				
				id = methods[ i ]()
			
			}
			catch(e){}
			
			if( id )
			{
				
				break
				
			}
			
		}
		
		return { 'id':id }
		
	}

	function _onModifyPageInterval()
	{
		
		// do the workers
		for( var i in app.worker )
		{
			
			try
			{
				
				app.worker[ i ].run()
			
			}
			catch( e )
			{
				
				/*
				setTimeout( function()
				{
					
					throw e 
					
				}, 10 )
				*/
				
			}
			
			// turn off the change flag until another update
			app.worker[ i ].changed = false
		
		}
		
	}
	
	function _doStart()
	{
		
		_setupWorkers()
		
		// run the function now
		_onModifyPageInterval()
		
		// run the function on the interval
		setInterval( _onModifyPageInterval, _MODIFY_PAGE_INTERVAL )
		
		// check for changes
		setInterval( _onCheckUpdatesInterval, _CHECK_UPDATES_INTERVAL )
		
	}
	
	function _onCheckUpdatesInterval()
	{
		
		_doFunction( 'option_check', null, function( updateTime )
		{

			if( updateTime <= _lastUpdateTime ) 
			{
				
				return
				
			}
			
			_lastUpdateTime = updateTime
			
			_doUpdate( function()
			{
				
				// set the new options
				_updateWorkerOptions()
					
				// immediately modify the page
				_onModifyPageInterval()
				
			} )
			
		} )
	
	}
	
	function _doUpdate( callback )
	{
	
		var makeFunction = function( name )
		{
		
			return function()
			{
				
				var args 		= []
				var callback 	= null
				
				for( var i = 0; i < arguments.length; ++i )
				{
					
					if( typeof( arguments[ i ] ) == 'function' )
					{
						
						callback = arguments[ i ]
						
					}
					else
					{
						
						args.push( arguments[ i ] )
					
					}
					
				}
				
				return _doFunction( name, args, callback )
			
			}
			
		}
		
		_doFunction( 'app', null, function( e )
		{
			
			for( var i in e )
			{
				
				if( i == '_' )
				{
					
					for( var j in e[ i ] )
					{
					
						app[ j ] = makeFunction( j )
	
						
					}
					
					continue
					
				}
				
				app[ i ] = e[ i ]
				
			}
			
			if( callback ) callback()
			
		} )
			
	}
	
	// execute a function on the main app and return the value
	function _doFunction( name, args, callback )
	{
	
		chrome.extension.sendMessage( { 'a':name, 'b':args }, callback || function(){} )
		
	}
	
	function _onDocReady()
	{
		
		// update the application, then start listening for the body
		_doUpdate( function()
		{
			
			app.setFacebook( _scrapeFacebookInfo() )
		
			_doStart()
			
		} )
				
	}
	
	function _startDocumentBodyCheck()
	{
		
		// check for new notifications
		var interval = null
		
		var clearIt = function()
		{
			
			if( interval ) clearInterval( interval )
			
		}
		
		interval = setInterval( function()
		{
			
			var ready = false
			
			try
			{
				
				ready = document.body && document.body.innerHTML.length > 1000
				
			}
			catch(e){}
			
			if( ready )
			{
				
				clearIt()
				
				_onDocReady()
							
			}
			
		}, _DOCUMENT_CHECK_INTERVAL )
		
		window.addEventListener( 'load', clearIt )
	
	}
	
	function _updateWorkerOptions()
	{
		
		for( var i in app.worker )
		{
			
			// no options for this worker
			if( !app.options[ i ] ) continue
			
			var changed = false
			
			// no prior state
			if( !_lastOptions || !_lastOptions[ i ] )
			{
				
				changed = true
				
			}
			// if we are now being turned on
			else if( app.options[ i ].on && !_lastOptions[ i ].on )
			{
				
				changed = true
				
			}
			else if( window.JSON.stringify( _lastOptions[ i ] ) != window.JSON.stringify( app.options[ i ] ) )
			{
					
				changed = true
					
			}
			
			// set on or off so it knows its status
			app.worker[ i ].on = app.options[ i ].on
			
			// tell it whether or not any options have changed
			app.worker[ i ].changed = changed
			
		}
		
		_lastOptions = app.options
		
	}
	
	function _getWorkerOption( workerName, key )
	{
		
		return app.options[ workerName ][ key ]
		
	}
	
	function _setWorkerOption( workerName, key, value )
	{
		
		app.options[ workerName ][ key ] = value
		
		app.setOption( workerName, key, value )

	}
	
	function _setupWorkers()
	{
		
		var makeSetFunc = function( name )
		{
		
			return function( a, b ){ _setWorkerOption( name, a, b ) }	
			
		}
		
		var makeGetFunc = function( name )
		{
		
			return function( a ){ return _getWorkerOption( name, a ) }	
			
		}
		
		// add some things to the workds
		for( var i in app.worker )
		{
		
			app.worker[ i ].set = makeSetFunc( i )
			app.worker[ i ].get = makeGetFunc( i )
			
		}
		
		_updateWorkerOptions()
		
	}
	
})()