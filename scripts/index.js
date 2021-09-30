$(document).ready(function () {

	let gameCanvas = document.getElementById("gameCanvas");
	let playerAvatar = document.getElementById("playerAvatar");
	let width;
	let height;

	let resize = function () {
		width = window.innerWidth * 2;
		height = window.innerHeight * 2;
		gameCanvas.style.width = width + "px";
		gameCanvas.style.height = height + "px";
	}
	// window.onresize = resize;
	// resize();

	function update(progress) {
		//update the state of the world for the elapsed time since the last render
	}

	function draw() {
		//draw the state of the world
		playerAvatar.style.width = '50px';
		playerAvatar.style.height = '50px';
		playerAvatar.style.left = player.posX;
		playerAvatar.style.top = player.posY;
	}

	function loop(timestamp) {
		let progress = timestamp - lastrender;
		update(progress);
		draw();
		lastrender = timestamp;
		window.requestAnimationFrame(loop);
	}

	let lastrender = 0;
	window.requestAnimationFrame(loop);
})

let gameCanvas;
let playerAvatar;

class Player {
	constructor(height, width, posX, posY, volX, volY) {
		this.height = height;
		this.width = width;
		this.posX = posX;
		this.posY = posY;
		this.volX = volX;
		this.volY = volY;
	}
}

let init = function () {
	gameCanvas = document.getElementById("gameCanvas");
	playerAvatar = document.getElementById("playerAvatar");

	window.requestAnimationFrame(gameLoop);
}

window.onload = init;

let player = new Player(50, 50, 0, 500, 0, 0);

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
	secondsPassed = (timestamp - oldTimeStamp) / 1000;
	oldTimeStamp = timestamp;

	update(secondsPassed, arrowKeys);
	draw();
	window.requestAnimationFrame(gameLoop);
}

let draw = function () {
	playerAvatar.style.left = player.posX + "px";
	playerAvatar.style.top = player.posY + "px";
}

let update = function (secondsPassed, keys) {
	let volX = 0;
	if (keys.ArrowLeft) volX -= movingSpeed;
	if (keys.ArrowRight) volX += movingSpeed;


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

	// player.posY = speedY * secondsPassed;
}
