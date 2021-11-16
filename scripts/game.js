//creating frames
(function () {
    let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

//setting up key tracking
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

//initialize the game when the window loads
let canvas, context, currentLevel, player, playerSpawnState;
let init = function(){
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext("2d");
    window.addEventListener("resize", resizeCanvas, false);
    resizeCanvas();
    levelData = loadLevelOne(canvas);
    player = levelData.player;
    playerSpawnState = Object.assign({}, levelData.player);
    update();
}
window.onload = init;

//makes canvas size responsive to screen size
let resizeCanvas = function () {
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//main driver function for the app (gets called every frame)
//can modulize this and break it down into other functions to be cleaner
let update = function() {


    //if player falls outside of the screen, respawns
    if(player.y > canvas.height + 500){
        respawn();
    }

    //player movement
    if(arrowKeys.ArrowUp){
        if(!player.jumping && player.grounded){
            player.jumping = true;
            player.grounded = false;
            player.vy = -player.speed * 2.5;
        }
    }
    if(arrowKeys.ArrowLeft){
        if(player.vx > -player.speed){
            player.vx = player.vx - 1;
        }
    }
    if(arrowKeys.ArrowRight){
        if(player.vx < player.speed){
            player.vx = player.vx + 1;
        }
    }
    player.vx *= player.friction;
    player.vy += player.gravity;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    player.grounded = false;

    //render platforms and check collision with player
    for(let i = 0; i < levelData.platforms.length; i++){
        let currentPlatform = levelData.platforms[i];
        context.fillStyle = '#000000';
        context.rect(currentPlatform.x, currentPlatform.y, currentPlatform.width, currentPlatform.height);
        let collisionDirection = collisionCheck(player, currentPlatform);
        if (collisionDirection === "left" || collisionDirection === "right") {
            player.vx = 0;
            player.jumping = false;
        } else if (collisionDirection === "bottom") {
            player.grounded = true;
            player.jumping = false;
        } else if (collisionDirection === "top") {
            player.vy *= -1;
        }
    }


    //stop player from moving if they become grounded
    if(player.grounded){
        player.vy = 0;
    }

    //move actual player position based on velocity
    player.x += player.vx;
    player.y += player.vy;

    //canvas animation updating
    context.fill();
    context.fillStyle = '#0099b0';
    context.fillRect(player.x, player.y, player.width, player.height);


    //render endpoint and check collision with player
    context.save();
    context.fillStyle = levelData.endpoint.color;
    context.fillRect(levelData.endpoint.x, levelData.endpoint.y, levelData.endpoint.width, levelData.endpoint.height);
    context.restore();
    let collisionEndpoint = collisionCheck(player, levelData.endpoint);
    if(collisionEndpoint){
        console.log("endpoint reached");
        respawn();
    }


    requestAnimationFrame(update);
}

//function for detecting collision between two given objects
let collisionCheck = function(obj1, obj2){
	let vectorX = (obj1.x + (obj1.width / 2)) - (obj2.x + (obj2.width / 2));
	let vectorY = (obj1.y + (obj1.height / 2)) - (obj2.y + (obj2.height / 2));
	let hWidths = (obj1.width / 2) + (obj2.width / 2);
	let hHeights = (obj1.height / 2) + (obj2.height / 2);
	let collisionDirection = null;
	if (Math.abs(vectorX) < hWidths && Math.abs(vectorY) < hHeights) {
		let oX = hWidths - Math.abs(vectorX);
		let oY = hHeights - Math.abs(vectorY);
        if (oX >= oY) {
            if (vectorY > 0) {
                collisionDirection = "top";
                obj1.y += oY;
            } else {
                collisionDirection = "bottom";
                obj1.y -= oY;
            }
        } else {
            if (vectorX > 0) {
                collisionDirection = "left";
                obj1.x += oX;
            } else {
                collisionDirection = "right";
                obj1.x -= oX;
            }
        }
	}
	return collisionDirection;
}

//respawns the player
let respawn = function(){
    player = levelData.player = playerSpawnState;
    playerSpawnState = Object.assign({}, levelData.player);
}