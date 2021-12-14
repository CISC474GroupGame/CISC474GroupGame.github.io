#!/usr/bin/env node
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';

const PORT = 9001;

const defaultApp = initializeApp({
	credential: applicationDefault(),
	databaseURL: "https://cisc474-platformer-game-default-rtdb.firebaseio.com"
});
const defaultAuth = getAuth(defaultApp);

const app = express();
const db = getDatabase();


app.use(express.json());
app.use(cors())

app.use(function (req, res, next) {
	console.log('Request: Timestamp:', new Date().toLocaleString(), ', URL (' + req.url + '), PATH (' + req.path + ').');
	next();
});


// get data for a specific user based on their token
app.get("/user", async (req, res) => {
	const token = String(req.query.token);
	if(!token){
		res.json({ failed: true, result: "token needed."});
	}
	console.log(token);
	let result;
	try{
		result = await defaultAuth.verifyIdToken(token);
		const userRef = db.ref(`/scoreboard`);
		const userData = (await userRef.orderByChild('uid').equalTo(result.uid).once('value'));
		// create ordered json array
		const data: any[] = [];
		userData.forEach(child => {
			// console.log(child.key());
			// console.log(child.val());
			data.push(child.val());
		});
		result.data = data;
		console.log(result);
		result = (({ name, picture, user_id, email, email_verified, data }) => ({ name, picture, user_id, email, email_verified, data }))(result);
		result = { failed: false, result: result };
	} catch(error){
		console.log(error);
		result = { failed: true, result: error };
	}

	res.json(result);
	res.end();
});


// post data for score
app.post("/scoreboard", async (req, res) => {
	const token = String(req.query.token);
	const data = req.body;
	let isguest = false;
	
	let verification;
	if(!token || token == 'undefined'){
		isguest = true;
		verification = {'name': req.body.name, 'picture': '', 'uid': '', 'email': '', 'email_verified': false};
	}else{
		console.log(token);
		verification = await defaultAuth.verifyIdToken(token);
	}
	console.log(token);
	let result = {}
	try{
		const userRef = db.ref(`/scoreboard`);
		const userData = {name: verification['name'], uid: verification['uid'], isguest: isguest, timestamp: Date.now(), ...data, user: ''};
		console.log(userData);
		userRef.push(userData);
		// const userData = (await userRef.once('value')).val();
		// result.data = userData;
		result = { failed: false, result: result };
	} catch(error){
		console.log(error);
		result = { failed: true, result: error };
	}

	res.json(result);
	res.end();
});

app.get("/scoreboard", async (req, res) => {
	// const token = String(req.query.token);
	// if(!token){
	// 	res.json({ failed: true, result: "token needed."});
	// }
	// console.log(token);
	let result: {failed:boolean, result:any};
	try{
		// result = await defaultAuth.verifyIdToken(token);
		const leaderboardRef = db.ref(`/scoreboard`);
		const leaderboardData = (await leaderboardRef.orderByChild('score').once('value'));
		// create ordered json array
		const data: any[] = [];
		leaderboardData.forEach(child => {
			// console.log(child.key());
			// console.log(child.val());
			data.push(child.val());
		});
		data.reverse(); // order by highest score first

		// const data = leaderboardData;
		result = { failed: false, result: data };
	} catch(error){
		console.log(error);
		result = { failed: true, result: error };
	}

	res.json(result);
	res.end();
});

// function genRandomUserId(){
// 	// return (Math.random() + 1).toString(36).substring(7);
// 	return Math.random().toString(36).substring(2, 15);
// }

// app.put("/dev/gen", async (req, res) => {
// 	let result: {failed:boolean, result:any};
// 	try{
// 		// result = await defaultAuth.verifyIdToken(token);
// 		// const leaderboardRef = db.ref(`/leaderboard`);
// 		for(let i = 0; i < 50; i++){
// 			const userId = genRandomUserId();
// 			const userRef = db.ref(`/scoreboard/${userId}`);
// 			userRef.set({
// 				name: "Test User " + i,
// 				picture: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
// 				user_id: userId,
// 				score: Math.floor(Math.random() * 100),
// 				date: new Date().toLocaleString()
// 			});	
// 		}
// 		// leaderboardRef.push({user})
// 	// 	// const leaderboardData = (await leaderboardRef.once('value')).val();
// 	// 	// const data = leaderboardData;
// 	// 	result = { failed: false, result: data };
// 	// } catch(error){
// 	// 	console.log(error);
// 		result = { failed: false, result: "success?" };
// 	} catch(error){
// 		console.log(error);
// 		result = { failed: true, result: error };
// 	}
// 	res.json(result);
// 	res.end();
// });

app.listen(PORT);
console.log("Server Started");
console.log("Listening on ", PORT);