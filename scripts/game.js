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

	detectCollision()

	// playerModel.update(secondsPassed);
	// context.clearRect(0, 0, canvas.width, canvas.height);
	// playerModel.draw();
	// update(secondsPassed, arrowKeys);
	// draw();
	window.requestAnimationFrame(gameLoop);
}

let rectIntersect = function(x1, y1, w1, h1, x2, y2, w2, h2){
	if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }
    return true;
}

let detectCollision = function(){
	let obj1;
	let obj2;

	//Reset collision state on all objects
	for(let i = 0; i < gameObjects.length; i++){
		gameObjects[i].isColliding = false;
	}

	//Check for collisions
	for(let i = 0; i < gameObjects.length; i++){
		obj1 = gameObjects[i];
		for(let j = i + 1; j < gameObjects.length; j++){
			obj2 = gameObjects[j];

			let vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
			let distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
			let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
			let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
			let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
			if (speed < 0){
				break;
			}
			obj1.vx -= (speed * vCollisionNorm.x);
			obj1.vy -= (speed * vCollisionNorm.y);
			obj2.vx += (speed * vCollisionNorm.x);
			obj2.vy += (speed * vCollisionNorm.y);

			// if(rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
			// 	obj1.isColliding = true;
			// 	obj2.isColliding = true;
			// }
		}
	}
	
}

// let draw = function () {
// 	// playerAvatar.style.left = playerModel.posX + "px";
// 	// playerAvatar.style.top = playerModel.posY + "px";
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.fillStyle = '#ff0000';
//     console.log(playerModel.y)
//     context.fillRect(playerModel.x, playerModel.y, playerModel.width, playerModel.height);
// }

// let update = function (secondsPassed, keys) {
//     let vx = 0;
//     let vy = 0;
// 	if (keys.ArrowLeft) {
//         console.log("left key pressed")
// 		vx -= movingSpeed;
// 		// playerAvatar.style.transform = 'scaleX(-1)';
// 	}
// 	if (keys.ArrowRight) {
//         console.log("right key pressed")
// 		vx += movingSpeed;
// 		// playerAvatar.style.transform = 'scaleX(1)';
// 	}
//     // if (keys.ArrowUp) {
//     //     console.log("up key pressed")
//     //     // playerModel.y -= 1
//     //     vy -= movingSpeed;
//     // }
//     // if (keys.ArrowDown) {
//     //     console.log("down key pressed")
//     //     // vy += movingSpeed;
//     //     // playerModel.y += 1
//     // }
//     playerModel.vx = vx;
//     playerModel.x += vx * secondsPassed;
//     // playerModel.vy = vy;
//     // playerModel.y = vy * secondsPassed;
//     let gravity = 2000;
//     if (keys.ArrowUp && playerModel.volY >= 0 && playerModel.isColliding) {
// 		playerModel.volY = -800;
// 		playerModel.isColliding = false;
// 	}
//     if (!playerModel.isColliding) {
// 		playerModel.volY += secondsPassed * gravity;
// 		playerModel.posY += playerModel.volY * secondsPassed;
// 	}else{
// 		playerModel.volY=0;
// 	}
// }

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