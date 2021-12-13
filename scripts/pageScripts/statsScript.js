window.onload = load;

function load(){
    let statsObject = { //this will be populated from the API endpoint and default to 0
        highscore: 0,
        time: 0,
        resets: 0,
        deaths: 0,
        coins: 0,
        jumps: 0,
        distance: 0,
    }
    
    document.getElementById('highscore').innerText = "Highscore: " + statsObject.highscore;
    document.getElementById('total-time').innerText = "Time Played: " + statsObject.time;
    document.getElementById('total-resets').innerText = "Total Resets: " + statsObject.resets;
    document.getElementById('total-deaths').innerText = "Total Deaths: " + statsObject.deaths;
    document.getElementById('total-coins').innerText = "Total Coins: " + statsObject.coins;
    document.getElementById('total-jumps').innerText = "Total Jumps: " + statsObject.jumps;
    document.getElementById('total-distance').innerText = "Distance Travelled: " + statsObject.distance;
    document.getElementById('menu-btn').addEventListener('click', () => {
        let clickSound = new Sound('click');
        clickSound.play();
        clickSound.sound.onended = () => {
            window.location = './../index.html';
        }
    })
}