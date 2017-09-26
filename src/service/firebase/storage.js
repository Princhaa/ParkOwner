import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'

import { updateUserPicture, updateParkPicture } from './database'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs

const storage = firebase.storage()

const uploadImages = (imageUri, cb, running) => {
	running()
	window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
	window.Blob = Blob
	let ref = storage.ref('images/user-image/'+firebase.auth().currentUser.uid)
	let uploadBlob = null
	fs.readFile(imageUri, 'base64')
		.then((data) => {
			return Blob.build(data, { type: 'image/jpg;BASE64' })
		})
		.then((blob) => {
			uploadBlob = blob
			return ref.put(blob, { contentType: 'image/jpg' })
		})
		.then(() => {
			uploadBlob.close()
			ref.getDownloadURL().then(function(url) {
				updateUserPicture(url)
				cb()
			})
		})
}

const uploadLocationImage = (imageUri, id, cb, running) => {
	running()
	window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
	window.Blob = Blob
	let ref = storage.ref('images/park-image/'+firebase.auth().currentUser.uid)
	let uploadBlob = null
	fs.readFile(imageUri, 'base64')
		.then((data) => {
			return Blob.build(data, { type: 'image/jpg;BASE64' })
		})
		.then((blob) => {
			uploadBlob = blob
			return ref.put(blob, { contentType: 'image/jpg' })
		})
		.then(() => {
			uploadBlob.close()
			ref.getDownloadURL().then(function(url) {
				updateParkPicture(url, id)
				cb()
			})
		})
}

module.exports = {
	uploadImages,
	uploadLocationImage
}
