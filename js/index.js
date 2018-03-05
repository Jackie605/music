var musicIndex = 0;
var audio = new Audio();
var list;
audio.autoplay = true;
var li;
var clock;

function $(ele){
	return document.querySelector(ele);
}

function getMusicList(callback){
var xhr = new XMLHttpRequest();
xhr.open('GET',' https://www.easy-mock.com/mock/5a93ebb106687f4fd057da61',true);
xhr.send();
xhr.onload = function(){
	if((xhr.status >=200 && xhr.status<300) || (xhr.status === 304)){
    list = JSON.parse(this.responseText);
    callback(list);
}
};
}
function loadMusic(address){
	$('.title').innerText = address.title;
	$('.author').innerText = address.author;
	$('.cover').style.backgroundImage = "url('"+address.picture+"')";
	audio.src = address.src;
}
getMusicList(function(data){
	loadMusic(data[musicIndex]);
});
$('.play').onclick = function(){
	if(this.classList.contains('icon-pause')){
	audio.pause();
	this.classList.remove('icon-pause');
	this.classList.add('icon-play');
}else {
	audio.play();
	this.classList.remove('icon-play');
	this.classList.add('icon-pause');
}
};
audio.ontimeupdate = function(){
	$('.progress-bar').style.width = audio.currentTime/audio.duration*100 + '%';
	if(audio.currentTime === audio.duration){
		++musicIndex;
	loadMusic(list[musicIndex]);
	}
};
$('.icon-next').onclick = function(){
	
};
getMusicList(function(data){
	data.forEach(function(item,index,array){
		var li = document.createElement('li');
		li.innerHTML = item.author + "-" + item.title;
		$('ul').appendChild(li);
		li.onclick = function(){
			musicIndex = index;
			getMusicList(function(data){
	         loadMusic(data[musicIndex]);
		    });
		   this.classList.add('cursor');
		};
	});
	li = document.querySelectorAll('li')
	li[0].classList.add('cursor')
});
function removePlay(){
	if($('.play').classList.contains('icon-play')){
	audio.pause();
	$('.play').classList.remove('icon-play');
	$('.play').classList.add('icon-pause');
}
}
$('.icon-next').onclick = function(){
	removePlay();
	musicIndex = (++musicIndex%list.length);
	loadMusic(list[musicIndex]);
	addCursor();

};
$('.icon-previous').onclick = function(){
	removePlay();
	musicIndex = ((--musicIndex+list.length)%list.length);
	loadMusic(list[musicIndex]);
	addCursor();
};
$('.progress').onclick = function(e){
};
audio.onplay = function(){
	removePlay();
	
	clock = setInterval(function(){
	var min = Math.floor(audio.currentTime/60);
	var sec = Math.floor(audio.currentTime%60);
	sec= sec<10?"0"+sec:sec;
	$('.time').innerText = min + ":" + sec;
},1000);
};
audio.onpause = ()=>clearInterval(clock);
$('.progress').onclick = function(e){
	console.log(e.target);
	audio.currentTime = audio.duration*(e.offsetX/360);
};
$('.icon-volume').onclick = function(){
	if($('.vol').style.display ==="block"){
		$('.vol').style.display = "none";
	$('.vol-bar').style.display = "none";
	}else {
	$('.vol').style.display = "block";
	$('.vol-bar').style.display = "block";
}
};
$('.vol').addEventListener("click",vol,true);
 function vol(e){
<<<<<<< HEAD:js/index.js
 	console.log(e.target)
=======
	console.log(e.target);
>>>>>>> 71c64d6138c7671938b66d063517ad9eb8ebebed:js/index.js
	audio.volume = (115-e.offsetY)/115;
	var height = 115 - e.offsetY;
	$('.vol-bar').style.height = height + 'px';
}
function addCursor(){
	for(var i = 0; i < li.length;i++){
		if(li[i].classList.contains('cursor')){
			li[i].classList.remove('cursor');
		}
	}
	li[musicIndex].classList.add('cursor');
<<<<<<< HEAD:js/index.js
}
=======
}
>>>>>>> 71c64d6138c7671938b66d063517ad9eb8ebebed:js/index.js
