import { AsyncStorage } from 'react-native'

async function getLoginState(cb) {
	AsyncStorage.getItem('login', (err, result) => {
		cb(result)
	})
}

async function setLoginState(state) {
	AsyncStorage.setItem('login', state)
}

async function setUserId(uid) {
	AsyncStorage.setItem('userData', uid)
}

async function getUserId(cb) {
	AsyncStorage.getItem('userData', (err, result) => {
		cb(result)
	})
}

module.exports = {
	getLoginState,
	setLoginState,
	setUserId,
	getUserId
}