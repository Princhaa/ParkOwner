import * as firebase from 'firebase'
import { init } from './init'
import { getUserId } from '../storage'
init()
const firebaseDb = firebase.database()

const retreiveMarkerData = (cb) => {
	const ref = firebaseDb.ref('lokasi')
	ref.on('value', function(snapshot) {
		cb(snapshot.val())
	})
}

const retreiveHistory = (cb) => {
	const ref = firebaseDb.ref('transaction')
	ref.on('value', function(snapshot) {
		cb(snapshot.val())
	})
}

const retreiveLocationDetails = (key, cb) => {
	const ref = firebaseDb.ref('lokasi/' + key)
	ref.on('value', function(snapshot) {
		cb(snapshot.val())
	})
}

const writeNewClient = (userKey, email, cb) => {
	const ref = firebaseDb.ref('owner/' + userKey)
	ref.set({
		address: 'Belum tersedia',
		balance: 0,
		email:  email,
		fullname: 'Belum tersedia',
		phone: 'Belum tersedia',
		ava: '',
		last_transaction: ''
	})
	cb()
}

const getUserID = () => {
	return firebase.auth().currentUser.uid
}

const updateClientData = (uid, fullname, phone, address, cb) => {
	const ref = firebaseDb.ref('owner/' + uid)
	ref.update({
		address: address,
		fullname: fullname,
		phone: phone
	}, cb())
}

const getUserData = (uid, cb) => {
	const ref = firebaseDb.ref('owner/' + uid)
	ref.on('value', function(snapshot) {
		cb(snapshot.val())
	})
}

const payment = (date, fare, location, owner, time, balance, ownerBalance, cb) => {
	let newTransactionID = firebaseDb.ref('transaction').push().key
	getUserId((uid) => {
		const transactionRef = firebaseDb.ref('/transaction')
		let paymentData = {
			client: uid,
			date: date,
			fare: fare,
			location: location,
			owner: owner,
			payment: 'parkcoin',
			time: time
		}
		let updates = {}
		updates['/' + newTransactionID] = paymentData
		transactionRef.update(updates)
		const userRef = firebaseDb.ref('client/' + uid)
		userRef.update({
			balance: balance - fare
		})
		const ownerRef = firebaseDb.ref('owner/' + owner)
		ownerRef.update({
			saldo: ownerBalance + fare
		})
		cb()
	})
}

const getClientDetails = (clientId, cb) => {
	const ref = firebaseDb.ref('client/' + clientId)
	ref.on('value', function(snapshot) {
		cb(snapshot.val())
	})
}

const updateUserPicture = (url) => {
	const ref = firebaseDb.ref('owner/' + firebase.auth().currentUser.uid)
	ref.update({
		ava: url
	})
}

const updateParkPicture = (url, id) => {
	const ref = firebaseDb.ref('lokasi/' + id)
	ref.update({
		image: url
	})
}

const writeNewLocation = (location, fence, roof, paving, height, width, length, cb) => {
	let newLocationId = firebaseDb.ref('lokasi').push().key
	let newLocation = {
		address: location.address,
		available_bike: true,
		available_bus: true,
		available_car: true,
		fence: fence,
		latitude: location.latitude,
		longitude: location.longitude,
		max_height: height,
		max_length: length,
		max_width: width,
		owner: firebase.auth().currentUser.uid,
		paving: paving,
		roof: roof,
		image: ''
	}
	let updates = {}
	updates['/' + newLocationId] = newLocation
	firebaseDb.ref('lokasi').update(updates).then(() => cb(newLocationId))
}

const updateParkCondition = (key, type, value) => {
	const ref = firebaseDb.ref('lokasi/' + key)
	switch(type) {
		case 'bike' : {
			ref.update({
				available_bike: value
			})
			break
		}
		case 'car' : {
			ref.update({
				available_car: value
			})
			break
		}
		case 'bus' : {
			ref.update({
				available_bus: value
			})
			break
		}
		case 'fence' : {
			ref.update({
				fence: value
			})
			break
		}
		case 'roof' : {
			ref.update({
				roof: value
			})
			break
		}
		case 'paving' : {
			ref.update({
				paving: value
			})
			break
		}
		case 'length' : {
			ref.update({
				max_length: value
			})
			break
		}
		case 'width' : {
			ref.update({
				max_width: value
			})
			break
		}
		case 'height' : {
			ref.update({
				max_height: value
			})
			break
		}
	}
}

const retreiveLastTransaction = (ownerId, lastTransaction, cb) => {
	const ref = firebaseDb.ref('owner/' + ownerId)
	ref.on('value', function(snapshot) {
		if(snapshot.val().last_transaction != lastTransaction) {
			console.log('Last ', snapshot.val().last_transaction)
			cb()
		}
	})
}

const getTransacationDetails = (transactionId, cb) => {
	const ref = firebaseDb.ref('transaction/' + transactionId)
	ref.once('value', function(snapshot) {
		cb(snapshot.val())
	})
}

module.exports = {
	retreiveMarkerData,
	writeNewClient,
	getUserID,
	updateClientData,
	getUserData,
	payment,
	getClientDetails,
	retreiveHistory,
	retreiveLocationDetails,
	updateUserPicture,
	writeNewLocation,
	updateParkPicture,
	updateParkCondition,
	retreiveLastTransaction,
	getTransacationDetails
}
