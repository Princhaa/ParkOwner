import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'

import metrics from '../config/metrics'

export default class HistoryList extends Component {

	render() {
		const { price, address, ...otherProps } = this.props
		return (
			<TouchableOpacity style={styles.container} {...otherProps}>
				<View style={styles.iconContainer}>
					<Image source={require('../../assets/icons/coin.png')} style={{ width: 60, height: 60 }}/>
				</View>
				<View style={styles.detailContainer}>
					<View style={styles.detail}>
						<Text style={styles.text}>Rp. {price}</Text>
					</View>
					<View style={styles.detail}>
						<Text style={styles.text}>{address}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
		backgroundColor: 'white',
		elevation: 5,
		width: metrics.DEVICE_WIDTH*0.95,
		marginTop: 5,
		marginBottom: 5
	},

	iconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	detailContainer: {
		flex: 4
	},

	detail: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 20
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman'
	}
})