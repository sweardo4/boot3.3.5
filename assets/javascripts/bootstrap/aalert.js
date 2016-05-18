+function($){

  "use strict"
  var dismiss = '[data-dismiss="alert"]'

  var Alert = function(el){
    $(el).on('click',dismiss,this.close)
  }


  Alert.prototype.close = function(e){
    var $this = $(this);
    var selector = $this.attr('data-target')
    if (!selector) {//----------
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }
    var $parent = $(selector)
    if(e) e.preventDefault()
    if(!parent.length){
      $parent = this.closest('.alert');
    }
    $parent = $($parent);
    $parent.trigger(e = $.Event('close.bs.alert'))
    function removeElement(){
      $parent.detach().trigger('closed.bs.alert').remove()
    }
    removeElement();
  }

function Plugin(option){


}

  var old = $.fn.alert;

  $.fn.alert = Plugin
  $.fn.alert.Constructor = Alert

  $.fn.alert.noConflict = function(){
    $.fn.alert = old
    return this
  }

  $(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close);




}(jQuery)
