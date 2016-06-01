
+function ($) {
  'use strict';
  // CAROUSEL CLASS DEFINITION
  // =========================
  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')//白点标识
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null


  }

  Carousel.VERSION  = '3.3.5'

  Carousel.TRANSITION_DURATION = 500//默认

  Carousel.DEFAULTS = {//默认配置
    interval: 5000,//5秒切换
    pause: 'hover',//鼠标放上停止
    wrap: true,//开启循环
    keyboard: true//键盘事件开启
  }

  Carousel.prototype.cycle = function (e) {//循环
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')//获取轮播项集合
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active) //获取当前显示的元素索引值
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1)) //判断当前是否是处在第一个或最后一个元素
    if (willWrap && !this.options.wrap) return active // 当禁止循环时 且 当前事件是first->last ||last->first  则停留在first or last位置
    var delta = direction == 'prev' ? -1 : 1//是+1还是-1
    var itemIndex = (activeIndex + delta) % this.$items.length //取模运算  算法公式  ()
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }
  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }
  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }
  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')//当前焦点元素
    var $next     = next || this.getItemForDirection(type, $active)//获取移动地点
    var isCycling = this.interval//时间资源
    var direction = type == 'next' ? 'left' : 'right'//方向
    var that      = this//当前对象

    if ($next.hasClass('active')) return (this.sliding = false)//判断地点是否有active类

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {//注册一个新事件对象
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)//利用trigger触发这个事件
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

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)

      var data    = $this.data('bs.carousel')//undefined
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)

      var action  = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options))) //初次初始化
      if (typeof option == 'number') data.to(option)//点击白点时 option为数字 此处执行
      else if (action) data[action]() //原型链上//当不是last->first或first->last的中间操作 此处执行
      else if (options.interval) data.pause().cycle()//last->first或first->last操作

    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)//白点或left right事件再次通过
    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }
    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })
}(jQuery);
