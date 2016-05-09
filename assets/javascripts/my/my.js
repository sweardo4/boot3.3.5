(function(){
	var container = document.getElementById('container');
	var list = document.getElementById('list');
	var imgs = list.getElementsByTagName('img');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var interval = 3000;
	var len = imgs.length;
	var index = 1;
	var animated =false;
	var timer;
	var lastImg = document.createElement('img');
	var firstImg = document.createElement('img');
	firstImg.src = imgs[len-1].src;
	list.insertBefore(firstImg, imgs[0]);
	lastImg.src = imgs[1].src;
	list.appendChild(lastImg);

	function animate(offset){
		if(offset == 0)
		{
			return;
		}
		animated = true;
		var time = 300;
		var interval = 50;
		var speed = offset/(time/interval);
		var left = parseInt(list.style.left ) + offset;
		var go = function(){
			if((speed >0 && parseInt(list.style.left) <left) || (speed < 0 && parseInt(list.style.left ) > left)){
					list.style.left = parseInt(list.style.left) + speed + 'px';
					setTimeout(go, interval);
			}
			else{
				list.style.left = left +'px';
				if(left >-200){
					list.style.left = -600*len + 'px';
				}
				if(left < (-600*len)){
					list.style.left = '-600px';
				}
				animated = false;
			}
		}
		go();
	 }

	 function showButton(){
		 for (var i = 0; i < buttons.length; i++) {
			 	if(buttons[i].className == 'on'){
				 buttons[i].className = '';
				 break;
			 }
		 }
		 buttons[index - 1].className='on';
	 }


	function play(){
		timer = setTimeout(function(){
			next.onclick();
			play();
		},interval);
	}
	function stop(){
		clearTimeout(timer);
	}
	prev.onclick = function(){
		if(animated){
			return;
		}
		if(index == 1){
			index=5;
		}
		else{
			index -=1;
		}
		animate(600);
		showButton();
	}
	next.onclick = function(){
		if(animated){
			return;
		}
		if(index == 5)
		{
			index = 1
		}
		else{
			index +=1;
		}
		animate(-600);
		showButton();
	}

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function(){
			if(animated){
				return;
			}
			if(this.className == 'on'){
				return;
			}
			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -600 * (myIndex - index);
			animate(offset);
			index = myIndex;
			showButton();
		}
	}

	container.onmouseover = stop;
	container.onmouseout = play;
	play();
})();
