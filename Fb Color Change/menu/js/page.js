app.component.page = new (function()
{
	
	var _FOOTER_HEIGHT 	= 75
	var _AD_HEIGHT		= 0
	
	var _self 	= this
	var _ran 	= {}
	var _first	 = false
	
	this.run = function()
	{
		
		for( var i in app.page )
		{
			
			app.page[ i ].element = f( '#' + i + '_page' )
			
		}
		
		_onResize()
		
		f( window ).listen( 'resize', _onResize )

		this.show( 'options' )
		
	}
	
	this.show = function( page )
	{
		
		f.log( 'change to page "' + page + '"' )
		
		if( !_first ) 
		{
			
			this.element.class.add( 'first' )
			
			_first = true
			
		}
		else
		{
			
			this.element.class.remove( 'first' )
			
		}
		
		var children = this.element.children()
		
		for( var i in children )
		{
			
			children[ i ].class[ children[ i ].get( 'id' ) != page + '_page' ? 'remove' : 'add' ]( 'current' )
			
		}
		
		if( !_ran[ page ] && app.page[ page ].run ) 
		{
			
			_ran[ page ] = true
			
			app.page[ page ].run()
			
		}
		
		app.page[ page ].element.scroll( 0, 0 )
		
	}
		
	function _onResize()
	{
		
		_self.element.style( 'height', ( f( window ).height() - 0 - _FOOTER_HEIGHT - _AD_HEIGHT ) + 'px' )
		
	}
	
})()