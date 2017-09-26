import React, { Component, PropTypes } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import metrics from '../config/metrics'

export default class Switch extends Component {

	constructor(props) {
		super(props)
		this.state = {
			active: this.props.active
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ active: nextProps.active })
	}

	render() {
		const { text, style, ...otherProps } = this.props
		return (
			<TouchableOpacity style={[styles.container, style, this.state.active ? {backgroundColor: metrics.SECONDARY_COLOR, elevation: 5} : {backgroundColor: metrics.GREY_WHITE}]} {...otherProps}>
				<Text style={[styles.text, this.state.active ? {color: 'white'} : {color: 'grey'}]}>{text}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman',
	}
})