app.page.options = new (function()
{
	
	var _activeController 	= null
	var _self 				= this
	
	this.run = function()
	{
		
		var setup = [ app.library.option.COLORIZER, 'change colors and add a background picture' ]
		
		var elementTemplate = this.element.select( '.group' )[ 0 ]	
		var splitTemplate	= this.element.select( '.split' )[ 0 ]
		var elements 		= []

		var name = setup[ 0 ]
		var desc = setup[ 1 ]
		
		// initialize the class if it exists
		if( !app.controller[ name ] ) app.controller[ name ] = {}
		
		var controller = app.controller[ name ]
		
		// set the name for reference
		controller.name = name
		
		// set the controller references
		controller.set 		= f.bind( _setOption, [ controller.name ] )
		controller.get 		= f.bind( _getOption, [ controller.name ] )	
		controller.element 	= elementTemplate.copy()
		
		var paneElement 	= controller.element.select( '.pane' )[ 0 ]
		var detailElement 	= controller.element.select( '.detail' )[ 0 ]
		var iconElement 	= paneElement.select( '.icon' )[ 0 ]
		var nameElement 	= paneElement.select( '.name' )[ 0 ]
		var statusElement 	= paneElement.select( '.status' )[ 0 ]
		
		controller.element.set( 'tip', desc )
		
		// insert the detail html if it exists
		var detailContents = f.select( '#' + controller.name + '_controller' )
		
		if( detailContents.length ) 
		{
			
			detailElement.children( 0 ).append( f( detailContents[ 0 ] ).copy() )
			
		}
		
		// add the picture
		iconElement.style.set( 'background-image', 'url(controller/' + controller.name + '/' + controller.name + '.png)' )
		
		// set the name
		nameElement.write( 'FB Color Changer' )
		
		var onPartClick = f.bind( _onToggleDetail, [ controller ] )
		
		iconElement.listen( 'click', onPartClick )
		nameElement.listen( 'click', onPartClick )
		statusElement.listen( 'click', f.bind( onPartClick, [ true ] ) )
		
		_onStatusToggle( controller )
		
		elements.push( controller.element )
		elements.push( splitTemplate.copy() )
			
			
		this.element.clear()
		this.element.append( elements )

	}
	
	function _setOption( key, subkey, value )
	{
		
		if( app.options[ key ][ subkey ] == value ) return
		
		app.options[ key ][ subkey ] = value
		
		app.setOption( key, subkey, value )	
		
	}
	
	function _getOption( key, subkey )
	{
		//trace(key + ':' + subkey+':' +  Options[ key ][ subkey ])
		return app.options[ key ][ subkey ]
		
	}
	
	function _onHelpClick()
	{
		
		app.go( app.page.help, { 'keywords':this.parent().select( '.name' )[ 0 ].read() } )
		
	}
	
	function _onToggleDetail( controller, e )
	{
		
		if( _activeController == controller )
		{
			
			_closeOpenController()
			
			if( e === true ) _onStatusToggle( controller, false )
			
		}
		else
		{
		
			if( _activeController && _activeController != controller )
			{
				
				_closeOpenController()
				
			}
			
			// run if has a run method and has not ran
			if( controller.run && !controller.ran )
			{
				
				controller.ran = true
				
				controller.run()
			
			}
			
			if( controller.activate ) controller.activate()
			
			if( controller.run )
			{
				
				controller.element.class.add( 'open' )
			
			}
			
			_activeController = controller
			
			// force the controller on
			_onStatusToggle( controller, e === true ? null : true )// )//, e === -1 ? null: true )
			
		}
		
	}
	
	function _closeOpenController()
	{
		
		if( !_activeController ) return
		
		_activeController.element.class.remove( 'open' )
			
		if( _activeController.deactivate ) _activeController.deactivate()
			
		_activeController = null
		
	}
	
	function _onStatusToggle( controller, e )
	{
		
		var first	= e === undefined
		var cur 	= controller.get( 'on' )
		var on		= f.test.boolean( e ) ? e : first ? cur : !cur
	
		controller.element.class[ on ? 'remove' : 'add' ]( 'off' )
		
		if( !first ) controller.set( 'on', on )
		
		// close the last active controller
		if( !on && _activeController && _activeController == controller ) _closeOpenController()
		
	}
	
})()