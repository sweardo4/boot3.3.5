/**
 * Created by cui on 16-4-30.
 */
+function ($) {
    'use strict'
    var dismiss = '[data-dismiss="alert"]'
    var Alert = function(el){
        $(el).on('click',dismiss,this.close)
    }
    
    Alert.prototype.close = function(e){
        var $this = $(this)
        var selector = $this.attr('data-target')
        
        if(!selector){
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/,'')
        }
        if(e) e.preventDefault()
     
        var $parent =$(selector)
        $parent.trigger(e = $.Event('close.bs.alert'))
           
        if (!$parent.length) {
            $parent = $this.closest('.alert')//closest jquery查找方法  从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素
        }
        
        $parent.removeClass('in')
        function removeElement(){
            $parent.detach().trigger('closed.bs.alert').remove()
        }
        $.support.transition && $parent.hasClass('fade')?
            $parent.one('bsTransitionEnd',removeElement)
            .emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement()
    }
    
    function Plugin(option){
        return this.each(function(){
            var $this =$(this)
            var data = $this.data('bs.alert')
            if(!data)$this.data('bs.alert',(data = new Alert(this)))
            if(typeof option == 'string') data[option].call(this) 
        })
        
    }
    $.fn.alert    = Plugin
    $.fn.alert.constructor = Alert
    // $(dismiss)
    $(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)

}(jQuery)