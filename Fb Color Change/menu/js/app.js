var app = new (function()
{
	
	var _autoClose	 		= false
	
	this.page				= {}
	this.component			= {}
	this.controller			= {}
	this.translation		= {}
	
	var _translationStrings = {}
	
	this.run = function()
	{
		
		this.toggleAutoClose( true )
		
		_doUpdate( function()
		{
			
			console.log( 'app is now:', app )
		
			// run the components
			for( var i in app.component ) 
			{
				
				app.component[ i ].element = f( '#' + i + '_component' )
				
				if( app.component[ i ].run ) 
				{
					
					app.component[ i ].run()
				
				}
				
			}
			
			// show the app
			f( document.body ).class.add( 'showing' )
						
		} )
		
		// translate the elements
		var translatedElements = f.select( '[translate]' )
		
		for( var i in translatedElements )
		{
			
			var trans = app.translate( translatedElements[ i ].read() )
			
			translatedElements[ i ].clear()
			translatedElements[ i ].write( trans )
			
		}
		
		delete this.run
	
	}
	
	this.translate = function( text, dictionary )
	{
		
		var lang = ( window.navigator.language || '' ).substring( 0, 2 )
		
		// for debugging
		_translationStrings[ text ] = true

		if( lang == 'en' ) 
		{
			
			return text
		
		}
		
		dictionary = dictionary || app.translation[ text ]
		
		var stored = dictionary ? dictionary[ lang ] : ''
		
		return  stored || text
		
	}
	
	this.getTranslationObject = function()
	{
		
		var nodes = f.select( '[translate], [tip]' )
		
		for( var i in nodes ) _translationStrings[ nodes[ i ].get( 'tip' ) || nodes[ i ].read() ] = true
		
		var list = []
		
		for( var i in _translationStrings ) list.push( i )
		
		console.log( JSON.stringify( list ) )
		
	}
	
	this.toggleAutoClose = function( on )
	{
		
		if( _autoClose == on ) return

		_autoClose = on
		
		window.onblur = on ? function(){ window.close() } : function(){}
		
		window.onfocus = on ? null : function(){ app.toggleAutoClose( true ) }
		
	}
	
	function _doUpdate( callback )
	{
		
		chrome.runtime.getBackgroundPage( function( e )
		{
			
			for( var i in e.app )
			{
				
				app[ i ] = e.app[ i ]
				
			}
			
			callback()
			
		} )
		
	}
	
})()