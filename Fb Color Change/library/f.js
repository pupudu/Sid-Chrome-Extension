var f = function( value )
{
	
	if( value && value._f_ )
	{
		
		return value
		
	}
	else if( !value || f.test.element( value ) || value === window || value === document )
	{
		
		return new f.element( value === document ? document.body : value ? value : window )
		
	}
		
	var el = f.select( value )

	if( el.length == 1 ) return el[ 0 ]
		
	return el
	
}

f.toString = function()
{

	return 'f is the namespace of the Fast Library, designed to make Javascript easier for Web Developers'
	
}

f.keyboard = {}

	f.keyboard.key = {
		
		'ENTER' 		:13,
		'LEFT' 			:37,
		'RIGHT' 		:39,
		'UP' 			:38,
		'DOWN' 			:40,
		'BACKSPACE'		:8,
		'DELETE'	 	:46,
		'TAB' 			:9,
		'SHIFT' 		:16,
		'CONTROL' 		:17,
		'ALTERNATE' 	:18,
		'ESCAPE' 		:27,
		'SPACEBAR' 		:32,
		
	}
	
	f.keyboard._keyCodes = {
		
		'8':'backspace',
		'9':'tab',
		'13':'enter',
		'16':'shift',
		'17':'control',
		'18':'alt',
		'27':'escape',
		'37':'left',
		'38':'up',
		'39':'right',
		'40':'down',
		'46':'delete',
		
	}

f.info = {}
	
	f.info.referrer 		= window.document.referrer || ''
	f.info.language 		= ( window.navigator.userLanguage || window.navigator.language ).toLowerCase()
	f.info.width			= window.screen.availWidth
	f.info.height			= window.screen.availHeight
	f.info.resolution		= window.screen.availWidth + 'x' + window.screen.availHeight

	f.info.device = {}
	
		f.info.device.IPHONE 	= 'iPhone'
		f.info.device.IPAD 	= 'iPhone'
		f.info.device.ANDROID = 'Android'
		f.info.device.BROWSER = 'Browser'
	
		f.bind((function()
		{
		
			f.info.device.name			= ''
			f.info.device.version		= 0
			f.info.device.package 		= ''
			f.info.device.mobile			= false
			
			var agent = window.navigator.userAgent
			
			if( /iPhone/.test( agent ) || /iPad/.test( agent ) )
			{
				
				f.info.device.name		 	= /iPhone/.test( agent ) ? f.info.device.IPHONE : f.info.device.IPAD
				f.info.device.package 		= agent.match( /Version.([.0-9+])/ )[ 1 ]
				
				f.info.device.mobile = true
				
			}
			else if( /Android/.test( agent ) )
			{
				
				f.info.device.name		 	= f.info.device.ANDROID
				f.info.device.package	 	= agent.match( /Android.([.0-9+])/ )[ 1 ]
				
				f.info.device.mobile = true
				
			}
			
			if( f.info.device.versionFull )
			{
			
				var parts = f.info.device.package.split( /\./ )
				
				f.info.device.version = []
				
				for( var i = 0; i< Math.min( parts.length, 2 ); i ++ )
				{
					
					f.info.device.version.push( parts[ i ] )
				
				}
				
				f.info.device.version = f.info.device.version.join( '.' ) * 1
				
			}
		
		})())

	f.info.platform = {}
	
		f.info.platform.ANDROID = 'Android'
		f.info.platform.WINDOWS = 'Windows'
		f.info.platform.MAC = 'Mac'
		f.info.platform.LINUX = 'Linux'

		f.bind((function()
		{
		
			f.info.platform.name		= ''
			f.info.platform.version	= 0
			f.info.platform.package	= ''
		
			var agent 			= window.navigator.userAgent
			var platform 		= window.navigator.platform
			
			if( /Android/.test( agent ) )
			{
				
				f.info.platform.name 		= f.info.platform.ANDROID
				f.info.platform.package 	= agent.match( /Android.([0-9.]+)/ )[ 1 ]
		
			}
			else if( /iPhone/.test( agent ) || /iPad/.test( agent ) )
			{
				
				f.info.platform.name 		= f.info.platform.IOS
				f.info.platform.package 	= agent.match( /Version.([0-9.]+)/ )[ 1 ]
				
			}
			else if( /Linux/.test( agent ) )
			{
				
				f.info.platform.name = f.info.platform.LINUX	
				
			}
			else if( /Mac/.test( platform ) )
			{
				
				f.info.platform.name	= f.info.platform.MAC
				
			}
			else if( /Win/.test( platform ) )
			{
				
				f.info.platform.name	= f.info.platform.WINDOWS
				
			}
			
			if( this.package )
			{
			
				var parts 	= f.info.platform.version.split( /\./ )	
				var version = []
				
				for( var i = 0; i< Math.min( parts.length, 2 ); i ++ )
				{
					
					version.push( parts[ i ] )
				
				}
				
				version = version.join( '.' ) * 1
				
				f.info.platform.version = version
				
			}
			
		})())
	
f.info.browser = {}

	f.info.browser.INTERNET_EXPLORER = 'Internet Explorer'
	f.info.browser.SAFARI = 'Safari'
	f.info.browser.FIREFOX = 'Firefox'
	f.info.browser.CHROME = 'Chrome'

	f.bind((function()
	{
	
		f.info.browser.version 		= 0
		f.info.browser.package 		= 0
		f.info.browser.name 			= ''
		f.info.browser.url 			= ''
		f.info.browser.bot			= false
		
		var agent = window.navigator.userAgent
		
		if( /HTMLUnit/.test( agent ) )
		{
		
			f.info.browser.bot = true	
			
		}
		if( /Chrome/.test( agent ) )
		{
		
			f.info.browser.name    	= f.info.browser.CHROME
			f.info.browser.package   	= agent.match( /Chrome.([.0-9]+)/ )[ 1 ]	
			
		}
		else if( /Firefox/.test( agent ) )
		{
			
			f.info.browser.name    	= f.info.browser.FIREFOX
			f.info.browser.package 	= agent.match( /Firefox.([.0-9]+)/ )[ 1 ]	
			
		}
		else if( /MSIE/.test( agent ) )
		{
			
			f.info.browser.name    	= f.info.browser.INTERNET_EXPLORER
			f.info.browser.package 	= agent.match( /MSIE.([.0-9]+)/ )[ 1 ]	
		
		}
		else if( /Safari/.test( agent ) )
		{
			
			f.info.browser.name    	= f.info.browser.SAFARI
			f.info.browser.package 	= agent.match( /Version.([.0-9]+)/ )[ 1 ]	
			
		}
		else 
		{
			
			f.info.browser.bot = true
		
		}
		
		if( f.info.browser.package )
		{
		
			var parts = f.info.browser.package.split( /\./ )
			
			f.info.browser.version = []
			
			for( var i = 0; i< Math.min( parts.length, 2 ); i ++ ) 
			{
				
				f.info.browser.version.push( parts[ i ] )
			
			}
			
			f.info.browser.version = f.info.browser.version.join( '.' ) * 1
			
		}
		
	})())
	
f.url = {}

	f.url.build = function( url, variables )
	{
		
		if( !url ) url = ''
		
		
		if( variables )
		{
			
			if( !/\?/.test( url ) )
			{
				
				url += '?'
				
			}
			else 
			{
				
				url += '&'
				
			}
			
		}
		
		for( var i in variables )
		{
			
			url += f.url.encode( variables[ i ] ) + '&' 
			
		}
		
		return url.substring( 0, url.length - 1 )
		
	}
	
	f.url.encode = function( value )
	{
	
		return window.escape( value )
		
	}
	
	f.url.decode = function( value )
	{
	
		return window.unescape( value )
		
	}

f.test = function( value )
{

	for( var i in f.test )
	{
	
		if( f.test[ i ]( value ) )
		{
		
			return i
			
		}
		
	}
	
}
	
	f.test.function = function( value )
	{
		
		return typeof( value ) == 'function'
		
	}
	
	f.test.pattern = function( value )
	{
	
		return Object.prototype.toString.apply( value ) == '[object RegExp]'
		
	}
	
	f.test.string = function( value )
	{
		
		return typeof( value ) == 'string'
	
	}
	
	f.test.number = function( value )
	{
		
		return typeof( value ) == 'number' && !isNaN( value )
		
	}
	
	f.test.array = function( value )
	{
		
		if( !value ) return false
		
		if( !f.test.number( value.length ) ) return false
		
		var s = Object.prototype.toString.apply( value )
	
		return ( s === '[object Array]' || s == '[object Arguments]' || s === '[object Object]' )
		
	}
	
	f.test.event = function( value )
	{
		
		return f.test.object( value ) && ( /^\[object Event/.test( value + '' ) )
		
	}
	
	f.test.object = function( value )
	{
		
		if( f.test.undefined( value ) || f.test.null( value ) || f.test.function( value ) || f.test.boolean( value ) ) return false
		
		var s = Object.prototype.toString.apply( value )
		
		if( s.indexOf( '[object Array]' ) == -1 && !f.test.number( value ) && !f.test.string( value ) && !f.test.element( value ) ) return true
		
		return false
		
	}
	
	f.test.element = function( value )
	{
	
		if( !value ) return false
		
		try
		{
			
			return value.nodeName && value.nodeType > 0 ? true : false
			
		}
		catch(e){}
		
		return false
		
	}
	
	f.test.boolean = function( value )
	{
		
		return ( typeof( value ) == 'boolean' )
	
	}
	
	f.test.undefined = function( value )
	{
		
		return value === undefined
		
	}
	
	f.test.null = function( value )
	{
	
		return value === null	
		
	}
	
	f.test.blank = function( value )
	{
		
		return f.test.undefined( value ) || f.test.null( value ) || value === '' ? true : false
		
	}
	
	f.test.empty = f.test.blank = function( value )
	{
		
		return f.test.undefined( value ) || f.test.null( value ) || value === '' ? true : false
		
	}

f.select = function( selector, root )
{
	
	if( root && root._f_ ) 
	{
		
		root = root.element
	
	}
	
	var elements = []
	var ary	 	 = []
	
	try
	{
	
		elements 	= ( root || window.document ).querySelectorAll( selector )
	
	}
	catch(e)
	{ 
	
		throw 'bad selector "' + selector + '"'
		
	}
	
	// turn all elements into f elements
	for( var i = 0; i < elements.length; ++i )
	{
		
		ary[ i ] = f( elements[ i ] )
		
	}
	
	return ary
	
}

// add a listener
f.listen = function( target, type, useCapture, callback )
{
	
	if( !target ) throw 'missing target to listen on'
	if( !type ) throw 'missing event type to listen for'
	if( !callback ) throw 'missing callback to listen for'
	
	var ie = /MSIE/.test( window.navigator.userAgent )
	
	target[ ie ? 'attachEvent' : 'addEventListener' ]( ( ie ? 'on' : '' ) + type, callback, useCapture || false )
	
	return callback
	
}
	
// remove a listener
f.deafen = function( target, type, callback )
{
	
	if( !target ) throw 'missing target to deafen'
	if( !type ) throw 'missing event type to deafen'
	if( !callback ) throw 'missing callback to deafen'
	
	var ie = /MSIE/.test( window.navigator.userAgent )
	
	target[ ie ? 'detachEvent' : 'removeEventListener' ]( ( ie ? 'on' : '' ) + type, callback )
	
	return callback
	
}

// write a log to the console
f.log = f.trace = function()
{
	
	if( console && console.log )
	{
		
		for( var i = 0; i < arguments.length; ++i )
		{
			
			console.log( arguments[ i ] )
		
		}
		
	}
		
}

f.warn = function()
{
	
	if( console && console.log )
	{
		
		for( var i = 0; i < arguments.length; ++i )
		{
			
			console.warn( arguments[ i ] )
		
		}
		
	}
	
}

f.error = function( message )
{
	
	if( console && console.log )
	{
		
		for( var i = 0; i < arguments.length; ++i )
		{
			
			console.error( arguments[ i ] )
		
		}
		
	}
	
}

f.bind = function( method )
{

	if( !method ) throw 'missing method to bind'
	
	var binded 	= []
	var scope 	= null
	
	for( var i = 0; i < arguments.length; ++i )
	{
		
		// skip the first argument which is the method
		if( i == 0 ) 
		{
			
			continue
		
		}
		
		var part = arguments[ i ]
		
		if( f.test.array( part ) ) 
		{
			
			for( var j = 0; j < part.length; ++j )
			{
				
				binded.push( part[ j ] ) 
			
			}
			
		}
		else 
		{
			
			scope = part
			
		}
		
	}

	return function()
	{
		
		return method.apply( scope, binded.concat( Array.prototype.slice.call( arguments ) ) )
			
	}
	
}

f.trim = function( text, allowDoubles )
{
	
	if( !text && text !== 0 ) text = ''
	else text += ''
	
	// leading spaces
	text = text.replace( /^[ ]+/g, '' )
	
	// trailing spaces
	text = text.replace( /[ ]+$/g, '' )
	
	// leading new lines
	text = text.replace( /^\n+/g, '' )
	
	// trailing new lines
	text = text.replace( /\n+$/g, '' )
	
	if( !allowDoubles )
	{
		
		// double spaces
		text = text.replace( /[ ]{2,}/g, ' ' )
		
		// triple new lines
		text = text.replace( /\n{3,}/g, "\n\n" )
	
	}
	
	return text
	
}

f.extend = function( self )
{
	
	for( var i = 1; i < arguments.length; ++i )
	{
		
		var a = arguments[ i ]
		
		if( f.test.function( a ) )
		{
			
			a = new a()
			
		}
		
		for( var j in a ) 
		{
			
			var c = a[ j ]
			
			// wrap functions and point to self
			if( f.test.function( c ) ) 
			{
				
				self[ j ] = f.bind( c, self )
			
			}
			// all others just copy the pointer
			else 
			{
				
				self[ j ] = c
			
			}
			
		}
		
	}
	
}

// create an element
f.create = function( type )
{
	
	var text		= ''
	var attributes 	= null
	var method 		= null
	var children 	= []
	
	for( var i = 1; i < arguments.length; ++i )
	{
	
		if( f.test.function( arguments[ i ] ) )
		{
		
			method = arguments[ i ]
			
		}
		else if( f.test.object( arguments[ i ] ) && !f._f_ )
		{
			
			attributes = arguments[ i ]
			
		}
		else if( f.test.array( arguments[ i ] ) )
		{
			
			children = arguments[ i ]
			
		}
		else
		{
			
			text = arguments[ i ] + ''
			
		}
		
	}
	
	var element = f( document.createElement( type ) )
	
	if( attributes )
	{
		
		for( var i in attributes )
		{
			
			element.set( i, attributes[ i ] )
			
		}
	
	}
	
	if( method )
	{
		
		var event = 'click'
		
		if( type == 'select' ) event = 'change'
		
		if( type == 'iframe' || type == 'script' || type == 'img' ) event = 'load'	
		
		element.listen( event, method )
		
	}
	
	if( text != '' ) element.write( text )
	
	if( children.length ) element.append( children )
	
	return element
	
}

// shorthand creates
f.div  = f.block = f.bind( f.create, [ 'div' ] )
f.span = f.bind( f.create, [ 'span' ] )

f.lower = function( str )
{
	
	if( !str ) str = ''
	
	str += ''
	
	return str.toLowerCase()
	
}

// uppercase a string
f.upper = function( str )
{
	
	if( !str ) str = ''
	
	str += ''
	
	return str.toUpperCase()
	
}

// capitalize a string
f.capitalize = function( str )
{
	
	str += ''
	
	var words = str.split( ' ' )
	
	for( var i = 0; i < words.length; ++i )
	{
		
		words[ i ] = words[ i ].substring( 0, 1 ).toUpperCase() + words[ i ].substring( 1, words[ i ].length ).toLowerCase()
	
	}
	
	return words.join( ' ' )
	
}

f.fullscreen = function( state )
{
	
	return f( document.body ).fullscreen( state )
	
}

f.count = function( value )
{
	
	if( f.test.blank( value ) )
	{
		
		return 0
	
	}
	else if( f.test.string( value ) || f.test.number( value ) ) 
	{
		
		return ( value + '' ).length
	
	}
	else if( f.test.array( value ) ) 
	{
		
		return value.length
	
	}
	else if( f.test.object( value ) )
	{
		
		var c = 0
		
		for( var i in value ) c ++
		
		return c
		
	}
	
	return 0
	
}

f.delay = function( callback, milliseconds )
{
	
	if( !callback ) throw 'missing callback'
	
	return window.setTimeout( function(){ callback() }, milliseconds || 10 )
	
}

f.now = function( input )
{

	return new f.time( input ).value
	
}

f.timestamp = function( input )
{

	return new f.time( input ).timestamp
	
}

f.year = function( input )
{
	
	return new f.time( input ).year 
	
}

f.month = function( input )
{
	
	return new f.time( input ).month 
	
}

f.day = function( input )
{
	
	return new f.time( input ).day 
	
}

f.minute = function( input )
{
	
	return new f.time( input ).minute 
	
}

f.hour = function( input )
{
	
	return new f.time( input ).hour 
	
}

f.second = function( input )
{
	
	return new f.time( input ).second 
	
}

f.millisecond = function( input )
{
	
	return new f.time( input ).millisecond 
	
}

f.open = f.load = f.request = function( urlOrRequests, variables, callback, method )
{
	
	// shorthand if data is omitted
	if( f.test.function( variables ) )
	{
	
		method 		= callback
		callback	= variables
		variables	= null
			
	}
	
	var isUrl = 0
	
	if( f.test.string( urlOrRequests ) )
	{
		
		isUrl = 1
		
	}
	else if( f.test.object( urlOrRequests ) )
	{
		
		isUrl = -1
		
	}
	else if( f.test.array( urlOrRequests ) )
	{
	
		var rObj = {}
		
		for( var i in urlOrRequests )
		{
			
			rObj[ i + '' ] = new f.loader( urlOrRequests[ i ] + '' )
			
		}
		
		urlOrRequests = rObj
		
		isUrl = -1
		
	}
	
	if( !isUrl ) throw 'first argument must be a url, an array of urls, or an object of requests'
	
	if( variables && !f.test.object( variables ) ) throw 'variables must be null or an object'
	if( callback && !f.test.function( callback ) ) throw 'callback must be a string'
	if( method && !f.test.string( method ) ) throw 'method must be a string'
	 
	var loader = null
	
	if( isUrl == 1 )
	{
		
		loader = new f.loader( urlOrRequests, variables )
	
		if( method )
		{
			
			loader.method = method
		
		}
		
		var whenDone = function( e )
		{
		
			callback( {
				
				'text'	:loader.text,
				'json'	:loader.json,
				'xml'	:loader.xml,
				'error'	:loader.error
				
			} )
			
		}
		
		loader.listen( f.loader.event.LOAD, whenDone )
		loader.listen( f.loader.event.ERROR, whenDone )
		
	}
	else
	{
	
		loader = new f.batch( urlOrRequests ) 
		
		loader.listen( f.loader.event.LOAD, function()
		{
			
			if( callback )
			{
				
				callback( loader )
				
			}
			
		} )
		
	}
				
	loader.load()
	
	return loader
	
}

f.copy = function( value )
{
	
	var duplicate 	= null
	var obj 		= f.test.object( value )
	var arr 		= f.test.array( value )

	if( arr || obj )
	{
	
		duplicate = arr ? [] : {}
		
		if( arr ) 
		{
			
			for( var i = 0; i < value.length; i ++ ) 
			{
				
				duplicate[ i ] = f.copy( value[ i ] )
				
			}
			
		}
		else 
		{
			
			for( var i in value ) 
			{
				
				duplicate[ i ] = f.copy( value[ i ] )
				
			}
			
		}
		
	}
	else 
	{
		
		duplicate = value
	
	}
	
	return duplicate
	
}

f.random = function( arg1, arg2 )
{
	
	if( f.test.array( arg1 ) )
	{
		
		var source  = arg1
		var limit	= arg2
		
		if( f.test.undefined( limit ) )
		{
			
			limit = source.length
		
		}
		else if( limit > source.length ) 
		{
			
			limit = source.length
		
		}
		
		var ary	        = []
		var original    = []
		
		// make a copy
		for( var i in source ) 
		{
			
			original[ i ] = source[ i ]
		
		}
		
		for( var i = 0; i < limit; i ++ ) 
		{
			
			var index = Math.round( Math.random() * ( original.length - 1 ) )
			
			ary.push( original[ index ] )
			
			original.splice( index, 1 )
		
		}
		
		return ( arg2 == 1 ) ? ary[ 0 ] : ary
		
	}
	else if( !f.test.undefined( arg1 ) && !f.test.undefined( arg2 ) )
	{
		
		var start 	= arg1
		var end   	= arg2
		var min 	= Math.min( start, end )
		var range  	= Math.abs( start - end ) 
		
		return min + Math.round( Math.random() * range ) 
		
	}
	else if( f.test.string( arg1 ) )
	{
		
		return arg1.substring( 0, Math.round( arg1.length * random() ) )
		
	}
	else if( f.test.number( arg1 ) && arg1 > 0 )
	{
		
		// we subtract 1 so that if the arg is 3, we will choose 0, 1, 2 then add 1 at the end
		var r = Math.round( random() * ( arg1 - 1 ) )
		
		return r + 1 
		
	}
	
	return Math.random()
	
}

f.name = function( value )
{

	if( !f.test.function( value ) ) 
	{
		
		value = value.constructor
	
	}
	
	if( !f.test.function( value ) ) 
	{
		
		throw 'value is not a function'
	
	}
	
	value += ''
	
	var matches = value.match( /^[F|f]unction ([^(]+)/ )
	
	return matches ? matches[ 1 ] : ''
	
}

f.format = {}

	f.format._convert = function( value )
	{
		
		if( f.test.blank( value ) )
		{
			
			return ''
			
		}
		
		return value + ''
		
	}

f.number = function( value )
{
	
	return f.format._convert( value ).replace( /[^0-9]/g, '' )

}

f.price = function( value )
{
	
	var num = f.format._convert( value )
	
	if( !num ) return '0.00'
	
	if( !num.match( /\./ ) ) 
	{
		
		num += '.00'
	
	}
	else
	{
		
		var length = num.split( /\./ )[ 1 ].length
		
		if( length < 2 ) 
		{
			
			num += '0'
		
		}
		else if( length > 2 ) 
		{
			
			num = num.split( '.' )[ 0 ] + '.' + num.split( '.' )[ 1 ].substring( 0, 2 )
		
		}
		
	}
	
	return num 
	
}

f.phone = function( value )
{
	
	var s = f.format._convert( value )
	var f = ''
	
	// if does not contain punctuation
	if( /^[0-9A-Za-z]+$/.test( s ) )
	{
		
		var len = s.length
		
		for( var i = len; i > 0; --i )
		{
			
			var inc = i == len ? 4 : 3
		
			f = s.substring( i - inc, i ) + '.' + f
		
			i -= inc - 1
			
		}
		
		f = f.substring( 0, f.length - 1 )
		
	}
	else 
	{
		
		f = s
		
	}
	
	return f
	
}
	
f.decimal = function( value, length )
{
	
	var value = f.format._convert( value )
	var parts = value.split( '.' )
		
	value = parts[ 0 ]
	
	if( length )
	{
		
		value += '.'
	
		var decimals = ''
		
		if( parts[ 1 ] )
		{
			
			decimals = parts[ 1 ].substring( 0, length )
			
		}
		
		for( var i = decimals.length; i < length; ++i )
		{
			
			decimals += '0'
			
		}
		
		value += decimals
		
	}
	
	return value

}

f.suffix = function( value )
{
	
	var a = f.format._convert( value )
	
	if( a == '' || a == '0' )
	{
		
		return ''
		
	}
	
	var b 	= ''
	
	// teens
	var teen = ( a.substring( 0, a.length - 2 ) + a.substring( 0, a.length - 1 ) ) * 1
	
	if( teen >= 11 && teen <= 19 ) 
	{
		
		b = 'th'
	
	}
	else
	{	
	
		switch( a.substring( 0, a.length - 1 ) )
		{
			
			case '1':
			b = 'st'
			break
			
			case '2':
			b = 'nd'
			break
			
			case '3':
			b = 'rd'
			break
			
			default:
			b = 'th'
			
		}
		
	}
	
	return a + b
	
}
		
f.memory = function()
{

	var obj = {}
	
	if( f.memory.enabled )
	{
		
		for( var i in window.localStorage )
		{
			
			obj[ i ] = f.memory.get( i )
			
		}
		
	}
		
	return obj
	
}

	f.memory.enabled = window.localStorage ? true : false
	
	f.memory.set = function( name, value )
	{
		
		if( !f.memory.enabled ) return
		
		if( !name ) throw 'missing key'
		
		if( f.test.null( value ) || f.test.undefined( value ) )
		{
			
			value = ''
			
		}
		
		if( !f.test.number( value ) && !f.test.string( value ) )
		{
			
			try
			{
				
				value = window.JSON.stringify( value )
			
			}
			catch( e )
			{
			
				value = ''
				
			}
			
		}
		
		localStorage.setItem( name, value )
		
	}
	
	f.memory.get = function( name, convert )
	{
		
		if( !f.memory.enabled ) return ''
		
		if( !name ) throw 'missing name'
		
		var value = null
		
		if( convert )
		{
				
			try
			{
				
				value = window.JSON.parse( window.localStorage.getItem( name ) )
			
			}
			catch( e )
			{
				
				value = window.localStorage.getItem( name )
				
			}
			
		}
		else
		{
			
			value = window.localStorage.getItem( name )
			
		}
		
		return value
		
	}
	
	f.memory.remove = function( name )
	{
		
		if( !name ) throw 'missing name'
		
		if( f.memory.enabled )
		{
			
			window.localStorage.removeItem( name )
		
		}
		
	}
	
	f.memory.reset = f.memory.clear = function()
	{
		
		if( f.memory.enabled )
		{
			
			window.localStorage.clear()
		
		}
		
	}
	
	f.memory.clean = function( keys )
	{
		
		if( !f.memory.enabled ) return
		
		for( var i in obj )
		{
		
			var key 	= i
			var found 	= false
			
			for( var j in keys )
			{
			
				if( keys[ j ] == key )
				{
					
					found = true
					
					break
					
				}
			
			}
			
			if( found ) continue
			
			window.localStorage.removeItem( key )
			
		}
		
	}

f.cookie = function()
{
	
	return f.bind( f.cookie.set, arguments )()
	
}

	f.cookie.set = function( name, value, days )
	{
		
		// clear if no value
		if( !value )
		{
			
			document.cookie = name + '=0; expires=' + ( new window.Date().toGMTString() ) + '; path=/'
			
			return
		
		}
		
		if( !days ) days = 999999
		
		if     ( value === true  ) value = 1
		else if( value === false ) value = 0
		
		var date = new Date()
			
		date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) )
		
		window.document.cookie = name + '=' + value + '; expires=' + date.toGMTString() + '; path=/'
		
	}

	f.cookie.get = function( name )
	{
		
		var nameEQ = name + '='
		var ca     = window.document.cookie.split( ';' )
	
		for( var i = 0; i < ca.length; ++i )
		{
			var c = ca[i]
			
			while( c.charAt(0) == ' ' ) c = c.substring( 1, c.length)
			
			if( c.indexOf( nameEQ ) == 0 ) return c.substring( nameEQ.length, c.length )
		}
	
		return null
		
	}
	
	f.cookie.remove = function( name )
	{
		
		// clear all cookies
		if( !name )
		{
		
			var cookies = document.cookie.split( ';' )
	
			for( var i = 0; i < cookies.length; ++i )
			{
				
				var cookie      = cookies[i]
				var eqPos       = cookie.indexOf( '=' )
				var name        = ( eqPos > -1 ) ? cookie.substr( 0, eqPos ) : cookie
				
				document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
			
			}
			
			return
			
		}
		else
		{
			
			document.cookie = name + '=0; expires=' + ( new Date().toGMTString() ) + '; path=/'

		}
		
	}
	
	f.cookie.clear = function()
	{
	
		window.document.cookie = ''
		
	}

f.json = function( value )
{

	if( f.test.string( value ) )
	{
		
		return f.json.encode( value )
		
	}
	
	return f.json.decode( value )
	
}

	f.json.encode = f.json.stringify = function( value, formatting )
	{
	
		try{ return window.JSON.stringify( value, null, formatting === true ? "\t" : formatting || '' ) + '' }catch(e){}
		
		return ''
	
	}
	
	// turn a json string into its actual representation: object etc
	f.json.decode = f.json.parse = function( value )
	{
		
		if( f.test.undefined( value ) || f.test.null( value ) )
		{
			
			value = ''
			
		}
		
		if( f.test.string( value ) )
		{
		
			try
			{
				
				value = window.JSON.parse( value )
				
			}
			catch(e){}
			
		}
		
		return value
		
	}
	
	f.json.valid = f.json.verify = function( json )
	{
		
		try
		{
			
			window.JSON.parse( json )
			
			return true
			
		}
		catch( e )
		{
			
			return false
			
		}
		
	}
	
f.locate = function( callback )
{
	
	if( !f.locate.enabled ) throw 'location services are not available in this browser'
	
	var whenDone = function()
	{
	
		if( callback )
		{
			
			callback( arguments[ 0 ] )
			
		}
		
	}
	
	window.navigator.geolocation.getCurrentPosition( function( e )
	{
		
		whenDone( {
			
			'timestamp':e.timestamp,
			'altitude':e.altitude,
			'heading':e.heading,
			'speed':e.speed,
			'latitude':e.coords.latitude,
			'longitude':e.coords.longitude,
			'accuracy':e.coords.accuracy
			
		} )
		
	}, function( e )
	{
		
		whenDone( { 
		
			'error':e.message || 'unknown error'
		
		} )
		
	} )
	
}

	f.locate.enabled = window.navigator.geolocation ? true : false
		
f.scroll = function( x, y, smooth )
{

	f.bind( f.scroll.to, [ x, y, smooth ] )()
	
}

	f.scroll.to = function( x, y, smooth )
	{
	
		f.scroll._doScroll( window, x, y, false, smooth )
	
	}
	
	f.scroll.by = function( x, y, smooth )
	{
	
		f.scroll._doScroll( window, x, y, true, smooth )
		
	}
	
	f.scroll.enable = function()
	{
	
		f( window ).style( 'overflow', '' )
			
	}
	
	f.scroll.disable = function()
	{
	
		f( window ).style( 'overflow', 'hidden' )
			
	}
	
	f.scroll._doScroll = function( target, x, y, relative, smooth )
	{
		
		x 		= x || 0
		y 		= y || 0
		target 	= target.element || target
		
		var method 	= null
		var destX 	= x
		var destY 	= y
		
		if( target == window )
		{
			
			method = window.scrollTo
			
			if( relative )
			{
				
				destX = window.scrollX + x
				destY = window.scrollY + y
				
			}
			
		}
		else
		{
			
			method = function( a, b ){ target.scrollLeft = a; target.scrollTop = b }
			
			if( relative )
			{
				
				destX = target.scrollLeft + x
				destY = target.scrollTop + y
			
			}
			
		}
		
		if( !smooth )
		{
			
			method( destX, destY )
			
		}
		else
		{
			
			var timer	= null
			var distX	= 0
			var distY	= 0
			var startX 	= 0
			var startY 	= 0
			
			if( target == window )
			{
				
				startX = window.scrollX
				startY = window.scrollY
				
				distX = destX - startX
				distY = destY - startY
				
			}
			else
			{
				
				startX = target.scrollLeft
				startY = target.scrollTop
				
				distX = destX - startX
				distY = destY - startY
			
			}
			
			var loops 	= 33
			var loop 	= 0
			
			var onClear = function()
			{
			
				try
				{
					
					window.clearInterval( timer )
					
				}
				catch( e ){}
				
				try
				{
					
					f( window ).deafen( 'scroll', onClear )
					
				}
				catch(e){}
				
			}
			
			var calc = function( a )
			{
				
				return ( 1 - window.Math.cos( a * window.Math.PI ) ) / 2

			}
			
			var onScroll = function()
			{
				
				var newX = startX + ( distX * calc( loop / loops ) ) 
				var newY = startY + ( distY * calc( loop / loops ) ) 
				
				method( newX, newY )
					
				++loop
				
				if( loop == loops ) onClear()
				
			}
			
			timer = window.setInterval( onScroll, 10 )
			
			f( target ).listen( 'mousewheel', onClear )
		
		}
		
	}
	
f.script = function()
{
	
	return f.bind( f.script.add, arguments )()
	
}

	f.script.add = function( file, callback )
	{
		
		if( !file ) return
		
		var element = f.create( 'script', { 'src':file, 'type':'text/javascript' } )
		
		if( callback )
		{
			
			element.element.onload = function()
			{
				
				callback( element )
				
			}
			
		}
		
		f.log( 'adding script "' + file + '"' )
		
		f( 'head' ).append( element )
	
		return element
	
	}
	
	f.script.remove = function( element )
	{
	
		element = element.element || element
		
		element.parentNode.removeChild( element )
		
	}
		
f.style = function()
{
	
	return f.bind( f.style.add, arguments )()
	
}

	f.style.add = function( file, callback )
	{
	
		if( !file ) return
		
		var element = f.create( 'link', { 'rel':'stylesheet', 'href':file } )
		
		f.log( 'adding style "' + file + '"' )

		f( 'head' ).append( element )
	
		if( callback )
		{
			
			f.delay( function()
			{
				
				callback( element )
				
				
			} )
		
		}
	
		return element
	
	}
	
	f.style.remove = function( element )
	{
	
		element = element.element || element
		
		element.parentNode.removeChild( element )
		
	}
		
f.pointer = function()
{
	
	return f.bind( f.pointer.create, f.pointer, arguments )()
	
}

	f.pointer.characters = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9' ]
	
	f.pointer._memory = {}
	f.pointer._uniques = {}

	f.pointer.create = function( value )
	{
		
		var id = null
		
		do
		{
			id = '_'
			
			while( id.length < ( f.pointer.characters.length / 2 ) ) 
			{
				
				id += f.pointer.characters[ Math.round( Math.random() * f.pointer.characters.length ) - 1 ] || f.pointer.characters[ 0 ]
			
			}
			
		}
		while( this._uniques[ id ] )
		
		f.pointer._uniques[ id ] = f.test.undefined( value ) ? true : value
		
		return id
	
	}
	
	// remove a pointer from memory
	f.pointer.destroy = function( id )
	{
		
		delete f.pointer._memory[ id ]
		
	}
	
	f.pointer.update = function( id, value )
	{
	
		if( id in f.pointer._uniques ) 
		{
			
			f.pointer._memory[ id ] = value	
			
			return true
			
		}
		
		return false
		
	}
	
	f.pointer.run = function( id, args, scope )
	{
		
		var method = f.pointer._memory[ id ]
		
		if( !method ) throw 'pointer ' + id + ' does not exist'
		
		method.apply( scope, args )
		
	}
	
	// get a direct reference to the function, needed for special circumstances like jsonp callbacks
	f.pointer.name = function( id )
	{
		
		return 'f.pointer._memory.' + id
		
	}

f.absolute = f.abs = window.Math.abs
f.maximum  = f.max = window.Math.max
f.minimum  = f.min = window.Math.min
	
f.round = function( number, decimals, dir )
{
	
	var num = '1'
	
	for( var i = 0; i < decimals; ++i )
	{
		
		num += '0'
		
	}
	
	num = num * 1
	
	return window.Math[ dir > 0 || dir === true ? 'ceil' : dir < 0 || dir === false ? 'floor' : 'round' ]( number * num ) / num
	
}

f.floor = f.roundDown = function( number, spots )
{
	
	return f.bind( f.round, [ number, spots, -1 ] )()

}

f.ceil = f.ceiling = f.roundUp = function( number, spots )
{
	
	return f.bind( f.round, [ number, spots, 1 ] )()

}

f.event = function( type, data, message, e, listener )
{
	
	this.data 		= data
	this.event 		= e
	this.message 	= message || ''
	
	if( e )
	{
		
		this.target = f( e.target || e.srcElement )
		
		this.delta = e.detail || e.wheelDelta || 0
		
		var x = e.offsetX || e.layerX
		
		if( x || x == 0 )
		{
			
			this.x =x
			this.y = e.offsetY || e.layerY
			
		}
		
		// fix keyCode
		var key = e.keyCode || e.which
		
		if( key && key != 1 )
		{
			
			this.key 		= key
			this.value		= f.keyboard._keyCodes[ this.key + '' ] || window.String.fromCharCode( this.key ).toLowerCase()
		
		}
		
		this.shift 		= e.shiftKey ? true : false
		this.control 	= e.ctrlKey ? true : false
		this.alternate 	= e.altKey ? true : false
		this.special 	= e.metaKey ? true : false
		
	}
	else
	{
	
		this.target = listener || this
		
	}
	
	// set the element target 
	this.listener = listener || this

	// override the type
	if( type ) this.type = type

}

	f.event.prototype.stop = function()
	{
		
		try
		{
			
			this.event.preventDefault() 
		
		}
		catch(e){}
	
	}
	
	f.event.prototype.break = function()
	{
	
		try
		{ 
		
			this.event.stopPropagation() 
			
		}
		catch( e )
		{
		 
			this.event.cancelBubble = true
		 
		}
		
	}

f.element = function( element )
{
	
	this._f_				= true
	this.element 			= element	
	this.tag 				= element.nodeName ? element.nodeName.toLowerCase() : ''
	
	// add the class object
	this.class 		= f.bind( f.element.Class, this )
	for( var i in f.element.Class ) this.class[ i ] = f.bind( f.element.Class[ i ], this )
	
	// add the style object
	this.style 		= f.bind( f.element.Style, this )
	for( var i in f.element.Style ) this.style[ i ] = f.bind( f.element.Style[ i ], this )

	// add the attribute object
	this.attribute 	= f.bind( f.element.Attribute, this )
	for( var i in f.element.Attribute ) this.attribute[ i ] = f.bind( f.element.Attribute[ i ], this )

}
	
	f.element.Style = function()
	{
		
		if( arguments[ 1 ] === undefined )
		{
		
			return f.bind( this.style.get, this, arguments )()
			
		}
		else
		{
			
			return f.bind( this.style.set, this, arguments )()

		}
		
	}
	
		f.element.Style.get = function( name )
		{
			
			return this.element.style[ name ]
			
		}
		
		f.element.Style.set = function( name, value )
		{
			
			if( name.indexOf( '-' ) != -1 )
			{
				
				var temp 	= ''
				var parts 	= name.split( '-' )
				
				// if the name started with a "-" then we should make the first part uppercase, eg: -webkit-trans WebkitTrans
				if( !parts[ 0 ] ) 
				{
					
					parts.shift()
					
					if( parts.length )
					{
						
						parts[ 0 ] = parts[ 0 ].charAt( 0 ).toUpperCase() + parts[ 0 ].substring( 1, parts[ 0 ].length )
				
					}
					
				}
				
				temp += parts[ 0 ]
				
				for( var i = 1; i < parts.length; ++i )
				{
				
					temp += parts[ i ].charAt( 0 ).toUpperCase() + parts[ i ].substring( 1, parts[ i ].length )
					
				}
				
				name = temp
				
			}
			
			this.element.style[ name ] = value
			
		}
		
	f.element.Attribute = function( name, value )
	{
		
		if( !value && value !== 0 )
		{
			
			this.attribute.remove( name )
			
		}
		else
		{
			
			this.attribute.set( name, value )
			
		}
		
	}
	
		f.element.Attribute.get = function( name )
		{
			
			var value = this.element.getAttribute( name )
			
			if( value === null || value === undefined ) value = ''
			
			return value
			
		}
		
		f.element.Attribute.set = function( name, value )
		{
			
			this.element.setAttribute( name + '', value )
			
		}
		
		f.element.Attribute.remove = function( name )
		{
			
			this.element.removeAttribute( name )
			
		}
		
		f.element.Attribute.exists = function( name )
		{
			
			var value = this.element.getAttribute( name )
			
			return value === null || value === undefined ? false : true
			
		}
		
	f.element.Class = function()
	{
		
		return f.bind( this.class.set, this, arguments )()
		
	}
	
		f.element.Class.add = function( name )
		{
			var list = this.class.list()
			
			for( var i in list )
			{
				
				if( list[ i ] == name ) return
				
			}
			
			if( this.element.className ) this.element.className += ' '
				
			this.element.className += ' ' + name
			
		}
		
		f.element.Class.remove = function( name )
		{
			
			var dup 	= []
			var list 	= this.class.list()
			
			for( var i = 0; i < list.length; ++i )
			{
			
				if( list[ i ] != name )
				{
					
					dup.push( list[ i ] )
					
				}
				
			}
			
			this.element.className = dup.join( ' ' )
			
		}
		
		f.element.Class.get = function()
		{
			
			return this.element.className
			
		}
		
		f.element.Class.list = function()
		{
			
			return f.trim( this.element.className ).split( ' ' )
			
		}
		
		f.element.Class.set = function( value )
		{
			
			this.element.className = value
			
		}
		
		f.element.Class.clear = function()
		{
			
			this.class.set( '' )
			
		}
		
	f.element.prototype.click = function()
	{
		
		this.element.click()
		
	}
	
	f.element.prototype.required = function()
	{
	
		var required 	= this.get( 'required' )
		var optional 	= this.get( 'optional' )
		
		if( !required && !optional ) return true
		
		var state = true
		
		if( required && required != '0' && required != 'false' && required != '-1' ) state = true
		
		if( optional && optional != '0' && optional != 'false' && optional != '-1' ) state = false
		
		return state
		
	}
	
	f.element.prototype.optional = function()
	{
		
		return !this.required()
		
	}
	
	f.element.prototype.value = function( setValue, flag )
	{
		
		if( setValue !== undefined ) 
		{
			
			// for select tags
			if( this.tag == 'select' )
			{
				
				this.choose( setValue )
				
				return ( this.element.options.length ? this.element.options[ this.element.selectedIndex ].value : '' ) || ''
				
			}
			else
			{
		
				this.element.value = setValue
				
			}
			
		}
		
		return this.tag == 'select' ? this.element.options[ this.element.selectedIndex ].value : this.element.value
	
	}
	
	f.element.prototype.scroll = function( x, y, relative, smooth )
	{
	
		f.scroll._doScroll( this, x, y, relative, smooth )
		
	}
	
	f.element.prototype.load = function( source, callback )
	{
		
		if( callback )
		{
			
			var self = this
			
			var whenDone = function()
			{
				
				self.deafen( 'load', whenDone )
				
				callback()
				
			}
		
			this.listen( 'load', whenDone )
			
		}
		
		this.element.src = source
		
	}
	
	f.element.prototype.reload = f.element.prototype.refresh = function( callback )
	{
		
		if( callback )
		{
			
			var self = this
			
			var whenDone = function()
			{
				
				self.deafen( 'load', whenDone )
				
				callback()
				
			}
		
			this.listen( 'load', whenDone )
			
		}
		
		var lastSource = this.element.src
		
		this.element.src = ''
		this.element.src = lastSource
		
	}
	
	f.element.prototype.fullscreen = function( state )
	{
		
		var prefix = document.webkitIsFullScreen !== undefined ? 'webkit' : document.mozIsFullScreen !== undefined ? 'moz' : document.msIsFullScreen !== undefined ? 'ms' : ''
		var isFull = state === true ? true : state === false ? false : document[ prefix ? prefix + 'IsFullScreen' : 'fullScreen' ]
		
		if( isFull != state )
		{
		
			if( isFull )
			{
			
				document[ prefix ? prefix + 'CancelFullScreen' : 'cancelFullScreen' ]()
				
			}
			else
			{
				
				this.element[ prefix ? prefix + 'RequestFullScreen' : 'requestFullScreen' ]()
				
			}
		
		}
		
	}
	
	f.element.prototype.clone = f.element.prototype.copy = function()
	{
		
		return f( this.element.cloneNode( true ) )
		
	}
	
	f.element.prototype.select = function()
	{
		
		var ary = f.select( arguments[ 0 ], this.element )
		
		return ary
		
	}
	
	// set an element attribute
	f.element.prototype.set = function( name, value )
	{
		
		return this.attribute( name, value )
		
	}
	
	// get an element attribute
	f.element.prototype.get = function( property )
	{
	
		return this.attribute.get( property )
		
	}
		
	// create a form object from an element
	f.element.prototype.form = function()
	{
		
		var elements 	= this.select( 'input, select, textarea' )
		var counter		= 0
		var form		= {
		
			'fields'	:{},
			'data'		:{},
			'submit'	:f.bind( f.element._submitForm, this ),
			'clear'		:f.bind( f.element._clearForm, this ),
			'validate'	:f.bind( f.element._validateForm, this ),
			
		}
		
		for( var i = 0; i < elements.length; ++i )
		{
			
			var e 		= elements[ i ]
			var name 	= e.get( 'name' )
			
			if( !name )
			{
				
				name = counter
				
				++counter
				
			}
			
			var req = e.required()
				
			form.fields[ name ] = {
				
				'value'		:e.value(),
				'element'	:e,
				'required'	:req,
				'optional'	:!req,
				'focus'		:f.bind( e.focus, e ),
				'highlight'	:f.bind( e.highlight, e )
				
			}
			
			form.data[ name ] = e.get( 'type' ) == 'file' && e.value() ? e.element : e.value()
				
		}
		
		return form
		
	}
	
	f.element.prototype.index = function()
	{
		
		if( !this.parent() ) return -1
		
		var children = this.parent().children()
		
		for( var i = 0; i < children.length; ++i )
		{
		
			if( children[ i ].element == this.element )
			{
			
				return i
				
			}
			
		}
		
		return -1
		
	}	
	
		f.element._submitForm = function()
		{
			
			var form = null
			
			if( this.tag == 'form' )
			{
			
				form = this
				
			}
			else
			{
				
				form = this.select( 'form' )[ 0 ]
				
			}
			
			if( !form ) throw 'missing form'
			
			f.delay( function(){ form.element.submit() }, 10 )
			
			return false
			
		}
		
		f.element._clearForm = function()
		{
			
			var elements = this.select( 'input, textarea, select' )
			
			for( var i in elements )
			{
				
				elements[ i ].clear()
				
			}
			
		}
		
		f.element._validateForm = function()
		{
			
			var elements = this.select( 'input, textarea, select' )
			
			for( var i = 0; i < elements.length; ++i )
			{
				
				if( !f( elements[ i ] ).required() ) continue
				
				var value = elements[ i ].value()
				
				if( value == '' ) return false
				
			}
			
			return true
			
		}
	
	f.element.prototype.listen = function( type, callback, useCapture )
	{
		
		if( !type ) throw 'missing event type'
		if( !callback ) throw 'missing event callback'
		
		var element = this.element
		var self 	= this
		
		// proxy the callback
		var proxy = function( e )
		{
			
			callback.apply( self, [ new f.event( '', null, '', ( e || window.event ), element ) ] )
			
		}
		
		if( !this.element._listeners ) this.element._listeners = {}
		
		if( !this.element._listeners[ type ] ) this.element._listeners[ type ] = []
		
		this.element._listeners[ type ].push( [ proxy, callback ] )
		
		return f.bind( f.listen, [ this.element, type, useCapture, proxy ] )()
		
	}
	
	f.element.prototype.deafen = function( type, callback )
	{
		
		if( !this.element._listeners[ type ] ) return
		
		var proxy 	= null
		var dup		= []
		
		for( var i in this.element._listeners[ type ] )
		{
		
			if( this.element._listeners[ type ][ i ][ 1 ] == callback )
			{
				
				proxy = this.element._listeners[ type ][ i ][ 0 ]
				
			}
			else
			{
				
				dup.push( this.element._listeners[ type ][ i ] )
				
			}
			
		}
		
		if( dup.length )
		{
			
			this.element._listeners[ type ] = dup
		
		}
		else
		{
			
			delete this.element._listeners[ type ]
			
		}
		
		if( !proxy ) return
		
		return f.bind( f.deafen, [ this.element, type, proxy ] )()
		
	}

	f.element.prototype.height = function()
	{
	
		return this.element === window ? window.innerHeight : this.element.offsetHeight || 0
		
	}
	
	f.element.prototype.width = function()
	{
	
		return this.element === window ? window.innerWidth : this.element.offsetWidth || 0
		
	}
	
	f.element.prototype.contains = function( element )
	{
		
		if( !element ) return false
		
		var target = element.element || element
		
		if( !f.test.element( target ) ) return false
		
		var children = this.children()
		
		for( var i in children )
		{
			
			if( children[ i ].element == target || children[ i ].contains( target ) ) return true
			
		}
		
		return false
		
	}

	f.element.prototype.focus = function()
	{
		
		this.element.focus()
		
	}
	
	f.element.prototype.blur = function()
	{
		
		// add a hidden input, set its focus, then remove it. this is a trick for getting rid of the focus without killing window.focus
		var input = document.createElement( 'input' )
		
		input.style.position = 'absolute'
		input.style.top = '-100px'
		
		document.body.appendChild( input )
		
		try
		{
			
			setTimeout( function()
			{
				
				input.focus()
				
				setTimeout( function()
				{
					
					document.body.removeChild( input )
					
				}, 10 )
	
			}, 10 )
			
		}
		catch( e ){}
		
	}
	
	f.element.prototype.highlight = function()
	{
		
		if( this.tag == 'input' || this.tag == 'select' || this.tag == 'textarea' )
		{
			
			try
			{
				
				setTimeout( f.bind( function()
				{
							
					this.element.select()
					
				}, this ), 10 )
				
			}
			catch( e ){}
			
		}
		else
		{
		
			if( document.selection )
			{
			
				var range = document.body.createTextRange()
				
				range.moveToElementText( this.element )
				
				range.select()
				
			}
			else if( window.getSelection )
			{
			
				var range = document.createRange()
			
				range.selectNode( this.element )
				
				window.getSelection().addRange( range )
			
			}
			
		}
		
	}
	
	f.element.prototype.remove = function( target )
	{
		
		if( !target )
		{
			
			this.parent().remove( this )
			
		}
		else
		{
			
			try
			{
			
				this.element.removeChild( target.element ? target.element : target )
			
			}
			catch(e){}
			
		}
		
	}
	
	f.element.prototype.append = function()
	{
	
		var value	= []
		var index	= -1
		
		for( var i = 0; i < arguments.length; ++i )
		{
			
			var a = arguments[ i ]
			
			if( f.test.number( a ) )
			{
			
				index = a
				
			}
			else if( a )
			{
				
				value.push( a )
			
			}
			
		}
		
		if( value.length )
		{
			
			var element 	= this.element
			var nodes    	= []
			var addNodes 	= function( part )
			{
				
				// add the DOM element
				if( part._f_ ) 
				{
					
					nodes.push( part.element )
				
				}
				else if( f.test.element( part ) )
				{
					
					nodes.push( part )
					
				}
				// extract recursively from this array
				else if( f.test.array( part ) ) 
				{
					
					for( var i in part ) 
					{
						
						addNodes( part[ i ] )
					
					}
					
				}
				
			}
			
			addNodes( value )
						
			// prepare for insertbefore method
			if( index != -1 ) 
			{
				
				nodes.reverse()
			
			}
			
			for( var i = 0; i < nodes.length; ++i )
			{
				
				var node = nodes[ i ]
				
				try
				{
					
					if( index == -1 )
					{
						
						element.appendChild( node )
						
					}
					else
					{
						
						element.insertBefore( node, element.children[ index ] )
					
					}
					
				}
				catch(e){}
				
			}
			
		}
		
	}
	
	f.element.prototype.children = function( index )
	{
		
		var nodes = this.element.children
		
		if( !nodes.length ) return null
		
		if( f.test.number( index ) )
		{
			
			return nodes[ index ]? f( nodes[ index ] ) : null
			
		}
		else
		{
			
			var list = []
			
			for( var i = 0; i < nodes.length; ++i )
			{
				
				list[ i ] = f( nodes[ i ] )
				
			}
			
			return list
			
		}
		
	}
	
	f.element.prototype.child = function( index )
	{
		
		return this.children( index || 0 )
		
	}
	
	f.element.prototype.parent = function()
	{
		
		return this.element.parentNode ? f( this.element.parentNode ) : null
		
	}

	f.element.prototype.clear = function()
	{
		
		if( this.tag == 'input' || this.tag == 'select' || this.tag == 'textarea' )
		{
			
			this.value( '' )
			
		}
		else
		{
		
			this.element.innerHTML = this.element.innerText = ''
			
		}
		
	}
	
	f.element.prototype.options = function( values )
	{
		
		if( this.tag != 'select' ) throw 'only select elements may use this function'
		
		if( values )
		{
			
			var html = ''
			
			for( var i in values )
			{
				
				var ary 	= f.test.array( values[ i ] )
				var name 	= ary ? values[ i ][ 0 ] : values[ i ]
				var value 	= ary ? values[ i ][ 1 ] : values[ i ]
				
				if( value === undefined ) 
				{
					
					value = ary ? '' : name
					
				}
				else if( value === null ) value = ''
				
				name 	+= ''
				value	+= ''
				
				html += '<option value="' + value.replace( /"/g, /\"/ ) + '">' + name + '</option>'	
				
			}
			
			this.clear()
			this.write( html )
				
		}
		
		return this.select( 'option' )
		
	}
	
	f.element.prototype.choose = function( value )
	{
		
		if( this.tag != 'select' ) throw 'only select elements may use this function'
		
		if( f.test.blank( value ) ) value = ''
		
		value += ''
	
		for( var i = 0; i < this.element.options.length; ++i )
		{
		
			if( this.element.options[ i ].value == value )
			{
				
				this.element.selectedIndex = i
				
			}
			
		}
		
	}
	
	// write html or append children to an element
	f.element.prototype.write = function( value )
	{
		
		if( f.test.blank( value ) )
		{
			
			value = ''
			
		}
		
		value += ''
		//value = ( value + '' ).replace( /<!\[CDATA\[/g, '' ).replace( /\]\]>$/g, '' )
		
		if( this.tag == 'input' )
		{
			
			this.value( value )
			
		}
		else if( this.tag == 'script' ) 
		{
			
			this.element.text = value
		
		}
		else if( this.tag == 'style' ) 
		{
			
			try
			{
				
				this.element.styleSheet.cssText = value
			
			}
			catch( e )
			{}
				
			try
			{
				
				this.element.innerHTML = value
			
			}
			catch( e )
			{}
				
			try
			{
				
				this.element.text = value
			
			}
			catch( e )
			{}
			
		}
		else
		{	
			
			try
			{
				
				this.element.innerHTML = ''
				
			}
			catch(e){}
			
			try
			{
				
				this.element.innerHTML = value
			
			}
			catch(e)
			{
				
				// some browers need a text node
				try
				{
					
					this.element.appendChild( document.createTextNode( value ) )
				
				}
				catch(e)
				{
					
					// some elements in ie need text property to be set such as script and style
					this.element.text = value	
				
				}
				
			}
			
		}
	
	}
	
	f.element.prototype.html = function()
	{
	
		return this.element.outerHTML
		
	}
	
	// get the html within the element
	f.element.prototype.read = function()
	{
		
		return this.element.innerHTML || this.element.innerText
		
	}
	
	f.element.prototype.hide = function()
	{
		
		this.set( 'hidden', 'true' )
		
		this.style.set( 'display', 'none' )
		
	}
	
	f.element.prototype.show = function()
	{
		
		this.set( 'hidden', null )
		
		this.style.set( 'display', '' )
		
	}
	
	f.element.prototype.hidden = function()
	{
	
		return this.style.get( 'display' ) == 'none' || this.get( 'hidden' ) ? true : false
		
	}
	
	f.element.prototype.showing = f.element.prototype.visible = function()
	{
	
		return !this.hidden()
		
	}
	
	f.element.prototype.enabled = function()
	{
		
		return this.get( 'disabled' ) ? false : true
		
	}
	
	f.element.prototype.disabled = function()
	{
		
		return this.get( 'disabled' ) ? true : false
		
	}
	
	f.element.prototype.toggle = function( mode )
	{
		
		var method = this.hidden() ? 'show': 'hide'
		
		if( mode === true || mode === 1 ) 
		{
			
			method = 'show'
		
		}
		
		if( mode === false || mode === 0 ) 
		{
			
			method = 'hide'
		
		}
		
		this[ method ]()
	
	}
	
f.timer = function fTimer( delay, callback, repeat )
{

	if( !f.test.number( delay ) || delay < 0 ) throw 'delay must be a positive number'
	
	if( callback && !f.test.function( callback ) ) throw 'callback must be null or a function'
	
	f.extend( this, f.listener )
	
	this.delay 		= delay || 10
	this.repeat 	= repeat ? true : false
	this.loop 		= 0 
	this.running 	= false
	
	this._timer 	= null
	
	if( callback )
	{
		
		if( this.repeat  )
		{
			
			this.listen( f.timer.event.LOOP, callback )
			
		}
		else
		{
			
			this.listen( f.timer.event.END, callback )
			
		}
		
	}

}

	f.timer.event = {}

		f.timer.event.START = 'start'
		f.timer.event.END	= 'end'
		f.timer.event.LOOP	= 'loop'
		
	f.timer.prototype.stop = function()
	{
		
		this.running = false
		
		try
		{
			
			if( this.repeat )
			{
				
				window.clearInterval( this._timer )
			
			}
			else
			{
			
				window.clearTimeout( this._timer )
				
			}
			
		}
		catch( e ){}
		
		this._timer = null
		
	}
	
	f.timer.prototype.start = function()
	{
		
		if( this.running ) return
		
		this.restart()
		
	}
	
	f.timer.prototype.restart = function()
	{
		
		this.reset()
		
		this._startTimer()
		
	}
	
	f.timer.prototype.reset = function()
	{
		
		this.stop()
		
		this.loop = 0
		
	}
	
	f.timer.prototype._startTimer = function()
	{
		
		this._timer = window[ 'set' + ( this.repeat ? 'Interval' : 'Timeout' ) ]( f.bind( this._onTimer, this ), this.delay )
	
		this.running = true
		
		this.broadcast( f.timer.event.START )
	
	}
	
	f.timer.prototype._onTimer = function()
	{
		
		++this.loop
		
		if( this.repeat )
		{
			
			this.broadcast( f.timer.event.LOOP )
			
		}
		else
		{
		
			this.broadcast( f.timer.event.END )
			
		}
		
	}
	
f.time = function()
{
	
	var _TIMESTAMP_PATTERN		= /^([0-9]{4}-[0-9]{1,2}-[0-9]{1,2})? ?([0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})?\.?([0-9]*)$/
	var _MONTHS					= [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
	var _DAYS					= [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
	
	var _self 					= this
	var _date 					= _createDate( arguments )
	
	_self.yearLocal				= _date.getFullYear()
	_self.monthLocal 			= _date.getMonth() + 1
	_self.monthNameLocal	 	= _MONTHS[ _date.getMonth() ]
	_self.dayLocal				= _date.getDate()
	_self.dayNameLocal 			= _DAYS[ _date.getDay() ]
	_self.hourLocal 			= _date.getHours()
	_self.periodLocal 			= _date.getHours() > 11 ? 'pm' : 'am'
	_self.minuteLocal 			= _date.getMinutes()
	_self.secondLocal 			= _date.getSeconds()
	_self.millisecondLocal 		= _date.getMilliseconds()
	_self.year 					= _date.getUTCFullYear()
	_self.month 				= _date.getUTCMonth() + 1
	_self.monthName				= _MONTHS[ _date.getUTCMonth() ]
	_self.day 					= _date.getUTCDate()
	_self.dayName				= _DAYS[ _date.getUTCDay() ]
	_self.hour 					= _date.getUTCHours()
	_self.period				= _date.getUTCHours() > 11 ? 'pm' : 'am'
	_self.minute 				= _date.getUTCMinutes()
	_self.second 				= _date.getUTCSeconds()
	_self.millisecond 			= _date.getUTCMilliseconds()
	_self.relative				= _getRelative()
	_self.dateLocal				= _getDate( true )
	_self.timeLocal		 		= _getTime( true )
	_self.timestampLocal		= _getTimestamp( true )
	_self.date					= _getDate()
	_self.time 					= _getTime()
	_self.timestamp 			= _getTimestamp()
	_self.value					= _date.valueOf()
	
	_self.getDaysInMonth = function( year, month )
	{
	
		if( f.test.undefined( year ) )
		{
			
			year 	= _self.year
			month 	= _self.month
			
		}
	
		return new window.Date( year, month, 0 ).getDate()
		
	}
	
	_self.toString = function()
	{
	
		return _self.timestamp
		
	}
	
	function _getRelative()
	{
		
		var date 		= new window.Date()
		var now 		= date.valueOf()
		var elapsed 	= ( _date.valueOf() - now ) / 1000
		var isFuture 	= elapsed > 0
		var num
		var type
		
		elapsed = window.Math.abs( elapsed )
		
		// if is in the past and just happened
		if( ( !elapsed || elapsed < 15 ) && !isFuture )
		{
		
			return 'just now'
				
		}
		else
		{
			
			if( elapsed >= 31536000 ) 
			{
				
				num  = elapsed / 31536000
				type = 'year'
			
			}
			else if( elapsed >= 2592000 ) 
			{
				
				num  = elapsed / 2592000
				type = 'month'
			
			}
			else if( elapsed >= 86400 ) 
			{
				
				num  = elapsed / 86400
				type = 'day'
			
			}
			else if( elapsed >= 3600 )
			{
				
				num  = elapsed / 3600
				type = 'hour'
				
			}
			else if( elapsed >= 60 )
			{
				
				num  = elapsed / 60
				type = 'minute'
				
			}
			else
			{
				
				num  = elapsed
				type = 'second'
				
			}
			
			num = window.Math.ceil( num )
			
			if( num > 1 || num == 0 ) type += 's'
			
			// phrase the final output
			var phrase = num + ' ' + type
			
			if( isFuture )
			{
				phrase = 'in ' + phrase
			}
			else
			{
				phrase = phrase + ' ago'
			}
			
			return phrase
			
		}
		
	}
	
	function _getTimestamp( local )
	{
		
		var year 		= _addZeros( local ? _self.yearLocal : _self.year, 4 )
		var month 		= _addZeros( local ? _self.monthLocal : _self.month, 2 )
		var day 		= _addZeros( local ? _self.dayLocal : _self.day, 2 )
		var hour 		= _addZeros( local ? _self.hourLocal : _self.hour, 2 )
		var minute 		= _addZeros( local ? _self.minuteLocal : _self.minute, 2 )
		var second 		= _addZeros( local ? _self.secondLocal : _self.second, 2 )
		var millisecond = _addZeros( local ? _self.millisecondLocal : _self.millisecond, 3 )
		
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second// + '.' + millisecond
		
	}
	
	function _addZeros( num, len )
	{
	
		num += ''
		
		while( num.length < len ) 
		{
			
			num = '0' + num
		
		}
		
		return num	
		
	}
	
	function _getTime( local )
	{
		
		var hour	= local ? _self.hourLocal : _self.hour
		var minute	= local ? _self.minuteLocal : _self.minute
		var period	= local ? _self.periodLocal : _self.period
		
		if( hour > 12 ) 
		{
			
			hour -= 12
		
		}
		
		if( hour == 0 )
		{
			
			hour = 12
		
		}
		
		return hour + ':' + _addZeros( minute, 2 ) + period
		
	}
	
	function _getDate( local )
	{
		
		var year	= local ? _self.yearLocal : _self.year
		var month	= local ? _self.monthLocal : _self.month
		var day		= local ? _self.dayLocal : _self.day
		
		return _MONTHS[ month - 1 ].substring( 0, 3 ) + ' ' + f.suffix( day ) + ', ' + year
		
	}
	
	function _createDate( parts )
	{
		
		var inYear			= 0
		var inMonth			= 0
		var inDay			= 0
		var inHour			= 0
		var inMinute		= 0
		var inSecond		= 0
		var inMillisecond	= 0
		var isLocal 		= false
		var inString 		= ''
		var inValue 		= 0
		
		for( var i = 0; i < parts.length; ++i )
		{
		
			var a = parts[ i ]
			
			if( f.test.boolean( a ) ) 
			{
				
				isLocal = a
			
			}
			else if( f.test.number( a ) )
			{
				
				if( a > 9999 )
				{
					
					inValue = a
					
				}
				else if( !inYear ) inYear = a
				else if( !inMonth ) inMonth = a
				else if( !inDay ) inDay = a
				else if( !inHour ) inHour = a
				else if( !inMinute ) inMinute = a
				else if( !inSecond ) inSecond = a
				else if( !inMillisecond ) inMillisecond = a
			
			}
			else if( f.test.string( a ) )
			{
				
				inString = a 
				
			}
			
		}
		
		if( inYear ) inString = inYear + '-' + inMonth + '-' + inDay + ' ' + inHour + ':' + inMinute + ':' + inSecond + '.' + inMillisecond	
		
		var date = null
		
		// try to parse a timestamp
		if( inString )
		{
			
			var parts		= null
			var year 		= 0
			var month 		= 0
			var day 		= 0
			var hour 		= 0
			var minute 		= 0
			var second 		= 0
			var millisecond = 0
			
			date = new window.Date()

			if( _TIMESTAMP_PATTERN.test( inString ) )
			{
		
				parts 		= inString.split( /[^0-9]/ )
				year 		= ( parts[ 0 ] * 1 ) || 0
				month 		= ( parts[ 1 ] * 1 ) || 0
				day 		= ( parts[ 2 ] * 1 ) || 0
				hour 		= ( parts[ 3 ] * 1 ) || 0
				minute 		= ( parts[ 4 ] * 1 ) || 0
				second 		= ( parts[ 5 ] * 1 ) || 0
				millisecond = ( parts[ 6 ] * 1 ) || 0
				
			}
			else
			{
			
				parts 	= f.trim( inString + '' ).split( /[^0-9]/ )
				year 	= ''
				month 	= ''
				day 	= ''
				
				for( var i = 0; i < parts.length; ++i )
				{
					
					if( parts[ i ].length > 3 && !isNaN( parts[ i ] * 1 ) )
					{
						
						year = parts[ i ]
						
					}
					else if( parts[ i ].length == 1 || parts[ i ].length == 2 ) 
					{
						
						if( !month ) month = parts[ i ]
						else if( !day ) day = parts[ i ]
						
					}
					
				}
				
				year 		= year.substring( 0, 4 ) * 1
				month 		= month.substring( 0, 2 ) * 1
				day 		= day.substring( 0, 2 ) * 1
			
			}
			
			date[ 'set' + ( isLocal ? '' : 'UTC' ) + 'FullYear' ]( year )
			date[ 'set' + ( isLocal ? '' : 'UTC' ) + 'Month' ]( month - 1 )
			date[ 'set' + ( isLocal ? '' : 'UTC' ) + 'Date' ]( day )
			date[ 'set' + ( isLocal ? '' : 'UTC' ) + 'Hours' ]( hour )
			date[ 'set' + ( isLocal ? '' : 'UTC' ) + 'Minutes' ]( minute )
			date[ 'set' + ( isLocal ? '' : 'UTC' ) + 'Seconds' ]( second )
			date[ 'set' + ( isLocal ? '' : 'UTC' ) + 'Milliseconds' ]( millisecond )
			
		}
		// let the native parse take over
		else if( inValue )
		{
			
			date = new window.Date( inValue )
				
		}
		else
		{
			
			date = new window.Date()

		}
		
		if( date.toString() == 'Invalid Date' )
		{
		
			date = new window.Date()
			
		}
		
		return date
	
	}
	
	return this
	
}

f.loader = function( url, variables, method )
{
	
	f.extend( this, f.listener )
	
	if( !url ) throw 'missing url'
	
	if( method )
	{
		
		var found = false
		
		for( var i in f.loader.method )
		{
		
			if( method == f.loader.method[ i ] )
			{
				
				found = true
				
				break
				
			}
		
		}
		
		if( !found ) throw 'invalid request method, use get or post etc'
		
	}
	
	this.url 			= url
	this.variables 		= variables || {}
	this.method 		= method || f.loader.method.GET
	this.error			= ''
	this.synchronus 	= false
	this.timeout		= 0
	
	this._pointer		= null
	this._timeout 		= null
	this._xhr			= null
	this._iframe		= null
	this._iframeTimer	= null
	
}

	f.loader.method = {}
	
		f.loader.method.GET 		= 'get'
		f.loader.method.POST 		= 'post'
		f.loader.method.MULTIPART 	= 'multipart'
		f.loader.method.SCRIPT 		= 'script'
	
	f.loader.event = {}
	
		f.loader.event.LOAD 	= 'load'
		f.loader.event.CLOSE 	= 'close'
		f.loader.event.ERROR 	= 'error'
		f.loader.event.PROGRESS = 'progress'
	
	f.loader._TIMEOUT			= 30000
	f.loader._FORM_DATA_SUPPORT	= !f.test.undefined( window.FormData ) 
	f.loader._IFRAME_CHECK 		= 100
	
	f.loader._createGetUrl = function( url, variables )
	{
		
		url = url || ''
		
		if( !/\?/.test( url ) ) url += '?'
		
		url += f.loader._createEncodedString( variables )
				
		url = url.replace( '?&', '?' )
		
		return url
		
	}
	
	f.loader._getCacheSeconds = function( request )
	{
		
		var control 	= request.getResponseHeader( 'Cache-Control' )
		var expires 	= request.getResponseHeader( 'Expires' )
		var modified	= request.getResponseHeader( 'Last-Modified' )
		var pragma		= request.getResponseHeader( 'Pragma' )
		var seconds 	= 0
		
		if( control && /max-age=([0-9]+)/.test( control ) )
		{
			
			seconds = control.match( /max-age=([0-9]+)/ )[ 1 ] * 1
			
			
		}
		else if( control && ( /no-store/.test( control ) || /no-cache/.test( control ) || /no-cache/.test( control ) || /must-reval/.test( control ) ) )
		{
			
			seconds = 0
			
		}
		else if( expires )
		{
			
			seconds = ( f.time( expires ) ) / 1000
			
		}
		else if( pragma && /no-cache/.test( pragma ) )
		{
			
			seconds = 0
			
		}
		else if( pragma && /cache/.test( pragma ) ) 
		{
			
			seconds = 86400
			
		}
		
		if( seconds < 0 ) seconds = 0
		
		return seconds
		
	}
	
	f.loader._createEncodedString = function( variables )
	{
		
		var s = ''
		
		for( var i in variables )
		{
			
			s += '&' + window.escape( i ) + '=' + window.escape( variables[ i ] )
		
		}
		
		return s

	}
	
	f.loader._fixVariables = function( variables )
	{
	
		var fixed = {}
		
		for( var i in variables )
		{
			
			var variable = variables[ i ]
			
			if( variable === null || variable === undefined ) continue
			
			if( variable._f_ || f.test.element( variable ) )
			{
				
				var element = variable
				
				if( element._f_ ) element = element.element
				
				if( element.nodeName == 'INPUT' )
				{
					
					if( element.getAttribute( 'type' ) != 'file' )
					{
						
						fixed[ i ] = element.value
						
					}
					else
					{
						
						// we are going to have to attach the file input to a form
						fixed[ i ] = element
						
					}
					
				}
				else if( element.nodeName == 'SELECT' )
				{
					
					fixed[ i ] = element.options[ element.selectedIndex ].value
					
				}
				else
				{
					
					fixed[ i ] = element.value
				
				}
			
			}
			else
			{
			
				fixed[ i ] = variable + ''
				
			}
			
		}
		
		return fixed
		
	}
	
	f.loader._buildForm = function( url, variables, iframe, multipart )
	{
		
		var doc         = iframe.contentWindow.document // must use the document.create of the window.we will be using
		var form       	= doc.createElement( 'form' )
		var encoding    = !multipart ? 'application/x-www-form-urlencoded': 'multipart/form-data'
		var savedInputs = []
		
		// set where the form is submitting to and how
		form.action 	= url
		form.method 	= 'post'
		
		// issues in ie
		try{ form.encoding = encoding }catch(e){}
		try{ form.enctype = encoding }catch(e){}
		
		// for each variable
		for( var i in variables ) 
		{
			
			var input 		= null
			var variable 	= variables[ i ]
			
			// if this is already an input, use it
			if( f.test.element( variable ) ) 
			{
				
				input = variable
				
				savedInputs.push( [ input, input.parentNode, input.nextSibling, input.previousSibling, input.name ] )

			}
			// otherwise build one
			else
			{
				
				input = doc.createElement( 'input' )
				input.value = variable
				
			}
			
			// set the name
			input.name = i
			
			// add to the form
			form.appendChild( input )
			
		}
		
		return [ form, savedInputs ]
		
	}
	
	f.loader._checkForFileInputs = function( variables )
	{
		
		for( var i in variables )
		{
			
			if( variables[ i ].f || f.test.element( variables[ i ] ) )
			{
				
				var element = variables[ i ]
				
				if( element._f_ )
				{
					
					element = element.element
				
				}
				
				if( element.nodeName == 'INPUT' )
				{
					
					if( element.getAttribute( 'type' ) != 'file' )
					{
						
						return true
						
					}
					
				}
				
			}
			
		}
		
		return false

	}

	f.loader.prototype.load = f.loader.prototype.open = function()
	{
	
		if( !this.url ) throw 'missing url'
		
		this.variables = f.loader._fixVariables( this.variables )
		
		// override method if file inputs are found
		if( this.method != f.loader.method.MULTIPART && f.loader._checkForFileInputs( this.variables ) )
		{
		
			this.method = f.loader.method.MULTIPART
		
		}
		
		// only for non-multipart
		if( this.method != f.loader.method.MULTIPART )
		{
			
			this._timeout = setTimeout( f.bind( this._onTimeout, this ), this.timeout || f.loader._TIMEOUT )
		
		}
		
		if( this.method == f.loader.method.MULTIPART )
		{
		
			this._doMultipart()	
			
		}
		else if( this.method == f.loader.method.SCRIPT )
		{
		
			this._doScript()
			
		}
		else
		{
			
			if( this.method )
			{
				
				var found = false
				
				for( var i in f.loader.method )
				{
				
					if( this.method == f.loader.method[ i ] )
					{
						
						found = true
						
						break
						
					}
				
				}
				
				if( !found ) throw 'invalid request method, use get, post etc'
				
			}
			
			this._doGetPost()
			
		}
		
	}
	
	f.loader.prototype.cancel = f.loader.prototype.close = function()
	{
		
		if( this._timeout )
		{
			
			clearTimeout( this._timeout )
			
			this._timeout = null
		
		}
		
		if( this._xhr )
		{
			
			try
			{
				
				this._xhr.abort()
				
				this._xhr = null
				
			}
			catch( e ){}
			
		}
		
		if( this._pointer )
		{
			
			f.pointer.destroy( this.pointer )
			
			this._pointer = null
			
		}
		
		if( this._iframe )
		{
		
			try
			{
				
				this._iframe.parentNode.removeChild( this._iframe )
				
				this._iframe = null
				
			}
			catch( e )
			{}
			
			try
			{
				
				clearInterval( this._iframeTimer )
				
				this._iframeTimer = null
				
			}
			catch( e ){}
			
		}
		
		this.broadcast( f.loader.event.CLOSE )
		
	}
	
	f.loader.prototype._doScript = function()
	{
		
		this._pointer = f.pointer.create( this._onLoad )
		
		var variables = f.copy( this.variables )
		
		variables.callback = f.pointer.name( this._pointer )
		
		f.script( f.url.build( _this.url, variables ) )

	}
	
	f.loader.prototype._doGetPost = function()
	{
		
		var url 	= this.url
		var data 	= null
		
		// for get, put all of the variables on the url string
		if( !this.method || this.method == f.loader.method.GET )
		{
			
			url = f.loader._createGetUrl( url, this.variables )
			
		}
		// for post, put all of the variables on the post data
		else
		{
			
			data = f.loader._createEncodedString( this.variables )
		
		}
		
		this._xhr = new window.XMLHttpRequest()
		
		this._xhr.open( this.method, url, this.synchronus ? false : true )
		
		try
		{
			
			this._xhr.send( data )
			
			this._xhr.onreadystatechange = f.bind( this._onXhrStateChange, this )
		
		}
		catch( e )
		{
			
			this._onError( 'no internet connection or security exception' )
			
		}
		
	}
	
	f.loader.prototype._onXhrStateChange = function()
	{

		if( this._xhr.readyState == 4 && ( this._xhr.status == 200 || this._xhr.status == 0 ) )
		{
		
			this._onLoad( this._xhr.responseText )	
			
		}
		
	}
	
	f.loader.prototype._onTimeout = function()
	{
	
		this.close()
		
		this._onError( 'the request timed-out after ' + ( f.loader._TIMEOUT / 1000 ) + ' seconds' )
				
	}
	
	f.loader.prototype._onError = function( error )
	{
	
		this.error = error.message || error || 'unknown error'
		
		this._onDone()
		
	}
	
	f.loader.prototype._onLoad = function( response )
	{
	
		response += ''
		
		this.text = response
	
		try
		{
			
			this.json = window.JSON.parse( response )
		
		}
		catch( e ){}
		
		try
		{
			
			this.xml = new windowlDOMParser().parseFromString( response, 'text/xml' )
			
		}
		catch( e ){}
		
		this._onDone()
		
	}
	
	f.loader.prototype._onProgress = function()
	{
		
		this.broadcast( f.loader.event.PROGRESS )
		
	}
	
	f.loader.prototype._onDone = function()
	{
		
		this.close()
		
		if( this.error )
		{
			
			this.broadcast( f.loader.event.ERROR )
			
		}
		else 
		{
	
			this.broadcast( f.loader.event.LOAD )
			
		}
		
	}
	
	f.loader.prototype._doMultipart = function()
	{
		
		this._iframe = window.document.createElement( 'iframe' )
					
		// listen for iframe error
		this._iframe.onerror = this._onError
		
		// create iframe with default source for android or else the page changes
		if( f.info.platform.name == f.info.platform.ANDROID ) this._iframe.src = 'x'
		
		// this onload event will be fired when the iframe loads the browser default page ( unknown timing )
		this._iframeTimer = window.setInterval( f.bind( function()
		{
			
			if( this._iframe.contentWindow.document )
			{
				
				window.clearInterval( this._iframeTimer )
				
				this._onBlankIframeLoaded()
				
			}
			
		}, this ), f.loader._IFRAME_CHECK )
		
		// secretly add, then we wait for the browser to initialize it and trigger the onload
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( this._iframe )
					
	}
	
	f.loader.prototype._onBlankIframeLoaded = function()
	{
		
		var formParts 			= f.loader._buildForm( this.url, this.variables, this._iframe, this.method == 'multipart' )
		var formElement 		= formParts[ 0 ]
		var formSavedInputs 	= formParts[ 1 ]
		
		this._iframe.contentWindow.document.body.appendChild( formElement )

		// listeners for different browsers
		this._iframe.onload 			= f.bind( this._onIframeLoad, this )
		this._iframe.onreadystatechange = f.bind( this._onIframeLoad, this )
		
		formElement.submit()
		
		// now put back any saved elements
		if( formSavedInputs )
		{
			
			for( var i in formSavedInputs )
			{
			
				formSavedInputs[ i ][ 1 ].insertBefore( formSavedInputs[ i ][ 0 ], formSavedInputs[ i ][ 2 ] )
				formSavedInputs[ i ][ 1 ].setAttribute( 'name', formSavedInputs[ i ][ 4 ] )
			
			}
			
		}
		
	}
	
	f.loader.prototype._onIframeLoad = function( e )
	{
		
		var response = ''
		
		try
		{ 
			
			response = this._iframe.contentWindow.document.body.innerHTML.replace( /^( *)*/, '' ).replace( /( *)*$/, '' ).replace( /^(<[a-zA-Z]+[^>]*>)*/g, '' ).replace( /(<\/[a-zA-Z]+[^>]*>)*$/g, '' ).replace( /<\/STYLE>/, '' )
			
		}
		catch( e ){}
		
		this._onLoad( response )
		
	}
	
f.listener = function()
{
	
	this._listeners = {}
	
}

	f.listener.prototype.listen = function( name, callback )
	{
		
		if( !name ) throw 'missing event type to listen for'
		if( !callback ) throw 'missing callback to listen for'
		
		if( !this._listeners[ name ] ) 
		{
			
			this._listeners[ name ] = []
		
		}
		
		// check for function, if it exists, stop here
		for( var i = 0; i < this._listeners.length; ++i )
		{
			
			if( this._listeners[ name ][ i ] == callback )
			{
				
				return
					
			}
			
		}
		
		// otherwise add it
		this._listeners[ name ].push( callback )
		
	}
		
	f.listener.prototype.deafen = function( name, callback )
	{
		
		if( !name ) throw 'missing event type to deafen'
		if( !callback ) throw 'missing callback to deafen'
		
		if( !this._listeners[ name ] )
		{
			
			return
			
		}
		
		var copy = []
			
		for( var i = 0; i < this._listeners[ name ].length; ++i ) 
		{
			
			if( this._listeners[ name ][ i ] != callback ) 
			{
				
				copy.push( this._listeners[ name ][ i ] )
		
			}
			
		}
		
		if( copy.length ) 
		{
			
			this._listeners[ name ] = copy
			
		}
		else 
		{
			
			delete this._listeners[ name ]
			
		}
		
	}
		
	f.listener.prototype.broadcast = function( typeOrEvent, data, message )
	{
		
		if( !typeOrEvent ) throw 'missing event type to broadcast'
		
		var event 	= null
		var type	= ''
		
		// for (type, [ message, data ] ) format
		if( !f.test.object( typeOrEvent ) )
		{
			
			type = typeOrEvent
		
			event = {}
			
			event.data 		= data
			event.message 	= message
			
		}
		// for ( event ) format
		else
		{
		
			event 	= typeOrEvent
			type 	= typeOrEvent.type
			
		}
		
		var methods = this._listeners[ type ]
		
		if( !this._listeners[ type ] )
		{
			
			return
			
		}
		
		var length = methods.length
		
		for( var i = 0; i < length; ++i )
		{
			
			methods[ i ].apply( this, [ event ] )
			 
		}
		
	}
	
	
	
f.navigator = function( callback, popBase )
{
	
	if( callback && !f.test.function( callback ) ) throw 'callback must be a function'
	
	this._lastUrl		= window.location.href
	this._timer			= new f.timer( f.navigator._DELAY, f.bind( this._onUrlCheck, this ), true )
	this._callback		= callback
	this._popBase		= popBase || ''
	this._isStarted		= false
	
	if( !/^[a-z]+:\/\//.test( this._popBase ) )
	{
		
		var base = window.location.protocol + '//' + window.location.host
		
		if( this._popBase.charAt( 0 ) != '/' )
		{
			
			base += '/'
			
		}
		
		this._popBase = base + this._popBase
		
	}
	
}

	f.navigator._DELAY = 200
	
	f.navigator.prototype.set = function( page, variables )
	{
		
		// protocol changes to to actual page
		if( /^[a-z]+:\/\//.test( page ) || /^\//.test( page ) ) 
		{
			
			window.location = page
			
			return
			
		}
		
		var url = ( !page ? '' : variables ? this.build( page, variables ) : page ) || ''
		
		if( this._popBase ) 
		{
			
			url = this._popBase + url
			
		}
		
		if( this._lastUrl != url )
		{
			
			if( this._popBase ) 
			{
				
				if( window.history.pushState )
				{
					
					window.history.pushState( null, '', url )
				
				}
				else
				{
				
					window.location = url
					
				}
				
			}
			else
			{
				
				window.location.hash = '/' + url
			
			}
			
		}
		
		this._onUrlChange()
		
		if( !this._isStarted )
		{
			
			this._isStarted = true
			
				
			this._timer.start()
			
			f.listen( window, 'popstate', f.bind( this._onUrlChange, this ) )

		}
		
	}
	
	f.navigator.prototype.build = function( page, variables )
	{
		
		if( !page ) return ''
		
		// set the url
		var url = page
		
		if( variables )
		{
			
			var ary = []
			
			// turn objects into array format
			if( f.test.object( variables ) )
			{
				
				for( var i in variables )
				{
				
					ary.push( [ i, variables[ i ] ] )
					
				}
				
			}
			
			for( var i = 0; i < ary.length; ++i )
			{
				
				var isAry 	= f.test.array( ary[ i ] )
				var key 	= isAry ? ary[ i ][ 0 ] : ary[ i ]
				var value 	= isAry ? ary[ i ][ 1 ] : null
				
				url += '/' + f.url.encode( key )
				
				if( ( value || value === 0 ) && value !== true ) 
				{
					
					url += '-' + f.url.encode( value )
				
				}
				
			}
			
		}
		
		return url
		
	}
	
	f.navigator.prototype.get = function()
	{
		
		var url 		= ''
		var page 		= ''
		var variables 	= {}
		var keys		= []
		
		if( this._popBase )
		{
		
			url = window.location.href.split( this._popBase.charAt( this._popBase.length - 1 ) == '/' ? this._popBase.substring( 0, this._popBase.length - 1 ): this._popBase )[ 1 ]
			
		}
		else
		{
			
			url = window.location.hash
			
		}
		
		url = ( url || '' ).replace( /^\//, '' )
		
		if( url )
		{
			
			try
			{
				
				var parts 		= url.split( '/' )
				var variables	= {}
				
				if( parts.length > 1 )
				{
					
					for( var i = 1; i < parts.length; ++i )
					{
						
						var name 	= parts[ i ].split( '-' )[ 0 ]
						var value 	= parts[ i ].split( '-' )[ 1 ] || ''
					
						name 	= f.url.decode( name )
						value 	= f.url.decode( value )
						
						keys.push( name )
						
						variables[ name ] = !value && value !== 0 ? true : value
					
					}
					
				}
				
				page = parts[ 0 ]
				
			}
			catch(e){}
				
		}
		
		return {
			
			'page'		:page,
			'variables'	:variables,
			'keys'		:keys,
			'path'		:url
		
		}
		
	}
	
	f.navigator.prototype._onUrlCheck = function()
	{
	
		if( window.location.href == this._lastUrl ) 
		{
			
			return
		
		}
		
		this._onUrlChange()
		
	}
	
	f.navigator.prototype._onUrlChange = function()
	{
				
		this._lastUrl = window.location.href

		var parts = this.get()
				
		this._callback( parts )
		
	}
		
f.serve = function( defaultUrl, filters )
{
	
	if( !defaultUrl )
	{
		
		throw 'missing default url'
		
	}
	
	var value 	= defaultUrl
	var type 	= f.serve.SITE
	
	// use the configuration file to check if we should change these values
	
	var newValues = f.serve._getConfigurationFilterValues( f.serve._convertFilters( filters ) )
	
	if( newValues )
	{
		
		if( newValues[ 0 ] ) 
		{
			
			value = newValues[ 0 ]	
		
		}
		
		if( newValues[ 1 ] )
		{
			
			type = newValues[ 1 ]
		
		}
		
	}
	
	if( type != f.serve.REDIRECT && !/\./.test( value ) )
	{
		
		if( !/\/$/.test( value ) ) 
		{
			
			value += '/'
			
		}
		
		value += 'application.xml'
		
	}
	
	// for redirect types, just send us to the new url
	if( type == f.serve.REDIRECT )
	{
		
		window.location.replace( value )
		
	}
	// for site types, we are going to use an xml file to load resources and run code when the resources are done
	else if( type == f.serve.SITE )
	{
		
		f.serve._doRunSite( f.serve._getFileContents( value ) )
		
	}
	// if this is a rewrite just dump out the contents	
	else
	{
		
		document.write( f.serve._getFileContents( value ) )
		
	}
	
}

	f.serve.SITE 		= 'site'
	f.serve.REDIRECT 	= 'redirect'
	f.serve.REWRITE 	= 'rewrite'
	
	f.serve._getFileContents = function( file )
	{
		
		var r = new window.XMLHttpRequest()
		var response	
		
		try
		{		
		
			r.open( 'GET', file, false )
			r.send()
	
			response = r.responseText
			
		}
		catch(e){}
		
		return response || ''
		
	}	
	
	f.serve._getConfigurationFilterValues = function( filters )
	{
		
		var value 		= window.location.href
		var type 		= null
		
		for( var i = 0; i < filters.length; ++i )
		{
			
			var filter = filters[ i ]
			
			// if we are done going through redirect filters and there was a match, stop here and do the redirect so that the url can update
			if( filter.type != f.serve.REDIRECT && type == f.serve.REDIRECT )
			{
				
				break
				
			}
			
			// no match on this filter
			if( !filter.pattern.test( value ) ) 
			{
				
				continue
			
			}
			
			// if there are backward matches like $1 in the replacement, use string replace
			if( /\$[0-9]/.test( filter.value ) ) 
			{
				
				value = value.replace( filter.pattern, filter.value )
				
			}
			// otherwise just use the whole replacement
			else 
			{
				
				value = filter.value
				
			}
			
			type = filter.type
			
			// stop here for rewrites and applications
			if( type == f.serve.REWRITE || type == f.serve.SITE )
			{
			
				break	
				
			}
			
		}
		
		if( type )
		{
			
			return [
		
				value,
				type
			
			]
			
		}
		
	}

	f.serve._convertFilters = function( filters )
	{
		
		// configuration file is empty or does not
		if( !filters || !filters.length ) return null
		
		var cleanedFilters = []
					
		// turn filters into an array of [ pattern, value, type ] objects
		for( var i = 0; i < filters.length; ++i )
		{
				
			var filter 	= filters[ i ]
			
			if( !filter )
			{
				
				throw Error( 'error in configuration' )
			
			}
			
			var pattern = filter[ 0 ]
			var value 	= filter[ 1 ]
			
			if( !pattern || !value ) continue
			
			// turn pattern into a Pattern if it isn't already one
			if( isString( pattern ) )
			{
				
				pattern = new Pattern( pattern )
				
			}
			
			var type = f.serve.REDIRECT
			
			// use the set filter if there is one
			if( filter[ 2 ] )
			{
				
				type = filter[ 2 ]
				
			}
			
			cleanedFilters.push( {
				
				'pattern'	:pattern,
				'value'		:value,
				'type'		:type,
				
			} )
			
		}
		
		f.log( 'url filters are:', filters )
		
		return cleanedFilters
		
	}
					
	f.serve._doRunSite = function( file )
	{
		
		// add all info nodes
		var info = file.match( /<[m|i][a-z]+[ ]+name="([^"]+)"[ ]+[v|c][a-z]+="([^"]+)"[ ]+\/>/g ) || []
	
		var infoText = ''
			
		for( var i = 0; i < info.length; ++i ) 
		{
			
			var name 	= info[ i ].match( /name="([^"]+)/ )[ 1 ]
			var content = info[ i ].match( /[v|c][a-z]+="([^"]+)/ )[ 1 ]
			
			f.log( 'adding meta info "' + name + '" with "' + content + '"' )
			
			infoText += '<meta name="' + name + '" content="' + content + '" />' + "\n"	
		
		}
			
		window.document.write( infoText )
	
		// add all code nodes					
		var resources 	= file.match( /<c[a-z]+[ ]+[a-z]+="([^"]+)/g ) || []
		var code 		= file.match( /<code>([\s\S]*?)<\/code>/g ) || []
		
		if( !resources.length && !code.length )
		{
			
			return
			
		}
		
		// turn resources into the actual value
		for( var i = 0; i < resources.length; ++i ) 
		{
			
			resources[ i ] = resources[ i ].split( '"' )[ 1 ]
		
		}
		
		// turn code into the actual value
		for( var i = 0; i < code.length; ++i )
		{
			
			code[ i ] = code[ i ].substring( 8, code[ i ].length - 9 )
		
		}
		
		var resourceStr = ''
		
		f.log( 'adding resources:', resources )
	
		for( var i = 0; i < resources.length; ++i )
		{
		
			resourceStr += '<scr' + 'ipt src="' + resources[ i ] + '"></script>'
			
		}
		
		window.document.write( resourceStr )
		
		var onReady = function()
		{
			
			var codeStr = ''
		
			for( var i = 0; i < code.length; ++i )
			{
			
				codeStr += code[ i ]
				
			}
			
			f.log( 'running startup code' )
		
			System.addScript( codeStr )
		
		}
			
		if( document.readyState == 'complete' ) 
		{
			
			onReady()
			
		}
		else if( window.navigator.indexOf( 'MSIE' ) != -1 )
		{
			
			window.attachEvent( 'onload', onReady )
		
		}
		else
		{
			
			window.addEventListener( 'load', onReady )
		
		}
	
	}
	


f.batch = function( requests, onLoad, onProgress )
{
		
	if( !f.test.object( requests ) ) 
	{
		
		throw 'you must specify an object of requests to batch'
	
	}
	
	var hasProps = false
	
	for( var i in requests )
	{
		
		hasProps = true
		
		break
		
	}
	
	if( !hasProps )
	{
		
		throw 'your batch object was empty'
		
	}
	
	f.extend( this, f.listener )
	
	this._killed		= false
	this._calls			= []
	this._done			= false
	
	this.trip			= 0
	this.trips			= 0
	this.requests		= requests || null
	
	if( onLoad 		) this.listen( f.batch.event.LOAD, onLoad )
	if( onProgress  ) this.listen( f.batch.event.PROGRESS, onProgress )

}

	f.batch.event = {
		
		'LOAD'		:'load',
		'PROGRESS'	:'progress',
	}
	
	f.batch.prototype.cancel = f.batch.prototype.close = function()
	{
	
		this._killed = true
	
		for( var i in this.requests ) 
		{
			
			this.requests[ i ].cancel()
		
		}
		
	}
	
	f.batch.prototype.load = f.batch.prototype.open = function()
	{
		
		if( this._killed ) return
		
		// set all listeners and log the number of trips
		for( var i in this.requests ) this._setupRequest( this.requests[ i ], i )
		
		// now execute all loads
		for( var i in this.requests ) this.requests[ i ].load()
		
	}
	
	f.batch.prototype._setupRequest = function( request, key )
	{
		
		++this.trips
		
		var proxy = f.bind( function( e )
		{ 
		
			this._onRequestDone( key, e ) 
		
		}, this )
		
		request.listen( f.loader.event.LOAD, proxy )
		request.listen( f.loader.event.ERROR, proxy )
		
	}
	
	f.batch.prototype._onRequestDone = function( key, e )
	{
		
		if( this._killed ) return
		
		++this.trip
		
		this.percent = f.round( this.trip / this.trips, 2 )
		
		this.broadcast( f.batch.event.PROGRESS, { 'request':e.target, 'key':key } ) 
		
		if( this.trip == this.trips ) this._onAllRequestsLoaded()
		
	}
	
	f.batch.prototype._onAllRequestsLoaded = function()
	{
		
		if( this._killed ) return
		
		this.cancel()
		
		this.broadcast( f.batch.event.LOAD, this.requests )
		
	}