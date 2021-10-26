
// import * from 'https://www.gstatic.com/firebasejs/7.4.0/firebase.js';
// import * from 'https://www.gstatic.com/firebasejs/ui/5.0.0/firebase-ui-auth.js';

const firebaseConfig = {
	apiKey: "AIzaSyAwH-t0xazz1sCaZXQMvd8t0Cxz6lVewh4",
	authDomain: "cisc474-platformer-game.firebaseapp.com",
	databaseURL: "https://cisc474-platformer-game-default-rtdb.firebaseio.com",
	projectId: "cisc474-platformer-game",
	storageBucket: "cisc474-platformer-game.appspot.com",
	messagingSenderId: "91451050964",
	appId: "1:91451050964:web:0adde06d95ca98d84aa441"
};


// From google, see https://github.com/firebase/firebaseui-web/blob/master/demo/public/app.js

let uiConfig = {
	'callbacks': {
		// Called when the user has been successfully signed in.
		'signInSuccessWithAuthResult': function (authResult, redirectUrl) {
			// if (authResult.user) {
			//   handleSignedInUser(authResult.user);
			// }
			// if (authResult.additionalUserInfo) {
			//   document.getElementById('is-new-user').textContent =
			//       authResult.additionalUserInfo.isNewUser ?
			//       'New User' : 'Existing User';
			// }
			// // Do not redirect.
			//TODO handle user login
			return false;
		}
	},
	// Opens IDP Providers sign-in flow in a popup.
	'signInFlow': 'popup',
	'signInOptions': [
		{
			provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			// Required to enable ID token credentials for this provider.
			clientId: '91451050964-8f4l5kiq1g0idqrvjp22qgvbsa41gun1.apps.googleusercontent.com'
		},
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			// Whether the display name should be displayed in Sign Up page.
			requireDisplayName: true
		}
	]
};


var app = firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

auth.onAuthStateChanged((user) => {
	if (user) {
		console.log('------------');
		console.log(user);
		$('#username').text(user.displayName);
		$('#firebaseui-auth-container').hide();
		$("#logout").show();
	} else{
		console.log('------------');
		$('#username').text("");
		$('#firebaseui-auth-container').show();
		$("#logout").hide();
	}
});

$(() => {
	$("#logout").click(() => {
		console.log("signout?");
		auth.signOut().then(() => {
			location.reload();
			console.log("Sign-out successful.");
		}).catch((error) => {
			console.log(error);
		});
	});
})