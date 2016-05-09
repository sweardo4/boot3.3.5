window.onload = function () {
  var container = document.getElementById('container');
  var list = document.getElementById('list');
  var imgs = list.getElementsByTagName('img');
  var buttons = document.getElementById('buttons').getElementsByTagName('span');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var index = 1;
  var len = imgs.length;
  var animated = false;
  var interval = 3000;
  var timer;
  var lastImg = document.createElement('img');
  var firstImg = document.createElement('img');
  firstImg.src = imgs[len-1].src;
  list.insertBefore(firstImg, imgs[0]);
  lastImg.src = imgs[1].src;
  list.appendChild(lastImg);
  // 封装点击箭头时两向滑动的函数；
  function animate (offset) {
    if (offset == 0) {
      return;
    }
    animated = true;
    // 位移持续时间；
    var time = 300;
    // 位移间隔时间；
    var inteval = 50;
    // 每次位移量；
    var speed = offset/(time/inteval);
    var left = parseInt(list.style.left) + offset;
    var go = function (){
      // 判断是否需要作位移；
      if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
        list.style.left = parseInt(list.style.left) + speed + 'px';
        // 递归自身以实现位移动画；
        setTimeout(go, inteval);
      }
      else {
        list.style.left = left + 'px';
        // 判断是否在1或5，超出时归位重置；
        if(left>-200){
          list.style.left = -600 * len + 'px';
        }
        if(left<(-600 * len)) {
          list.style.left = '-600px';
        }
        animated = false;
      }
    }
    go();
  }
  // 小圆点切换功能函数；
  function showButton() {
    // 重置所有按钮；
    for (var i = 0; i < buttons.length ; i++) {
      if( buttons[i].className == 'on'){
        buttons[i].className = '';
        break;
      }
    }
    buttons[index - 1].className = 'on';
  }
  // 自动播放函数；
  function play() {
    timer = setTimeout(function () {
      next.onclick();
      play();
    }, interval);
  }
  // 停止自动播放函数；
  function stop() {
    clearTimeout(timer);
  }
  // 右箭头点击切换事件；
  next.onclick = function () {

    if (animated) {
      return;
    }
    // 同步小圆点的index；
    if (index == 5) {
      index = 1;
    }
    else {
      index += 1;
    }
    animate(-600);
    showButton();


  }
  // 左箭头点击切换事件；
  prev.onclick = function () {
    if (animated) {
      return;
    }
    // 同步小圆点的index；
    if (index == 1) {
      index = 5;
    }
    else {
      index -= 1;
    }
    animate(600);
    showButton();
  }
  // 单击小圆点切换事件；
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      // 停留当前图片时重复点击不刷新；
      if (animated) {
        return;
      }
      if(this.className == 'on') {
        return;
      }
      var myIndex = parseInt(this.getAttribute('index'));
      var offset = -600 * (myIndex - index);
      animate(offset);
      // 更新index值；
      index = myIndex;
      showButton();
    }
  }
  container.onmouseover = stop;
  container.onmouseout = play;
  play();
}
