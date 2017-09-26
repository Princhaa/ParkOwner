import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import metrics from '../config/metrics'

export default class CustomButton extends Component {
	render(){
		const { text, style, ...otherProps } = this.props

		return(
			<TouchableOpacity style={[styles.container, style]} {...otherProps}>
				<Text style={styles.text}>{text}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: metrics.SECONDARY_COLOR
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman',
		color: 'white'
	}
})