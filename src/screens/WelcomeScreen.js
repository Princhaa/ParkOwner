import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, StatusBar } from 'react-native'

import store from '../service/store'
import { setRootNavigator } from '../service/action'
import metrics from '../config/metrics'
import CustomButton from '../components/CustomButton'

export default class WelcomeScreen extends Component {

	static navigationOptions = {
		header: null
	}

	componentDidMount() {
		store.dispatch(setRootNavigator(this.props.navigation))
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar
					backgroundColor={metrics.PRIMARY_COLOR_DARK}
				/>
				<View style={styles.bikesContainer}>
					<Image 
						source={require('../../assets/icons/bike_white.png')}
						style={styles.bikes}
					/>
					<Image 
						source={require('../../assets/icons/bike_white.png')}
						style={styles.bikes}
					/>
					<Image 
						source={require('../../assets/icons/bike_orange.png')}
						style={styles.bikes}
					/>
					<Image 
						source={require('../../assets/icons/bike_white.png')}
						style={styles.bikes}
					/>
					<Image 
						source={require('../../assets/icons/bike_white.png')}
						style={styles.bikes}
					/>
				</View>
				<Text style={[styles.text, {color: 'white', marginBottom: 10}]}>PERTAMA KALI MENGGUNAKAN?</Text>
				<Text style={[styles.text, {color: 'grey', marginBottom: 3}]}>Anda dapat memulai dengan cara membeli</Text>
				<Text style={[styles.text, {color: 'grey', marginBottom: 50}]}>parkcoin dan mulai transaksi pembayaran</Text>
				<CustomButton 
					text={'DAFTAR AKUN'}
					style={styles.button}
					onPress={() => this.props.navigation.navigate('registerScreen')}
				/>
				<Text style={[styles.text, {color: 'white'}]} onPress={() => this.props.navigation.navigate('loginScreen')}>Saya sudah memiliki akun</Text>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: metrics.PRIMARY_COLOR
	},

	bikesContainer: {
		flexDirection: 'row',
		marginBottom: 50
	},

	bikes: {
		width: 60,
		height: 60,
		marginLeft: 5,
		marginRight: 5
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman'
	},

	button: {
		width: metrics.DEVICE_WIDTH*0.8,
		height: 50,
		marginBottom: 50
	}
})