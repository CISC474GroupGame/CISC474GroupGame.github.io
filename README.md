# CISC474_Group2_FinalProject

<h2>Live Deployment:</h2>
https://cisc474.jdw.design/index.html<br>

<h3>If you're running the app locally:</h3>

<strong>In client directory:</strong><br>
Make sure python 3 or newer is installed: https://www.python.org/downloads/ <br>
Enter command: 
```
python -m http.server
```

Take note of the port number that the server is running on.<br>

<strong>In another terminal window in the server directory:</strong><br>
Make sure node is installed: https://nodejs.org/en/download/<br>
Enter commands:
```
npm install --global yarn
yarn
yarn run dev
```

Go to localhost:(port number from python server)<br>

For the statistics and leaderboard to work, you will need GOOGLE_APPLICATION_CREDENTIALS. Please reach out to us if needed for these credentials.<br>

API Description:<br>

GET http://server:port/user?token={token}
get personal stats
* parameter
  * Token: required token from firebase
* response

```json
{
  "failed": false,
  "result": {
    "name": "<REDACTED>",
    "picture": "<REDACTED>",
    "user_id": "<REDACTED>",
    "email": "<REDACTED>",
    "email_verified": true,
    "data": [
      {
        "coins": 1,
        "deaths": 0,
        "distance": 805,
        "isguest": false,
        "jumps": 0,
        "name": "JD Wang",
        "resets": 0,
        "score": 667,
        "time": 3334,
        "timestamp": 1639438393734,
        "uid": "<REDACTED>",
        "user": ""
      },
      {
        "coins": 31,
        "deaths": 98,
        "distance": 1511,
        "isguest": false,
        "jumps": 1,
        "name": "<REDACTED>",
        "resets": 0,
        "score": 3024,
        "time": 57470,
        "timestamp": 1639974658472,
        "uid": "<REDACTED>",
        "user": ""
      }
    ]
  }
}

```

POST http://server:port/scoreboard?token={token}
* parameter
  * Token: required token from firebase
* request
  * JSON of the score object.
```JSON
{
  "score": 3024,
  "time": 57470,
  "resets": 0,
  "deaths": 98,
  "coins": 31,
  "distance": 1511,
  "jumps": 1
}
```
* response

```json
{"failed":false,"result":{}}
```




GET http://server:port/scoreboard
* response:
```json
{
  "failed": false,
  "result": [
    {
      "coins": 44,
      "deaths": 6,
      "distance": 17,
      "isguest": true,
      "jumps": 0,
      "name": "speedrunner",
      "resets": 0,
      "score": 9280,
      "time": 21959,
      "timestamp": 1639458901133,
      "uid": "",
      "user": ""
    },
    {
      "coins": 48,
      "deaths": 15,
      "distance": 47,
      "isguest": true,
      "jumps": 0,
      "name": "Guest",
      "resets": 0,
      "score": 8973,
      "time": 47494,
      "timestamp": 1639457277321,
      "uid": "",
      "user": ""
    }
  ]
}

```




Github Page: https://cisc474groupgame.github.io/ </br> 
or with deployed server @ https://cisc474.jdw.design/

