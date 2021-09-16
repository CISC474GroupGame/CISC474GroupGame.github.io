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