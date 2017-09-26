import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class NextScreen extends Component {

	static navigationOptions = {
		title: 'Login'
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={styles.text}>Hello Dunia!</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Panton-LightitalicCaps'
	}
})