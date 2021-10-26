//global attributes -- maybe this file should be a class??
let canvas;
let context;
let currentLevel;
let playerModel;
let gameObjects;

let init = function () {
	canvas = document.getElementById("gameCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = gameCanvas.getContext("2d");
	currentLevel = new levelOne(canvas, context);
    playerModel = currentLevel.levelData.playerModel;
	gameObjects = currentLevel.levelData.allGameObjects;
	window.requestAnimationFrame(gameLoop);
}

window.onload = init;

let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 300;
let timePassed = 0;

let gameLoop = function (timestamp) {
	secondsPassed = (timestamp - oldTimeStamp) / 1000;
	oldTimeStamp = timestamp;

	for(let i = 0; i < gameObjects.length; i++){
		gameObjects[i].update(secondsPassed, arrowKeys);
	}

	context.clearRect(0, 0, canvas.width, canvas.height);

	for(let i = 0; i < gameObjects.length; i++){
		gameObjects[i].draw();
	}

	// playerModel.update(secondsPassed);
	// context.clearRect(0, 0, canvas.width, canvas.height);
	// playerModel.draw();
	// update(secondsPassed, arrowKeys);
	// draw();
	window.requestAnimationFrame(gameLoop);
}

let draw = function () {
	// playerAvatar.style.left = playerModel.posX + "px";
	// playerAvatar.style.top = playerModel.posY + "px";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ff0000';
    console.log(playerModel.y)
    context.fillRect(playerModel.x, playerModel.y, playerModel.width, playerModel.height);
}

let update = function (secondsPassed, keys) {
    let vx = 0;
    let vy = 0;
	if (keys.ArrowLeft) {
        console.log("left key pressed")
		vx -= movingSpeed;
		// playerAvatar.style.transform = 'scaleX(-1)';
	}
	if (keys.ArrowRight) {
        console.log("right key pressed")
		vx += movingSpeed;
		// playerAvatar.style.transform = 'scaleX(1)';
	}
    // if (keys.ArrowUp) {
    //     console.log("up key pressed")
    //     // playerModel.y -= 1
    //     vy -= movingSpeed;
    // }
    // if (keys.ArrowDown) {
    //     console.log("down key pressed")
    //     // vy += movingSpeed;
    //     // playerModel.y += 1
    // }
    playerModel.vx = vx;
    playerModel.x += vx * secondsPassed;
    // playerModel.vy = vy;
    // playerModel.y = vy * secondsPassed;
    let gravity = 2000;
    if (keys.ArrowUp && playerModel.volY >= 0 && playerModel.isColliding) {
		playerModel.volY = -800;
		playerModel.isColliding = false;
	}
    if (!playerModel.isColliding) {
		playerModel.volY += secondsPassed * gravity;
		playerModel.posY += playerModel.volY * secondsPassed;
	}else{
		playerModel.volY=0;
	}
}

let trackKeys = function(keys){
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