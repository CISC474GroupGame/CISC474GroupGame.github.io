function load() {
    let clickSound = new Sound('click');
    document.getElementById("ngButton").addEventListener('click', () => {
        clickSound.play();
        clickSound.sound.onended = () => {
            window.location = 'html/game.html';
        }
    });
    document.getElementById("helpButton").addEventListener('click', () => {
        clickSound.play();
        clickSound.sound.onended = () => {
            window.location = 'html/tutorial.html';
        }
    });
    document.getElementById("contactButton").addEventListener('click', () => {
        clickSound.play();
        clickSound.sound.onended = () => {
            window.location = 'html/aboutUs.html';
        }
    });
    document.getElementById("statsButton").addEventListener('click', () => {
        clickSound.play();
        clickSound.sound.onended = () => {
            window.location = 'html/playerStats.html';
        }
    });
}


window.onload = load;