// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

function displayScoreboard(){
  fetch('http://localhost:9001/scoreboard')
				.then(function(response) {
					return response.json();
				})
				.then(function(data) {
					// create scoreboard table
					var table = document.createElement('table');
					table.className = 'table table-striped';
					table.innerHTML = '<thead><tr><th>Rank</th><th>Name</th><th>Score</th><th>Time</th><th>Date</th></tr></thead><tbody></tbody>';
					
					// add scoreboard data to table
					console.log(data)
					let index = 0;
					let key;
					for (key in data.result) {
						var row = table.tBodies[0].insertRow(index);
						row.insertCell(0).innerHTML = index+1;
						row.insertCell(1).innerHTML = data.result[key].name;
						row.insertCell(2).innerHTML = data.result[key].score;
						row.insertCell(3).innerHTML = data.result[key].timestamp;
						index++;
					}
					
					// add table to page
					var container = document.getElementsByClassName('container')[0];
					container.appendChild(table);
				});
}

function getUserStats(){
	return fetch('http://localhost:9001/user?token='+ auth.currentUser.Aa).then(function(response){
        return response.json();
    })
}