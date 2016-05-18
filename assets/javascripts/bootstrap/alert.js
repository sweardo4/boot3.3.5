/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

//$防止全局污染
+function ($) {//写入+的目的，是防止不规范代码，通常是遗漏了分号，导致编译器认为前后是一体的从而导致出错。
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  // 获取元素
  var dismiss = '[data-dismiss="alert"]'

  // 定义Alert
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.5'

  Alert.TRANSITION_DURATION = 15000//转换时间

  Alert.prototype.close = function (e) {

    var $this    = $(this)
    var selector = $this.attr('data-target')
    //if 属性data-target存在  则不执行if  如果data-target 不存在则在href中取
    if (!selector) {//----------
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }
    // 根据上面取得的选择器取得对应的jquery对象
    var $parent = $(selector)
    //阻止click的默认事件
    if (e) e.preventDefault()//submit表单  a标签 ---------

    //如果上面没能取到有效的元素，则选择第一个class含alert的祖先
    if (!$parent.length) {
      $parent = $this.closest('.alert')//closest jquery查找方法  从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素
    }
    // 新建一个'close.bs.alert'事件，并用该事件触发上面所选到的jquery对象 当调用 close 实例方法时立即触发该事件。
    $parent.trigger(e = $.Event('close.bs.alert'))
    // 如果开发者利用preventDefault阻止了该事件的默认方法则return结束，否则继续执行
   // 注意：此处的e是新建的'close.bs.alert'事件，与上面被阻止默认的click事件无关
    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')



    function removeElement() {//detach 从DOM中删除所有匹配的元素。
      // detach from parent, fire event then clean up data
      // 	当警告框被关闭时触发该事件（将等待 CSS 过渡效果完成）。
      $parent.detach().trigger('closed.bs.alert').remove()
    }


    // fate 和in class 是关闭时的动画效果css类
    $.support.transition && $parent.hasClass('fade') ?
      $parent.one('bsTransitionEnd', removeElement)
          .emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')
      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert// 把命名空间里的原有的alert放入old


  $.fn.alert             = Plugin  // 添加到jquery插件  直接这样使用$(selector).alert('')
  $.fn.alert.Constructor = Alert//重新设置插件的构造函数


  // ALERT NO CONFLICT
  // =================
  // 防止冲突处理
  $.fn.alert.noConflict = function () {//如果想使用原来的alert  只需执行一下$.fn.alert.noConflict()就可以了
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  //  事件委托   触发dismiss时  关闭此元素

  // 给click事件赋予命名空间click.bs.alert.data-api， 当删除指定事件时 只会删除这个命名空间下的这个  而不会删除其他事件
  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
