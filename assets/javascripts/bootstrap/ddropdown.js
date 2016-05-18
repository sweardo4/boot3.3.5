// 效果1.点击出现下拉菜单
//效果2.下拉菜单出现 可以进行上下键选择

+ function($) {
  "use strict";
  var backdrop = '.dropdown-backdrop'
  var toggle = '[data-toggle="dropdown"]'
  var Dropdown = function(element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.5'

  function getParent($this) {
    var selector = $this.attr('data-target')
    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '')
    }
    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function() {
      var $this = $(this)
      var $parent = getParent($this)
      var relatedTarget = {
        relatedTarget: this
      }
      if (!$parent.hasClass('open')) return
      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }
  Dropdown.prototype.toggle = function(e) {
    var $this = $(this)

    if ($this.is('.disabled,:disabled')) return

    var $parent = getParent($this)
    var isActive = $parent.hasClass('open')
    clearMenus()
    if (!isActive) {

      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($this).on('click', clearMenus)
      }
      var relatedTarget = {
        relatedTarget: this
      }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $this.trigger('focus').attr('aria-expanded', 'true')
      $parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget)
    }
    return false
  }
  function Plugin(option){
    return this.each(function(){
      var $this = $(this)
      var data = $this.data('bs.dropdown')
      if(!data) $this.data('bs.dropdown',(data = new Dropdown(this)))
      if(typeof option == 'string') data[option].call($this)
    })
  }

  var old =$.fn.dropdown

  $.fn.dropdown = Plugin
  $.fn.dropdown.Constructor = Dropdown

  $.fn.dropdown.noConflict = function(){
    $.fn.dropdown = old
    return this
  }

  $(document).on('click.bs.dropdown.data-api',clearMenus)
  .on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle)
  .on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown)
  .on('keydown.bs.dropdown.data-api','.dropdown-menu',Dropdown.prototype.keydown)
}(jQuery)
