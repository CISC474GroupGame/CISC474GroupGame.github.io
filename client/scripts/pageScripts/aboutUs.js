function load() {
    let clickSound = new Sound('click');
    document.getElementById("menu-btn").addEventListener('click', () => {
        clickSound.play();
        clickSound.sound.onended = () => {
            window.location = './../index.html';
        }
    });
    document.getElementById("htp-btn").addEventListener('click', () => {
        clickSound.play();
        clickSound.sound.onended = () => {
            window.location = './tutorial.html';
        }
    });
}


window.onload = load;