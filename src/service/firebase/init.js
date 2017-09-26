import * as firebase from 'firebase'

const config = {
	apiKey: 'AIzaSyDnUMeZ1QRjQri1oSkPtba06ymemZsdbZo',
	authDomain: 'parkcare-89849.firebaseapp.com',
	databaseURL: 'https://parkcare-89849.firebaseio.com',
	storageBucket: 'parkcare-89849.appspot.com'
}

const init = () => {
	firebase.initializeApp(config)
}

const registerWithEmailAndPassword = (email, password, cb, handler) => {
	firebase.auth().createUserWithEmailAndPassword(email, password).then(cb).catch(function(error) {
		handler(error)
	})
}

const loginWithEmailAndPassword = (email, password, cb, handler) => {
	firebase.auth().signInWithEmailAndPassword(email, password).then(cb).catch(function(error) {
		handler(error)
	})
}

module.exports = {
	init,
	registerWithEmailAndPassword,
	loginWithEmailAndPassword
}