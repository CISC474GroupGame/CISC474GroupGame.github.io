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


	playerModel.volX = volX;
	// playerModel.speedY = speedY;
	// console.log(volX);
	playerModel.posX += volX * secondsPassed;	

	let gravity =500; // positive is down, and negative is up; to jump up a negaitive volY is needed
	if (keys.ArrowUp && playerModel.volY > 0 && !(playerModel.posY + playerModel.volY * secondsPassed<520)){ 
		playerModel.volY = -200;
	}
	playerModel.volY += secondsPassed * gravity;
	if(playerModel.posY + playerModel.volY * secondsPassed < 520){
		playerModel.posY += playerModel.volY * secondsPassed;
	}
}
