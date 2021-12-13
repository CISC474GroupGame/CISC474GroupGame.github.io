function load() {
    let clickSound = new Sound('click');
    document.getElementById('menu-btn').addEventListener('click', () => {
        clickSound.play();
        clickSound.sound.onended = () => {
            window.location = '../index.html';
        }
    })
}

window.onload = load;