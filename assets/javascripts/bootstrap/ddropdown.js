+function($){
	"use strict";

	var backdrop = '.dropdown-backdrop'
	var toggle =  '[data-toggle = "dropdown"]'
	var Dropdown = function(element){
		$(element).on('click.bs.dropdown',this.toggle)
	}

	Dropdown.VERSION = '3.3.5'
	// function getParent($this){
	// 	var selector = $this.attr('data-target')
	// 	if(!selector){
	// 		selector = $this.attr('href')
	// 		selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/,'')
	// 	}
	// 	var $parent  =selector  && $(selector)
	// }
	/*
	注意事项:隐藏元素

	*/
	function getParent(el){
		//  $this === $($this)
		return $(el).parent()
	}

	function clearMenus(e){
		if(e && e.which === 3) return
		$(toggle).each(function(){
			var $this = $(this)
			var $parent = getParent($this)
			var relatedTarget =  {relatedTarget : this}
			if(!$parent.hasClass('open')) return
			if(e  && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0],e.target)) return
			$parent.trigger(e = $.Event('hide.bs.dropdown',relatedTarget))
			if(e.isDefaultPrevented()) return
			$this.attr('aria-expanded','false')
			$parent.removeClass('open').trigger('hidden.bs.dropdown',relatedTarget)

		})
	}

	Dropdown.prototype.toggle = function(e){
		var $this = $(this)
		if($this.is('.disabled,:disabled'))return //如果是隐藏元素 则不予以触发
		// 获取父元素
		var $parent = getParent($this);
		// console.log(parent)
		var isActive = $parent.hasClass('open')//确定是否已经开启列表
		clearMenus()
		if(!isActive){
			if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
				// if mobile we use a backdrop because click events don't delegate
				$(document.createElement('div'))
				.addClass('dropdown-backdrop')
				.insertAfter($(this))
				.on('click', clearMenus)
			}
			var relatedTarget = {relatedTarget :this}
			$parent.trigger(e = $.Event('show.bs.dropdown',relatedTarget))

			if(e.isDefaultPrevented()) return

			$this.trigger('focus').attr('aria-expanded','true')
			$parent.toggleClass('open').trigger('shown.bs.dropdown',relatedTarget)
			// console.log($this);
		}
		return false
	}


//jquery 插件扩展
	function Plugin(option){
		return this.each(function(){
			var $this = $(this)
			var data =$this.data('bs.dropdown')

			if(!data) $this.data('bs.dropdown',(data = new Dropdown(this)))
			if(typeof option == 'string') data[option].call($this)

		})
	}

	var old = $.fn.dropdown

	$.fn.dropdown = Plugin
	$.fn.dropdown.Constructor = Dropdown

	$.fn.dropdown.noConflice = function(){
		$.fn.dropdown  = old
		return this
	}

	$(document)
	.on('click.bs.dropdown.data-api',clearMenus)//点击
	.on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle)
	// .on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown)

}(jQuery)
