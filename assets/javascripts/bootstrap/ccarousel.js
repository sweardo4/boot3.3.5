/**
 * Created by cui on 16-4-29.
 */

+function($){
    'use strict';
    var Carousel = function(element,options){
        
        this.$element = $(element)
        this.options = options
        this.interval = null
        this.paused = null
        this.sliding = null
        this.$active = null
        this.$items = null
    }
    Carousel.DEFAULTS = {
        interval :5000,
        paused : 'hover',
        wrap : false,
        keyboard : false
    }

    Carousel.prototype.cycle = function (e) {//循环
        e || (this.paused = false)

        this.interval && clearInterval(this.interval)

        this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

        return this
    }
    
    Carousel.prototype.pause = function (e) {//暂停
        e || (this.paused = true)

        if (this.$element.find('.next, .prev').length && $.support.transition) {
            this.$element.trigger($.support.transition.end)
            this.cycle(true)
        }

        this.interval = clearInterval(this.interval)

        return this
    }
    
    Carousel.prototype.slide = function (type, next) {
        var $active   = this.$element.find('.item.active')//当前焦点元素
        var $next     = next || this.getItemForDirection(type, $active)
        var isCycling = this.interval//时间资源
        var direction = type == 'next' ? 'left' : 'right'
        var that      = this

        if ($next.hasClass('active')) return (this.sliding = false)

        var relatedTarget = $next[0]
        var slideEvent = $.Event('slide.bs.carousel', {
            relatedTarget: relatedTarget,
            direction: direction
        })
        this.$element.trigger(slideEvent)
        if (slideEvent.isDefaultPrevented()) return

        this.sliding = true

        isCycling && this.pause()

        if (this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active')
            var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
            $nextIndicator && $nextIndicator.addClass('active')
        }

        var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
        if ($.support.transition && this.$element.hasClass('slide')) {
            $next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            $active
                .one('bsTransitionEnd', function () {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' '))
                    that.sliding = false
                    setTimeout(function () {
                        that.$element.trigger(slidEvent)
                    }, 0)
                })
                .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
        } else {
            $active.removeClass('active')
            $next.addClass('active')
            this.sliding = false
            this.$element.trigger(slidEvent)
        }

        isCycling && this.cycle()

        return this
    }
    
    function Plugin(option){
        return this.each(function(){
            var $this = $(this)
            var data = $this.data('bs.carousel')
            var options = $.Event({},Carousel.DEFAULTS,$this.data(),typeof option == 'object'&&option)
            var action = typeof option == 'string' ? option : options.slide
            if(!data) $this.data('bs.carousel',(data = new Carousel(this,options)))
            if(typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()
        })
    }
    
    $(window).on('load',function(){
        $('[data-ride="carousel"]').each(function(){
            var $carousel = $(this)
            Plugin.call($carousel,$carousel.data())
        })
    })
}(jQuery)