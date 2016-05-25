+function($){

	'use strict';
	var Carousel = function(element,options){

	}

	Carousel.VERSION = '3.3.5';
	Carousel.TRANSITION_DURATION = 500;

	Carousel.DEFAULTS = {
		interval: 5000,
		pause: 'hover',
		wrap: true,
		keyboard:true,
	}

	function Plugin(option){
		return this.each(function(){
			var $this  =$(this)
			var data = this.data('bs.carousel')
			var options = $.extend({},Carousel.DEFAULTS,$this.data(),typeof option == 'object' && option)

			var action =typeof option == 'string'?option:options.slide
			if(!data) $this.data('bs.carousel',(data = new Carousel(this,options)))
			if(typeof option == 'number') data.to(option)
			else if(action)data[action]()
			else if(options.interval) data.pause().cycle()
		})
	}

	var old = $.fn.carousel

	$.fn.carousel    = Plugin
	$.fn.carousel.Constructor = Carousel
	$.fn.carousel.noConflict = function(){
		$.fn.carousel = old
		return this
	}

var clickHandler = function(e){
	var href = null
	var $this = $(this)
	var $target = $(this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/,''))
	if(!$target.hasClass('carousel')) return
	var options = $.extend({},$target.data(),$this.data())
	var slideIndex = $this.attr('data-slide-to')
	if(slideIndex) options.interval = false
	Plugin.call($target,options)
	if(slideIndex){
		$target.data('bs.carousel').to(slideIndex)
	}
	e.preventDefault()

}
//白点

$(document)
	.on('click.bs.carousel.data-api','[data-slide]',clickHandler)
	.on('click.bs.carousel.data-api','[data-slide-to]',cliclickHandler)

	$(window).on('load',function(){

		$('[data-ride = "carousel"]').each(function(){
			var $carousel = $(this)
			Plugin.call($carousel,$carousel.data())
		})
	})


}(jQuery)
