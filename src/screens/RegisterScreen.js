import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'

import CustomButton from '../components/CustomButton'
import metrics from '../config/metrics'

//Service
import { registerWithEmailAndPassword } from '../service/firebase/init'
import { writeNewClient, getUserID } from '../service/firebase/database'
import { setUserId } from '../service/storage'

export default class RegisterScreen extends Component {

	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props)
		this.form = {}
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			isRegistering: false
		}
	}

	focusForm(form) {
		this.form[form].focus()
	}

	register() {
		this.setState({ isRegistering: true })
		registerWithEmailAndPassword(this.state.email, this.state.password, () => {
			writeNewClient(getUserID(), this.state.email, () => {
				setUserId(firebase.auth().currentUser.uid)
				this.props.navigation.navigate('form')
			})
		}, (error) => {
			alert(error.message)
			this.setState({ isRegistering: false })
		})
	}

	getButton() {
		if (this.state.isRegistering) {
			return (
				<ActivityIndicator size={'large'} color={metrics.SECONDARY_COLOR} style={{ marginBottom: 15 }}/>
			)
		} else {
			return (
				<CustomButton
					text={'DAFTAR'}
					style={styles.button}
					onPress={() => this.register()}
				/>
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					ref={ form => {
						this.form['email'] = form
					}}
					blurOnSubmit={false}
					onSubmitEditing={() => {
						this.focusForm('password')
					}}
					style={styles.textInput}
					placeholder={'Email'}
					keyboardType={'email-address'}
					underlineColorAndroid={'transparent'}
					returnKeyType={'next'}
					onChangeText={(value) => this.setState({ email: value })}
				/>
				<TextInput
					ref={ form => {
						this.form['password'] = form
					} }
					onSubmitEditing={() => {
						this.focusForm('confirmPassword')
					}}
					blurOnSubmit={false}
					style={styles.textInput}
					placeholder={'Password'}
					secureTextEntry={true}
					underlineColorAndroid={'transparent'}
					returnKeyType={'next'}
					onChangeText={(value) => this.setState({ password: value })}
				/>
				<TextInput
					ref={ form => {
						this.form['confirmPassword'] = form
					} }
					style={styles.textInput}
					placeholder={'Konfirmasi Password'}
					secureTextEntry={true}
					underlineColorAndroid={'transparent'}
					onChangeText={(value) => this.setState({ confirmPassword: value })}
				/>
				{this.getButton()}
				<Text style={[styles.text, { color: metrics.GREY_WHITE }]}>Dengan bergabung, anda telah setuju pada</Text>
				<Text style={[styles.text, { color: metrics.SECONDARY_COLOR }]}>Kebijakan & Privasi</Text>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		backgroundColor: metrics.PRIMARY_COLOR,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},

	textInput: {
		width: metrics.DEVICE_WIDTH*0.8,
		height: 50,
		marginBottom: 15,
		backgroundColor: 'white',
		fontFamily: 'AvenirLTStd-Roman',
		paddingLeft: 10,
		paddingRight: 10
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman',
		marginBottom: 15
	},

	button: {
		width: metrics.DEVICE_WIDTH*0.8,
		height: 50,
		marginBottom: 15
	}
})
