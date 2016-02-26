/*! hbsRenderTmpl */
/* 
 * A jQuery plugin to help load and compile handlebar template
 *  
 * Options:
 * 	- tmpl (object):
 * 		- path (string)
 * 		- extn (string)
 * 		- name (string)
 * 		- data (object)
 */
(function ( $ ) {

	$.fn.hbsRenderTmpl = function ( options ) {							
		var defaults = {
			tmpl: {
				path: 'tmpl/',
				extn: '.handlebars',
				name: 'ProgressBar',
				data: null,
			}
		};
		
		var opts = $.extend(true, {}, defaults, options);
		
		var _self = this,
			path = opts.tmpl.path,
		    name = opts.tmpl.name,
			extn = opts.tmpl.extn,
			data = opts.tmpl.data;
			
		var methods = {				
			render: function() {
				var src = path + name + extn;

				//load template from source file
				$.get(src, function (response) {
					//compile the template
					var compiledTmpl = Handlebars.compile(response);
					
					//invoked the compiled template and pass it with data	
					_self.append(compiledTmpl(data));								
				});				
			}
		};
		
		methods.render.call(this);	
						
		return this;
	};
	
})( jQuery );