import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'

import metrics from '../config/metrics'
import CustomButton from '../components/CustomButton'

import { loginWithEmailAndPassword } from '../service/firebase/init'
import { setUserId } from '../service/storage'

export default class LoginScreen extends Component {

	static navigationOptions = {
		title: 'Login',
		headerTitleStyle: {
			color: metrics.GREY_WHITE,
			alignSelf: 'center',
			marginRight: 56
		}
	}

	constructor(props) {
		super(props)
		this.form = {}
		this.state = {
			email: '',
			password: '',
			isLoggingIn: false
		}
	}

	focusForm(key) {
		this.form[key].focus()
	}

	login() {
		this.setState({ isLoggingIn: true })
		loginWithEmailAndPassword(this.state.email, this.state.password, () => {
			setUserId(firebase.auth().currentUser.uid)
			this.props.navigation.navigate('mainScreen')
		}, (error) => {
			this.setState({ isLoggingIn: false })
		})
	}

	getButton() {
		if (this.state.isLoggingIn) {
			return (
				<ActivityIndicator size={'large'} color={metrics.SECONDARY_COLOR} style={{ marginBottom: 30 }}/>
			)
		} else {
			return (
				<CustomButton 
					style={styles.button}
					text={'MASUK'}
					onPress={() => this.login()}
				/>
			)
		}
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<TextInput 
					ref = { form => {
						this.form['email'] = form
					}}
					onSubmitEditing={() => {
						this.focusForm('password')
					}}
					underlineColorAndroid={'transparent'}
					blurOnSubmit={false}
					style={styles.textInput}
					placeholder={'Email'}
					keyboardType={'email-address'}
					returnKeyType={'next'}
					onChangeText={(value) => this.setState({ email: value })}
				/>
				<TextInput 
					ref = { form => {
						this.form['password'] = form
					}}
					underlineColorAndroid={'transparent'}
					style={styles.textInput}
					placeholder={'Password'}
					secureTextEntry={true}
					returnKeyType={'done'}
					onChangeText={(value) => this.setState({ password: value })}					
				/>
				{this.getButton()}
				<Text style={styles.text}>Dengan bergabung anda telah setuju pada</Text>
				<Text style={[styles.text, {color: metrics.SECONDARY_COLOR, marginTop: 10}]}>Kebijakan & Privasi</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'AvenirLTStd-Roman'
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
	button: {
		width: metrics.DEVICE_WIDTH*0.8,
		height: 50,
		marginBottom: 30
	}
})