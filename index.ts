#!/usr/bin/env node
import 'dotenv/config';
import express from 'express';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const PORT = 9001;

const defaultApp = initializeApp({
	credential: applicationDefault(),
	databaseURL: "https://cisc474-platformer-game-default-rtdb.firebaseio.com"
});
const defaultAuth = getAuth(defaultApp);

const app = express();
app.use(express.json());

function verifyToken(idToken: string) {
	// idToken comes from the client app
	defaultAuth.verifyIdToken(idToken)
		.then((decodedToken) => {
			const uid = decodedToken.uid;
			console.log(uid)
			return uid;
		})
		.catch((error) => {
			console.log(error);
			console.log(error.errorInfo);
			
			return JSON.parse(JSON.stringify(error.errorInfo));
		});

}

app.get("/user", (req, res) => {
	console.log('user');
	res.json({ failed: true, result: "To be implemented." });
	res.end();
})

app.get("/user/:uuid", (req, res) => {
	const uuid = req.params.uuid;
	let result = verifyToken(uuid)

	res.json(result);
	res.end();
})
app.put("/user/:uuid", (req, res) => {
	const uuid = req.params.uuid;

	res.json({ failed: true, result: "To be implemented." });
	res.end();
})
app.post("/user/:uuid", (req, res) => {
	const uuid = req.params.uuid;

	res.json({ failed: true, result: "To be implemented." });
	res.end();
});

app.delete("/user/:uuid", (req, res) => {
	const uuid = req.params.uuid;

	res.json({ failed: true, result: "To be implemented." });
	res.end();
});

app.listen(PORT);
console.log("Server Started");
console.log("Listening on ", PORT);