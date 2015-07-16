window.onload = function()
{
	
	// deprecated, in version 27.4 we moved to chrome.storeage instead of localStorage
	
	var whenDone = function()
	{
		
		// get the saved memory before doing anything
		chrome.storage.local.get( null, function( e )
		{
			
			app.run( e )
		
		} )
	
	}
	var current 	= window.localStorage || {}
	var local 		= {}
	var hasProps 	= false
	
	for( var i in current ) 
	{
		
		hasProps = true
		
		local[ i ] = current[ i ]
	
	}
	
	if( hasProps )
	{
		
		for( var i in local )
		{
			try
			{
				local[ i ] = window.JSON.parse( local[ i ] )
			}
			catch(e)
			{
			}
		}
		
		chrome.storage.local.set( local, whenDone )
		
		// clear local storage
		//localStorage.clear()
		
	}
	else 
	{
		
		whenDone()
		
	}
	
}