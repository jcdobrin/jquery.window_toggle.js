/*
 *
 */
(function( $ )
{
	$.fn.toggleWindow = function( options , event, callback) {
	// Create some defaults, extending them with any options that were provided
	var settings = $.extend( {
	'time'		: 300,
	'coordinates' : {'x':event.pageX, 'y':event.pageY},
	close:function(){},
	open:function(){}
	}, options);
		return this.each(function() {
		if(typeof $.fx.step.transform != 'undefined') {
			object = $(this);
			var toggle;
			//close
			var cloned = $(this).clone(true);
			if(object.is(":visible"))
			{
				var start_pos_x = object.offset().left;
				var start_pos_y = object.offset().top;
				var end_pos_x = settings['coordinates']['x']// - $(window).scrollLeft() ;
				var end_pos_y = settings['coordinates']['y'];// - $(window).scrollTop() ;

				var width = object.width();
				var height = object.height();
				var start_transform = 'scale(1,1)';
				var end_transform = 'scale(0.1,0.1)';

				toggle = 'hide';
				settings.close();
			}
			//open
			else
			{
				object.show();
				var end_pos_x = object.offset().left;
				var end_pos_y = object.offset().top;
				var start_pos_x = settings['coordinates']['x'];
				var start_pos_y = settings['coordinates']['y'];

				var width = object.width();
				var height = object.height();
				var start_transform = 'scale(0.1,0.1)';
				var end_transform = 'scale(1,1)';
				toggle = 'show';
				settings.open();
			}
			object.css(
			{
			'position':'fixed',
			'left': start_pos_x,
			'top': start_pos_y,
			'overflow':'hidden',
			'width':width,
			'height':height,
			transform:start_transform,
			'transform-origin':'0 0',
			'right':'', //used so that if the element has right it is ignored
			'bottom':'', //used so that if the element has right it is ignored
			'min-width':0,
			'min-height':0,
			display:'block'
			});

			object.animate(
			{
				left: end_pos_x,
				top: end_pos_y,
				transform:end_transform
			}
			,settings['time']
			,function() {
				object.removeAttr('style');
				object.attr('style', cloned.attr('style'));

				if(toggle == 'show')
					object.show();
				else
					object.hide();
				if(callback != undefined)
					callback();
			});
		}
		else {
			object = $(this);
			var toggle;
			//close
			var cloned = $(this).clone(true);
			if(object.is(":visible"))
			{
				var start_pos_x = object.offset().left;
				var start_pos_y = object.offset().top;
				var end_pos_x = settings['coordinates']['x']// - $(window).scrollLeft() ;
				var end_pos_y = settings['coordinates']['y'];// - $(window).scrollTop() ;

				var start_width = object.width();
				var start_height = object.height();
				var end_width = 10;
				var end_height = 10;
				toggle = 'hide';
				settings.close();
			}
			//open
			else
			{
				object.show();
				var end_pos_x = object.offset().left;
				var end_pos_y = object.offset().top;
				var start_pos_x = settings['coordinates']['x'];
				var start_pos_y = settings['coordinates']['y'];

				var end_width = object.width();
				var end_height = object.height();
				var start_width = 0;
				var start_height = 0;
				toggle = 'show';
				settings.open();
			}
			object.css(
			{
			'position':'fixed',
			'left': start_pos_x,
			'top': start_pos_y,
			'overflow':'hidden',
			'width':start_width,
			'height':start_height,
			'right':'', //used so that if the element has right it is ignored
			'bottom':'', //used so that if the element has right it is ignored
			'min-width':0,
			'min-height':0
			});

			object.animate(
			{
				left: end_pos_x,
				top: end_pos_y,
				width:end_width,
				height:end_height
			}
			,settings['time']
			,function(){
				object.removeAttr('style');
				object.attr('style', cloned.attr('style'));

				if(toggle == 'show')
					object.show();
				else
					object.hide();
				if(callback != undefined)
					callback();
			}
			);
		}
	});
	}
})( jQuery );
