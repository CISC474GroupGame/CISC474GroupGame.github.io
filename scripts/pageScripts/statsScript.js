// window.onload = load;

async function load(user){
    let statsObject = { //this will be populated from the API endpoint and default to 0
        highscore: 0,
        time: 0,
        resets: 0,
        deaths: 0,
        coins: 0,
        jumps: 0,
        distance: 0,
    }
    console.log(user);
    getUserStats(user).then(function(stats){
        console.log(stats);
        let scores = [];
        stats.result.data.forEach(function(stat){
            Object.entries(stat).forEach(function([key, value]){
                console.log(key, value);
                if(key in statsObject && key != "highscore"){
                    console.log(key)
                    statsObject[key] += value;
                }else if(key == "score"){
                    scores.push(value);
                }
            });
            console.log(scores)
            statsObject['highscore'] = Math.max(...scores);
            console.log(statsObject);
        });
        document.getElementById('highscore').innerText = "Highscore: " + statsObject.highscore;
        document.getElementById('total-time').innerText = "Time Played: " + statsObject.time / 1000 + " seconds";
        document.getElementById('total-resets').innerText = "Total Resets: " + statsObject.resets;
        document.getElementById('total-deaths').innerText = "Total Deaths: " + statsObject.deaths;
        document.getElementById('total-coins').innerText = "Total Coins: " + statsObject.coins;
        document.getElementById('total-jumps').innerText = "Total Jumps: " + statsObject.jumps;
        document.getElementById('total-distance').innerText = "Distance Travelled: " + statsObject.distance + " pixels";
        document.getElementById('menu-btn').addEventListener('click', () => {
            let clickSound = new Sound('click');
            clickSound.play();
            clickSound.sound.onended = () => {
                window.location = './../index.html';
            }
        })
    });
}