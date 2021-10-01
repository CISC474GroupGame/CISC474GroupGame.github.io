let gameCanvas;
let playerAvatar;
let playerModel;

let init = function () {
	playerModel = loadLevelOne();
	gameCanvas = document.getElementById("gameCanvas");
	playerAvatar = document.getElementById("playerAvatar");
	window.requestAnimationFrame(gameLoop);
}

window.onload = init;

let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 100;
let timePassed = 0;

function trackKeys(keys) {
	let down = Object.create(null);
	function track(event) {
		if (keys.includes(event.key)) {
			down[event.key] = event.type == "keydown";
			event.preventDefault();
		}
	}
	window.addEventListener("keydown", track);
	window.addEventListener("keyup", track);
	return down;
}
let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);

let gameLoop = function (timestamp) {
/*
* this function manages the frames and all timing
* like the "controller"
*/
	secondsPassed = (timestamp - oldTimeStamp) / 1000;
	oldTimeStamp = timestamp;

	update(secondsPassed, arrowKeys);
	draw();
	window.requestAnimationFrame(gameLoop);
}

let draw = function () {
/*
* this function is called each frame,
* should handle all visual rendering, like the "view"
*/
	playerAvatar.style.left = playerModel.posX + "px";
	playerAvatar.style.top = playerModel.posY + "px";
}

let update = function (secondsPassed, keys) {
	let volX = 0;
	if (keys.ArrowLeft){
		volX -= movingSpeed;
		// playerAvatar.style.webkit.transform = 'scaleX(-1)';
		playerAvatar.style.transform = 'scaleX(-1)';
	} 
	if (keys.ArrowRight) {
		volX += movingSpeed;
		// playerAvatar.style.webkit.transform = 'scaleX(1)';
		playerAvatar.style.transform = 'scaleX(1)';
	} 


	player.volX = volX;
	// player.speedY = speedY;
	// console.log(volX);
	player.posX += volX * secondsPassed;	

	let gravity =500; // positive is down, and negative is up; to jump up a negaitive volY is needed
	if (keys.ArrowUp && player.volY > 0 && !(player.posY + player.volY * secondsPassed<520)){ 
		player.volY = -200;
	}
	player.volY += secondsPassed * gravity;
	if(player.posY + player.volY * secondsPassed < 520){
		player.posY += player.volY * secondsPassed;
	}
}
