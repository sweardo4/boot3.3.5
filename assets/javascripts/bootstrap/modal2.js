! function($) {
    'use strict';
    //
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('my.loadmodal')
						var options = typeof option == 'object' && option

						if(!data) $this.data('my.loadmodal',(data = new LoadModal(this,options)))
						if(typeof option == 'string') data[option]()
        })
    }

		varn old = $.fn.loadmodal
		$.fn.loadmodal             = Plugin
	  $.fn.loadmodal.Constructor = LoadModal


		$.fn.loadmodal.noConflict = function () {
			$.fn.loadmodal = old
			return this
		}
    /**
     * 事件
     * 事件元素
     * callback
     */
		 $(window).on('load.my.loadmodal.data-api',function(){
			 $('[data-loadtoggle]').each(function(){
				 var $loadmodal = $(this)
				 Plugin.call($loadmodal,$loadmodal.data())
			 })
		 })
}(jQuery)
