import React, { Component } from 'react'
import { ScrollView, StyleSheet, Image, TextInput, Button, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'

import CustomButton from '../components/CustomButton'
import metrics from '../config/metrics'

import { updateClientData, writeNewLocation } from '../service/firebase/database'
import { uploadImages } from '../service/firebase/storage'

class EditProfileScreen extends Component {
	static navigationOptions={
		title: 'Ubah Profil'
	}

	constructor(props) {
		super(props)
		this.state = {
			fullname: this.props.userData.fullname,
			phone: this.props.userData.phone,
			address: this.props.userData.address,
			isLoading: false,
			isImageChanged: false
		}
	}

	updateData() {
		updateClientData(firebase.auth().currentUser.uid, this.state.fullname, this.state.phone, this.state.address,
			() => {
				if (this.state.isImageChanged) {
					uploadImages(this.state.image.path, () => {
						this.setState({ isLoading: false })
					}, () => {
						this.setState({ isLoading: true })
					})
				}
				this.props.navigation.navigate('mainScreen')
			})
	}

	pickImage() {
		ImagePicker.openPicker({
			width: 300,
			height: 300,
			cropping: true,
			includeBase64: true
		}).then (image => {
			this.setState({ image: image, isImageChanged: true })
		})
	}

	getButton() {
		if (this.state.isLoading) {
			return (
				<ActivityIndicator color={metrics.SECONDARY_COLOR} />
			)
		} else {
			return (
				<CustomButton style={styles.textInput} text={'UBAH'} onPress={() => this.updateData()}/>
			)
		}
	}

	render(){
		return(
			<ScrollView contentContainerStyle={ styles.contentContainer} style={ styles.container }>
				<Image
					source={ this.state.image ? {uri: this.state.image.path} : this.props.userData.ava == '' ? require('../../assets/icons/men.png') : {uri: this.props.userData.ava} }
					style={{ borderRadius: 100, margin: 15, width: 100, height: 100 }}
					ref = { image => {
						this.image = image
					}}
				/>
				<Button
					title='Pilih Foto'
					color={metrics.SECONDARY_COLOR}
					onPress={() => this.pickImage()}
				/>
				<TextInput
					placeholder={'Nama akun'}
					defaultValue={this.state.fullname}
					style={styles.textInput}
					onChangeText={(value) => this.setState({ fullname: value })}/>
				<TextInput
					placeholder={'Nomor telepon'}
					keyboardType={'phone-pad'}
					defaultValue={this.state.phone}
					style={styles.textInput}
					onChangeText={(value) => this.setState({ phone: value })}/>
				<TextInput
					placeholder={'Alamat'}
					style={styles.textInput}
					defaultValue={this.state.address}
					onChangeText={(value) => this.setState({ address: value })}/>
				{this.getButton()}
			</ScrollView>
		)

	}
}
const styles = StyleSheet.create({
	container:{
		flex: 1
	},
	contentContainer:{
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput:{
		width: metrics.DEVICE_WIDTH * 0.95,
		marginBottom: 10
	}
})

const mapStateToProps = (state) => {
	return {
		userData: state.userData
	}
}

export default connect(mapStateToProps)(EditProfileScreen)
