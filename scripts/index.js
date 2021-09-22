<<<<<<< HEAD
<<<<<<< HEAD
$(document).ready(function(){
	window.addEventListener("keydown", function (event) { //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key#example
		if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}			
		switch (event.key) {
			case "Down": // IE/Edge specific value
			case "ArrowDown":
			$("#square").css("top", "+=5");
			// Do something for "down arrow" key press.
			break;
			case "Up": // IE/Edge specific value
			case "ArrowUp":
			$("#square").css("top", "-=5");
			// Do something for "up arrow" key press.
			break;
			case "Left": // IE/Edge specific value
			case "ArrowLeft":
			$("#square").css("left", "-=5");
			// Do something for "left arrow" key press.
			break;
			case "Right": // IE/Edge specific value
			case "ArrowRight":
			$("#square").css("left", "+=5");
			// Do something for "right arrow" key press.
			break;
			case "Enter":
			// Do something for "enter" or "return" key press.
			break;
			case "Esc": // IE/Edge specific value
			case "Escape":
			// Do something for "esc" key press.
			break;
			default:
			return; // Quit when this doesn't handle the key event.
		}

		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
		}, true);
})
=======
// $(document).ready(function(){
// 	window.addEventListener("keydown", function (event) { //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key#example
// 		if (event.defaultPrevented) {
// 			return; // Do nothing if the event was already processed
// 		}			
// 		switch (event.key) {
// 			case "Down": // IE/Edge specific value
// 			case "ArrowDown":
// 			$("#square").css("top", "+=5");
// 			// Do something for "down arrow" key press.
// 			break;
// 			case "Up": // IE/Edge specific value
// 			case "ArrowUp":
// 			$("#square").css("top", "-=5");
// 			// Do something for "up arrow" key press.
// 			break;
// 			case "Left": // IE/Edge specific value
// 			case "ArrowLeft":
// 			$("#square").css("left", "-=5");
// 			// Do something for "left arrow" key press.
// 			break;
// 			case "Right": // IE/Edge specific value
// 			case "ArrowRight":
// 			$("#square").css("left", "+=5");
// 			// Do something for "right arrow" key press.
// 			break;
// 			case "Enter":
// 			// Do something for "enter" or "return" key press.
// 			break;
// 			case "Esc": // IE/Edge specific value
// 			case "Escape":
// 			// Do something for "esc" key press.
// 			break;
// 			default:
// 			return; // Quit when this doesn't handle the key event.
// 		}

// 		// Cancel the default action to avoid it being handled twice
// 		event.preventDefault();
// 		}, true);
// })

// let playerData = new Player(400, 400, 0, 0);
// playerAvatar.style.width = playerData.width;
// playerAvatar.style.height = playerData.height;

$(document).ready(function(){
=======
// $(document).ready(function(){
// 	window.addEventListener("keydown", function (event) { //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key#example
// 		if (event.defaultPrevented) {
// 			return; // Do nothing if the event was already processed
// 		}			
// 		switch (event.key) {
// 			case "Down": // IE/Edge specific value
// 			case "ArrowDown":
// 			$("#square").css("top", "+=5");
// 			// Do something for "down arrow" key press.
// 			break;
// 			case "Up": // IE/Edge specific value
// 			case "ArrowUp":
// 			$("#square").css("top", "-=5");
// 			// Do something for "up arrow" key press.
// 			break;
// 			case "Left": // IE/Edge specific value
// 			case "ArrowLeft":
// 			$("#square").css("left", "-=5");
// 			// Do something for "left arrow" key press.
// 			break;
// 			case "Right": // IE/Edge specific value
// 			case "ArrowRight":
// 			$("#square").css("left", "+=5");
// 			// Do something for "right arrow" key press.
// 			break;
// 			case "Enter":
// 			// Do something for "enter" or "return" key press.
// 			break;
// 			case "Esc": // IE/Edge specific value
// 			case "Escape":
// 			// Do something for "esc" key press.
// 			break;
// 			default:
// 			return; // Quit when this doesn't handle the key event.
// 		}

// 		// Cancel the default action to avoid it being handled twice
// 		event.preventDefault();
// 		}, true);
// })

// let playerData = new Player(400, 400, 0, 0);
// playerAvatar.style.width = playerData.width;
// playerAvatar.style.height = playerData.height;

$(document).ready(function(){
>>>>>>> 2dda061 (game loop running and animation moving across the screen)

	// let gameCanvas = document.getElementById("gameCanvas");
	// let playerAvatar = document.getElementById("playerAvatar");
	// let width;
	// let height;

	// let resize = function(){
	// 	width = window.innerWidth * 2
	// 	height = window.innerHeight * 2
	// 	gameCanvas.style.width = width + "px"
	// 	gameCanvas.style.height = height + "px"
	// }
	// window.onresize = resize
	// resize()

	// let state = {
	// 	x: width / 2,
	// 	y: height / 2
	// }

	// function update(progress){
	// 	//update the state of the world for the elapsed time since the last render
	// 	state.x += progress
	// 	if (state.x > width) {
	// 		state.x -= width
	// 	}
	// }

	// function draw(){
	// 	//draw the state of the world
	// 	playerAvatar.style.width = '50px';
	// 	playerAvatar.style.height = '50px';
	// 	playerAvatar.style.left = state.x - 10;
	// 	playerAvatar.style.top = state.y - 10;
	// }

	// function loop(timestamp){
	// 	let progress = timestamp - lastrender
	// 	update(progress)
	// 	draw()
	// 	lastrender = timestamp
	// 	window.requestAnimationFrame(loop)
	// }

	// let lastrender = 0
	// window.requestAnimationFrame(loop)
})

let gameCanvas;
let playerAvatar;

let init = function(){
	gameCanvas = document.getElementById("gameCanvas");
	playerAvatar = document.getElementById("playerAvatar");

	window.requestAnimationFrame(gameLoop);
	// console.log(playerAvatar.offsetLeft)
	// console.log(playerAvatar.style.left)
	// playerAvatar.offsetLeft = playerAvatar.offsetLeft + 10
	// console.log(playerAvatar.offsetLeft)
}

window.onload = init;

let playerX = 0;
let playerY = 0;

let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 50;
let timePassed = 0;

let gameLoop = function(timestamp){
	secondsPassed = (timestamp - oldTimeStamp) / 1000;
	oldTimeStamp = timestamp;
	update(secondsPassed);
	draw();
	window.requestAnimationFrame(gameLoop);
}

let draw = function(){
	// let randomColor = Math.random() > 0.5 ? '#ff8080' : '#0099b0';
	// playerAvatar.style.background = randomColor;
	playerAvatar.style.left = playerX + "px";
	playerAvatar.style.top = playerY + "px";
}

let update = function(secondsPassed){

	timePassed += secondsPassed

	//test movement
	// playerX = easeInOutQuint(timePassed, 50, 500, 1.5);
	// playerY = easeLinear(timePassed, 50, 250, 1.5);

	//liner movement
	playerX += (movingSpeed * secondsPassed);
	playerY += (movingSpeed * secondsPassed);
}

//test easing functions for different animations
function easeInOutQuint (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

function easeLinear (t, b, c, d) {
    return c * t / d + b;
<<<<<<< HEAD
}
>>>>>>> JD
=======
}
>>>>>>> 2dda061 (game loop running and animation moving across the screen)
