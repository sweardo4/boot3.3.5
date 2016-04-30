/**
 * Created by cui on 16-4-29.
 */

+function($){
    'use strict';
    var Carousel = function(element,options){

        this.$element = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options = options
        this.interval = null
        this.$items = null
    }
    Carousel.DEFAULTS ={
        interval:2000,
    }

    Carousel.prototype.next = function(){
        return this.slide('next')
    }
    Carousel.prototype.prev = function(){
        return this.slide('prev')
    }
    Carousel.prototype.slide = function(type,next){
        var $active = this.$element.find('.item.active')
        var $next = next || this.getItemForDirection(type,$active)
        var direction = type == 'next' ? 'left':'right'
        vat that = this
        if($next.hasClass('active'))return (this.sliding = false)
        var relateTarget = $next[0]
        var slideEvent = $.Event('slide.bs.carousel',{
            relatedTarget : relateTarget,
            direction:direction
        })
        this.$element.trigger(slideEvent)
        if(slideEvent.isDefaultPrevented()) return
        this.sliding = true
        isCycling && this.pause()
        


    }


}(jQuery)