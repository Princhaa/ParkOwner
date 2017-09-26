import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import metrics from '../config/metrics'

export default class CustomButtonOutline extends Component {
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
		borderColor: metrics.SECONDARY_COLOR,
		borderWidth: 1,
		backgroundColor: 'white'
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman',
		color: metrics.SECONDARY_COLOR
	}
})