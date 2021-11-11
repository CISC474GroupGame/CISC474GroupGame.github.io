//global attributes -- maybe this file should be a class??
let canvas;
let context;
let currentLevel;
let playerModel;
let gameObjects;

let init = function () {
	canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
	window.addEventListener("resize", resizeCanvas, false);
	resizeCanvas();
	currentLevel = new levelOne(canvas, context);
    playerModel = currentLevel.levelData.playerModel;
	gameObjects = currentLevel.levelData.allGameObjects;
	window.requestAnimationFrame(gameLoop);
}

window.onload = init;

let resizeCanvas = function () {
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let secondsPassed = 0;
let oldTimeStamp = 0;
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

	window.requestAnimationFrame(gameLoop);
}

let rectIntersect = function(playerX, playerY, playerWidth, playerHeight, objectX, objectY, objectWidth, objectHeight){
	// if (x2 > w1 + x1){
	// 	console.log("x2");
	// }
	// if (x1 > w2 + x2){
	// 	console.log("x1");
	// }
	// if (y2 > h1 + y1){
	// 	console.log("y2");
	// }
	// if (y1 > h2 + y2){
	// 	console.log("y1");
	// }
	if (objectX > playerWidth + playerX || playerX > objectWidth + objectX || objectY > playerHeight + playerY || playerY > objectHeight + objectY){
		// console.log("rectangles not colliding");
        return false;
    }
	else{
		// console.log("rectangles colliding");
    	return true;
	}
	// console.log("rectangles colliding");
    // return true;
}

let detectCollision = function(){
	let gameObject;

	//Reset collision state on all objects
	for(let i = 0; i < gameObjects.length; i++){
		gameObjects[i].isColliding = false;
	}

	//Check for collisions
	for(let i = 1; i < gameObjects.length; i++){
		//we need to start at 1 because the playerModel is the first gameObject
		gameObject = gameObjects[i];

		if(rectIntersect(playerModel.x, playerModel.y, playerModel.width, playerModel.height, gameObject.x, gameObject.y, gameObject.width, gameObject.height)){
			// let vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
			// let distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
			// let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
			// let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
			// let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
			// if (speed < 0){
			// 	break;
			// }
			// obj1.vx -= (speed * vCollisionNorm.x);
			// obj1.vy -= (speed * vCollisionNorm.y);
			// obj2.vx += (speed * vCollisionNorm.x);
			// obj2.vy += (speed * vCollisionNorm.y);

			playerModel.isColliding = true;
			gameObject.isColliding = true;
		}
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