+function($){

  "use strict";
  var dismiss = '[data-dismiss="alert"]';
  var Alert = function(el){
    $(el).on('click',dismiss,this.close);
  }
  Alert.prototype.close = function(e){
    var $this = $(this);
    var $parent =$this.closest('.alert');
    function removeElement(){
        $parent.detach().remove();
    }
    console.log($parent);
    removeElement();
  }

  function Plugin(option){
      return this.each(function(){
        var $this = $(this)
        var data = $this.data('bs.alert');
        if(!data) $this.data('bs.alert',(data = new Alert(this)))
        if(typeof option == 'string') data[option].call($this) 
      })
  }
  var old = $.fn.alert;

  $.fn.alert = Plugin
  $.fn.alert.Constructor = Alert

  $.fn.alert.noConflict = function(){
    $.fn.alert = old;
    return this
  }

  $(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close);

}(jQuery)
