let gameCanvas;
let playerAvatar;
let playerModel;
let levelOneData;

let init = function () {
	levelOneData = loadLevelOne();
	playerModel = levelOneData.playerModel;
	gameCanvas = document.getElementById("gameCanvas");
	playerAvatar = document.getElementById("playerAvatar");
	window.requestAnimationFrame(gameLoop);
}


// const pages = ['tutorial', 'gameCanvas', 'about', 'signup', 'login'];
function showPage(id) {
	$('.subpage').addClass('hidden');
	$(id).removeClass('hidden');
	// const other_page = pages.filter(page => page != id);
	//   other_page.forEach(element => {
	// 	document.getElementById(element).classList.add('hidden');
	//   });
}
$(document).ready(function(){
    $('.nav-link').click(function(){
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
});


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

let buildPlatformTable = function(){

}

let detectPlayerToPlatformCollision = function(levelData){
	let playerModel = levelData.playerModel;
	levelData.platforms.forEach(platform => {
		let playerFloor = playerModel.posY - 5 ;
		let platformCeiling = platform.posY - (platform.height / 2);
		console.log('PLAYER FLOOR: ', playerFloor)
		console.log('PLATFORM CEILING: ', platformCeiling)
		if(playerFloor >= platformCeiling){
			console.log("collision")
			playerModel.isColliding = true;
		}
		else{
			playerModel.isColliding = false;
		}
	});
}

let testGravity = function(){
	console.log(playerModel.isColliding)
	if(!playerModel.isColliding){
		playerModel.posY = playerModel.posY + 1;
		// console.log("gravity being called")
	}
}

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
	// console.log(playerModel.posY)
}

let update = function (secondsPassed, keys) {

	detectPlayerToPlatformCollision(levelOneData)
	testGravity();
	//make table of all coordinates of all platoforms and have collision function check against all platforms

	let volX = 0;
	if (keys.ArrowLeft) {
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

	// let gravity = 500; // positive is down, and negative is up; to jump up a negaitive volY is needed
	// if (keys.ArrowUp && playerModel.volY > 0 && !(playerModel.posY + playerModel.volY * secondsPassed < 520)) {
	// 	playerModel.volY = -200;
	// }
	// playerModel.volY += secondsPassed * gravity;
	// if (playerModel.posY + playerModel.volY * secondsPassed < 520) {
	// 	playerModel.posY += playerModel.volY * secondsPassed;
	// }

}
