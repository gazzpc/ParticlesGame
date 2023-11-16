window.onload = windowOnLoad;

var t, st;
var pts = [];

function windowOnLoad(){
	
	t = 0;
	st = 0;
	pts[0] = new particula();
	
	requestAnimationFrame(buclePrincipal);
}

function buclePrincipal(){
	//pts[pts.length] = new particula();
	//console.log(pts.length);
	t++;
	if(t >= 120){
		t = 0;
		pts[pts.length] = new particula();
	}
	
	st++;
	if(st >= 200){
		st = 0;
		pts[pts.length] = new superParticula();
	}
  
	for (var i = pts.length - 1; i >= 0; i--){
		pts[i].mover();
	}
	
	requestAnimationFrame(buclePrincipal);
}



//Particula

function particula(){
	var yo = this;
	
	yo.vx = Math.round((Math.random() * 2) - 1);
  yo.vx =  yo.vx ? yo.vx:-1;
  
	yo.vy = Math.round((Math.random() * 2) - 1);
  yo.vy =  yo.vy ? yo.vy:-1;
  
  yo.cuenta = 1 + Math.round(Math.random() * 3);
	
	yo.div = document.createElement("div");
  yo.div.innerHTML = yo.cuenta;
	yo.div.className = "particula";
	yo.div.style.top = Math.random() * ( window.innerHeight / 2) + "px";
	yo.div.style.left = Math.random() * ( window.innerWidth / 2) + "px";
	
	//console.log( yo.div.offsetTop);
  yo.div.onclick = function(){
    yo.cuenta--;
    //console.log(yo.cuenta);
    yo.div.innerHTML = yo.cuenta;
    if(yo.cuenta == 0){
      document.body.removeChild(yo.div);
    }
  }
	
	document.body.appendChild(yo.div);
  
	yo.mover = function(){
		
		//console.log(yo.div.style.top);
		
		if(yo.div.offsetTop <= 0 ) yo.vy *= -1;
		if(yo.div.offsetLeft <= 0 ) yo.vx *= -1;
		
		if(yo.div.offsetTop + yo.div.offsetHeight >= window.innerHeight ) yo.vy *= -1;
		if(yo.div.offsetLeft + yo.div.offsetWidth >= window.innerWidth ) yo.vx *= -1;
		
		yo.div.style.top = (yo.div.offsetTop + yo.vy) + "px";
		yo.div.style.left = (yo.div.offsetLeft + yo.vx) + "px";
		
	}
}

function superParticula(){
  yo = this;
  particula.call(yo);
  yo.div.className = "superParticula";
   yo.cuenta = 4 + Math.round(Math.random() * 2);
  yo.vx *= 2;
  yo.vy *= 2;
  yo.div.innerHTML = yo.cuenta;
}

superParticula.prototype = new particula();

(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();