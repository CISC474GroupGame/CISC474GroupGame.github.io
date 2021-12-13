function load() {
    let clickSound = new Sound('click');
    document.getElementById("menu-btn").addEventListener('click', () => {
        clickSound.play();
        clickSound.sound.onended = () => {
            window.location = './../index.html';
        }
    });
    document.getElementById("abu-btn").addEventListener('click', () => {
        clickSound.play();
        clickSound.sound.onended = () => {
            window.location = './aboutUs.html';
        }
    });
}


window.onload = load;