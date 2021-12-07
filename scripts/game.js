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

//keeping track of current level - (there may be a better way to do this)
let LEVEL_INDEX = 0;
let level_array = [loadLevelZero, loadLevelOne];


//initialize the game when the window loads
let canvas, context, currentLevel, player, playerSpawnState, timer, elapsedTime;
let init = function(){
    canvas = document.getElementById('game-canvas');
    context = canvas.getContext("2d");
    window.addEventListener("resize", resizeCanvas, false);
    resizeCanvas();
    currentLevel = level_array[LEVEL_INDEX](canvas);
    player = currentLevel.player;
    playerSpawnState = Object.assign({}, currentLevel.player);
    timer = 300;
    let resetButton = document.getElementById("reset-btn");
    resetButton.addEventListener('click', () => {
        resetLevel();
    });
    update();
}
window.onload = init;

//makes canvas size responsive to screen size
let resizeCanvas = function () {
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//reset the level -- slows game after a few resets needs to be optimized
let resetLevel = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    arrowKeys = null;
    arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
    currentLevel = null;
    currentLevel = level_array[LEVEL_INDEX](canvas);
    player = currentLevel.player;
    playerSpawnState = Object.assign({}, currentLevel.player);
}

//called when a level is completed, clears the current data and loads the next level in
let loadNextLevel = function(){
    LEVEL_INDEX++;
    if(LEVEL_INDEX >= level_array.length){
        endGame();
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    arrowKeys = null;
    arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
    currentLevel = null;
    currentLevel = level_array[LEVEL_INDEX](canvas);
    player = currentLevel.player;
    playerSpawnState = Object.assign({}, currentLevel.player);
    console.log(currentLevel);
}

//setting up the timer
let startTime = Date.now();
let interval = setInterval( ()=> {
    elapsedTime = Date.now() - startTime;
    document.getElementById("timer").innerHTML = "Time: " + (elapsedTime / 1000).toFixed(3);
}, 100);

// //function for ticking the timer
// let incrementTimer = function(){
//     timer--;
// }

// setInterval(incrementTimer, 1000);


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
    for(let i = 0; i < currentLevel.platforms.length; i++){
        let currentPlatform = currentLevel.platforms[i];
        context.fillStyle = currentPlatform.color;
        context.fillRect(currentPlatform.x, currentPlatform.y, currentPlatform.width, currentPlatform.height);
        let collisionDirection = standardCollisionCheck(player, currentPlatform);
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
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);

    //render coins and check collision with player
    if(currentLevel.coins){
        for(let i = 0; i < currentLevel.coins.length; i++){

            //drawing each coin
            context.save();
            let currentCoin = currentLevel.coins[i];
            currentCoin.drawCoin(context);
            context.restore();

            //detecting collision with coins
            if(standardCollisionCheck(player, currentCoin) !== null){
                if(i > -1){
                    player.coinCount++;
                    currentLevel.coins.splice(i, 1);
                }
            }
        }
    }

    //render key and check collision with player
    if(currentLevel.key){

        //draw key
        context.save();
        currentLevel.key.drawKey(context);
        context.restore();

        //detecting collision
        if(standardCollisionCheck(player, currentLevel.key) !== null){
            currentLevel.endpoint.hasKey = true;
            currentLevel.endpoint.color = '#00ff99';
            currentLevel.key = null;
        }
    }

    //render level counter
    context.save();
    context.font = '25px Arial';
    context.fillStyle = '#000000';
    context.fillText("Level: " + (LEVEL_INDEX+1), canvas.width*0.88, canvas.height/15);
    context.restore();

    //render coin counter
    context.save();
    context.font = '25px Arial';
    context.fillStyle = '#000000';
    context.fillText("Coins: " + player.coinCount + "/" + currentLevel.coinsCount, canvas.width*0.88 , 3*canvas.height/15);
    context.restore();

    // //render timer
    // if(timer >= 0){
    //     context.save();
    //     context.font = '25px Arial';
    //     context.fillStyle = '#000000';
    //     context.fillText("Time: " + timer, canvas.width - canvas.width/10, 4*canvas.height/15);
    //     context.restore();
    // }


    //render endpoint and check collision with player
    if(currentLevel.endpoint){
        context.save();
        context.fillStyle = currentLevel.endpoint.color;
        context.fillRect(currentLevel.endpoint.x, currentLevel.endpoint.y, currentLevel.endpoint.width, currentLevel.endpoint.height);
        context.restore();
        let collisionEndpoint = endpointCollisionCheck(player, currentLevel.endpoint);
        if(collisionEndpoint){
            //check clear condition
            // if(player.coinCount === currentLevel.coinsCount){
            //     // alert("You Win!");
            //     loadNextLevel();
            // }
            if(currentLevel.endpoint.hasKey){
                loadNextLevel();
            }
            // respawn();
        }
    }
    
    // //check if timer expired
    // if(timer < 0){
    //     alert("Game over!\nYou ran out of time.\nYou will now be returned to the main menu.");
    //     window.location = './../index.html';
    // }
    // else{
    //     requestAnimationFrame(update);
    // }
    requestAnimationFrame(update);

}

//function for detecting collision between player and platforms
let standardCollisionCheck = function(obj1, obj2){
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

//function for detecting collision between player and endpoint
let endpointCollisionCheck = function(obj1, obj2){
    let vectorX = (obj1.x + (obj1.width / 2)) - (obj2.x + (obj2.width / 2));
	let vectorY = (obj1.y + (obj1.height / 2)) - (obj2.y + (obj2.height / 2));
	let hWidths = (obj1.width / 2) + (obj2.width / 2);
	let hHeights = (obj1.height / 2) + (obj2.height / 2);
	let collision = null;
    if (Math.abs(vectorX) < hWidths && Math.abs(vectorY) < hHeights) {
        collision = true;
    }
    return collision;
}

//respawns the player
let respawn = function(){
    let currentCoins = player.coinCount;
    player = playerSpawnState;
    playerSpawnState = Object.assign({}, player);
    player.coinCount = currentCoins
    resetKey();
    // timer = timer - 5; //if I want to indicate visually by highlighting the timer red when you lose time, I can make a timer class if necessary
}

//handle the time running out -- this isn't needed unless we do reverse time
let timeExpired = function(){
    alert("Game over! You ran out of time!\nYou will now be returned to the main menu.");
    window.location = './../index.html';
}

//handles replacing the key and relocking the endpoint when the player dies
let resetKey = function(){
    let originalKey = level_array[LEVEL_INDEX](canvas).key;
    currentLevel.key = originalKey;
    currentLevel.endpoint.color = '#ff5050';
    currentLevel.endpoint.hasKey = false;
}

//function is called when the user completes the game
let endGame = function(){
    alert("You beat the game in " + (elapsedTime / 1000).toFixed(3) + " seconds!\nYou will now be returned to the main menu.");
    window.location = './../index.html';
    //put api call here
    //send the time to the backend
}