import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image } from 'react-native'

import metrics from '../config/metrics'

export default class Topup extends Component {

	static navigationOptions = {
		title: 'Topup'
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Masukkan jumlah nominal saldo</Text>
				<Text style={[styles.text, { marginBottom: 10 }]}>minimal Rp. 50.000</Text>
				<TextInput 
					style={{ width: metrics.DEVICE_WIDTH*0.8, height: 50, marginBottom: 10, alignSelf: 'center' }}
					keyboardType={'numeric'}
				/>
				<TouchableOpacity style={styles.item}>
					<Image source={require('../../assets/Mandiri.png')} style={{ flex: 1, resizeMode: 'contain', height: 30 }}/>
					<View style={{ flex: 5, justifyContent: 'center', paddingLeft: 10 }}>
						<Text style={styles.text}>Bayar melalui rekening Mandara</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.item}>
					<Image source={require('../../assets/Mandiri.png')} style={{ flex: 1, resizeMode: 'contain', height: 30 }}/>
					<View style={{ flex: 5, justifyContent: 'center', paddingLeft: 10 }}>
						<Text style={styles.text}>Bayar melalui cara lain</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		alignItems: 'center'
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman'
	},

	item: {
		width: metrics.DEVICE_WIDTH * 0.95,
		justifyContent: 'center',
		elevation: 5,
		marginBottom: 10,
		flexDirection: 'row',
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5
	}
})