#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app_1 = require("firebase-admin/app");
var auth_1 = require("firebase-admin/auth");
var database_1 = require("firebase-admin/database");
var PORT = 9001;
var defaultApp = (0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)(),
    databaseURL: "https://cisc474-platformer-game-default-rtdb.firebaseio.com"
});
var defaultAuth = (0, auth_1.getAuth)(defaultApp);
var app = (0, express_1.default)();
var db = (0, database_1.getDatabase)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(function (req, res, next) {
    console.log('Request: Timestamp:', new Date().toLocaleString(), ', URL (' + req.url + '), PATH (' + req.path + ').');
    next();
});
// get data for a specific user based on their token
app.get("/user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, result, userRef, userData, data_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = String(req.query.token);
                if (!token) {
                    res.json({ failed: true, result: "token needed." });
                }
                console.log(token);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, defaultAuth.verifyIdToken(token)];
            case 2:
                result = _a.sent();
                userRef = db.ref("/scoreboard");
                return [4 /*yield*/, userRef.orderByChild('uid').equalTo(result.uid).once('value')];
            case 3:
                userData = (_a.sent());
                data_1 = [];
                userData.forEach(function (child) {
                    // console.log(child.key());
                    // console.log(child.val());
                    data_1.push(child.val());
                });
                result.data = data_1;
                console.log(result);
                result = (function (_a) {
                    var name = _a.name, picture = _a.picture, user_id = _a.user_id, email = _a.email, email_verified = _a.email_verified, data = _a.data;
                    return ({ name: name, picture: picture, user_id: user_id, email: email, email_verified: email_verified, data: data });
                })(result);
                result = { failed: false, result: result };
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                result = { failed: true, result: error_1 };
                return [3 /*break*/, 5];
            case 5:
                res.json(result);
                res.end();
                return [2 /*return*/];
        }
    });
}); });
// post data for score
app.post("/scoreboard", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, data, isguest, verification, result, userRef, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = String(req.query.token);
                data = req.body;
                isguest = false;
                if (!(!token || token == 'undefined')) return [3 /*break*/, 1];
                isguest = true;
                verification = { 'name': 'Guest', 'picture': '', 'uid': '', 'email': '', 'email_verified': false };
                return [3 /*break*/, 3];
            case 1:
                console.log(token);
                return [4 /*yield*/, defaultAuth.verifyIdToken(token)];
            case 2:
                verification = _a.sent();
                _a.label = 3;
            case 3:
                console.log(token);
                result = {};
                try {
                    userRef = db.ref("/scoreboard");
                    userData = __assign(__assign({ name: verification['name'], uid: verification['uid'], isguest: isguest, timestamp: Date.now() }, data), { user: '' });
                    console.log(userData);
                    userRef.push(userData);
                    // const userData = (await userRef.once('value')).val();
                    // result.data = userData;
                    result = { failed: false, result: result };
                }
                catch (error) {
                    console.log(error);
                    result = { failed: true, result: error };
                }
                res.json(result);
                res.end();
                return [2 /*return*/];
        }
    });
}); });
app.get("/scoreboard", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, leaderboardRef, leaderboardData, data_2, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                leaderboardRef = db.ref("/scoreboard");
                return [4 /*yield*/, leaderboardRef.orderByChild('score').once('value')];
            case 1:
                leaderboardData = (_a.sent());
                data_2 = [];
                leaderboardData.forEach(function (child) {
                    // console.log(child.key());
                    // console.log(child.val());
                    data_2.push(child.val());
                });
                data_2.reverse(); // order by highest score first
                // const data = leaderboardData;
                result = { failed: false, result: data_2 };
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                result = { failed: true, result: error_2 };
                return [3 /*break*/, 3];
            case 3:
                res.json(result);
                res.end();
                return [2 /*return*/];
        }
    });
}); });
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
