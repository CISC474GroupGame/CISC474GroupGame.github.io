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

//keeping track of current level
let LEVEL_INDEX = 0;
//contains all of the levels the game will load in order
let level_array = [loadLevelExample, loadLevelZero, loadLevelOne];


//initialize variables used throughout program
let canvas, context, currentLevel, player, playerSpawnState, elapsedTime, playerStats, interval;
let localDeaths = 0;
let levelMaxTime = 60;

//initialize everything to setup the game - called when window loads
let init = function(){

    //setup canvas stuff
    canvas = document.getElementById('game-canvas');
    context = canvas.getContext("2d");
    window.addEventListener("resize", resizeCanvas, false);
    resizeCanvas();

    //setup player and game data
    currentLevel = level_array[LEVEL_INDEX](canvas);
    player = currentLevel.player;
    // playerSpawnState = Object.assign({}, currentLevel.player);
    playerSpawnState = Object.assign(Object.create(Object.getPrototypeOf(currentLevel.player)),currentLevel.player);
    playerStats = new PlayerStats();
    localDeaths = 0;

    let resetButton = document.getElementById("reset-btn");
    resetButton.addEventListener('click', () => {
        resetLevel();
    });

    //start game
    startTimer();
    update();
}


// let framecount = 0;
// let img = new Image();
// img.src = './../images/in-game-images/charactor_spritesheet.png';
// img.onload = function() {
//     window.onload = init;
// }
window.onload = init;


//makes canvas size responsive to screen size
let resizeCanvas = function () {
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//resets the level
let resetLevel = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    arrowKeys = null;
    arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
    currentLevel = null;
    currentLevel = level_array[LEVEL_INDEX](canvas);
    player = currentLevel.player;
    // playerSpawnState = Object.assign({}, currentLevel.player);
    playerSpawnState = Object.assign(Object.create(Object.getPrototypeOf(currentLevel.player)),currentLevel.player);
    playerStats.resets = playerStats.resets + 1;
    localDeaths = 0;
}

//called when a level is completed, clears the current data and loads the next level in
let loadNextLevel = function(){

    //log player stats from pervious level
    playerStats.coins = playerStats.coins + player.coinCount;
    playerStats.deaths = playerStats.deaths + localDeaths;
    playerStats.time = playerStats.time + elapsedTime;
    
    //increment level index and check if game is complete
    LEVEL_INDEX++;
    if(LEVEL_INDEX >= level_array.length){
        endGame();
    } else{

        //reset canvas and key bindings so player doesn't move after winning
        context.clearRect(0, 0, canvas.width, canvas.height);
        arrowKeys = null;
        arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);

        //move to next level
        currentLevel = null;
        currentLevel = level_array[LEVEL_INDEX](canvas);

        //reset player model
        player = currentLevel.player;
        // playerSpawnState = Object.assign({}, currentLevel.player);
        playerSpawnState = Object.assign(Object.create(Object.getPrototypeOf(currentLevel.player)),currentLevel.player);
        localDeaths = 0;

        //start level
        update();
        startTimer();
    }
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
        if((!player.jumping && player.grounded) || player.powerup === "fly"){
            player.jumping = true;
            player.grounded = false;
            player.vy = -player.speed * 2.5;
            playerStats.jumps = playerStats.jumps + 1;
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
    //it breaks right here only after the player dies, so something is changing the player object to not have the same attributes
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
        if(collisionDirection && currentPlatform.type === 'kill' && player.powerup !== 'invincible'){
            respawn();
        }
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
    playerStats.distance = Math.floor(playerStats.distance + player.vx);

    //canvas animation updating
    context.fill();
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);

    // context.drawImage(img, 24 * Math.floor(framecount/60), 0, 24, 24, player.x, player.y, player.width, player.height);
    // framecount+=1;
    // if(framecount>(60*6)){
    //     framecount=0;
    // }

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

    //render powerups and check collision with player
    if(currentLevel.powerups){
        for(let i = 0; i < currentLevel.powerups.length; i++){

            //draw each powerup
            let currentPowerup = currentLevel.powerups[i];
            context.save();
            currentPowerup.drawPowerup(context);
            context.restore();

            //detecting collision with powerups
            if(standardCollisionCheck(player, currentPowerup) !== null){
                if(i > -1){
                    player.powerup = currentPowerup.type;
                    currentLevel.powerups.splice(i, 1);
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
            // currentLevel.endpoint.color = '#00ff99';
            currentLevel.key = null;
        }
    }

    //render level counter
    context.save();
    context.font = '25px Arial';
    context.fillStyle = '#FFFFFF';
    context.fillText("Level: " + (LEVEL_INDEX+1), canvas.width*0.88, canvas.height/15);
    context.restore();

    //render coin counter
    context.save();
    context.font = '25px Arial';
    context.fillStyle = '#FFFFFF';
    context.fillText("Coins: " + player.coinCount + "/" + currentLevel.coinsCount, canvas.width*0.88 , 3*canvas.height/15);
    context.restore();

    //render powerup display -- this is temporary until we find a better way to indicate the current powerup
    context.save();
    context.font = '25px Arial';
    context.fillStyle = '#FFFFFF';
    context.fillText("Powerup: " + player.powerup, canvas.width*0.88, 4*canvas.height/15);
    context.restore();

    //render endpoint and check collision with player
    if(currentLevel.endpoint){
        context.save();
        context.fillStyle = currentLevel.endpoint.color;
        context.fillRect(currentLevel.endpoint.x, currentLevel.endpoint.y, currentLevel.endpoint.width, currentLevel.endpoint.height);
        context.restore();
        let collisionEndpoint = endpointCollisionCheck(player, currentLevel.endpoint);
        if(collisionEndpoint){
            //check clear condition
            if(currentLevel.endpoint.hasKey){
                if(LEVEL_INDEX < level_array.length){
                    clearInterval(interval);
                    renderLevelModal();
                }
                // loadNextLevel();
            } else{
                requestAnimationFrame(update);
            }
        } else{
            requestAnimationFrame(update);
        }
    }
    
    // requestAnimationFrame(update);

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
    playerSpawnState = Object.assign(Object.create(Object.getPrototypeOf(player)),player);
    player.coinCount = currentCoins;
    resetKey();
    localDeaths += 1;
    resetPowerups();
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
    currentLevel.endpoint.hasKey = false;
    // currentLevel.endpoint.color = '#ff5050';
}

//replaces powerups when the player dies
let resetPowerups = function(){
    let originalPowerups = level_array[LEVEL_INDEX](canvas).powerups;
    currentLevel.powerups = originalPowerups;
}

//starts the level timer
let startTimer = function(){
    let startTime = Date.now();
    interval = setInterval( ()=> {
        elapsedTime = Date.now() - startTime;
        document.getElementById("timer").innerHTML = "Time: " + (elapsedTime / 1000).toFixed(3);
    }, 100);
}

//function is called when the user completes the game
let endGame = function(){
    let totalTime = (playerStats.time / 1000).toFixed(3);
    context.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(interval);
    renderEndModal(totalTime);
    //put api calls here
    //send the playerstats to the backend
}

//endgame modal handling
let renderEndModal = function(totalTime){
    let modal = document.getElementById('endgame-modal');
    modal.style.display = 'block';
    document.getElementById('modal-message').innerText = "You finished the game in " + totalTime + " seconds!\nTotal score: " + playerStats.score;
    document.getElementById("timer").style.display = "none";
    document.getElementById('control-btn-group').style.display = "none";
}

//between level modal handling
let renderLevelModal = function(){

    let timeBonusPerSecond = 10; //can be changed to affect how much a player gets for beating the game fast

    //calculates the score for the level
    let coinPoints = player.coinCount*100;
    let timeBonus = Math.round(Math.max(0, levelMaxTime-(elapsedTime / 1000).toFixed(3)) * timeBonusPerSecond);
    let deathPenalty = localDeaths*-50;
    let totalPoints = coinPoints + timeBonus + deathPenalty;
    playerStats.score = playerStats.score + totalPoints;

    //render modal for displaying score info
    let modal = document.getElementById('level-modal');
    document.getElementById('level-modal-coins').innerText = "Coins Collected (" + player.coinCount + ") = " + coinPoints + " points";
    document.getElementById('level-modal-time').innerText = "Time Bonus = " + timeBonus + " points";
    document.getElementById('level-modal-deaths').innerText = "Deaths (" + localDeaths + ") = " + deathPenalty + " points";
    document.getElementById('level-modal-total').innerText = "Total Points: " + totalPoints;
    document.getElementById('level-modal-next-btn').onclick = () => {
        modal.style.display = 'none';
        loadNextLevel();
    }
    modal.style.display = 'block';
}