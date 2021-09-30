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
/*
* this function gets called every frame,
* should handle all data manipulation, like the "model"
*/
	// console.log(secondsPassed);
	// console.log(playerModel.posX);
	timePassed += secondsPassed;
	let speedX = 0;
	let speedY = 0;
	if (keys.ArrowLeft) speedX -= movingSpeed;
	if (keys.ArrowRight) speedX += movingSpeed;
	
	if (keys.ArrowUp) speedY -= movingSpeed;
	if (keys.ArrowDown) speedY += movingSpeed;

	playerModel.speedX = speedX;
	playerModel.speedY = speedY;
	// console.log(speedX);
	playerModel.posX += speedX * secondsPassed;
	
	// playerModel.posY += speedY * secondsPassed;

	let gravity = 9.81;
	if (keys.ArrowUp) playerModel.speedY = 30;

	if (playerModel.posY < 300) {
		playerModel.posY = playerModel.speedY * secondsPassed;
	} else if (keys.ArrowUp && playerModel.speedY > 0) {
		playerModel.posY += playerModel.speedY * secondsPassed;
		playerModel.speedY += -1;
	} else {
		playerModel.speedY = 0;
		playerModel.posY += gravity * secondsPassed;
	}

	// playerModel.posY = speedY * secondsPassed;
}
