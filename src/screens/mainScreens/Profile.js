import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { setLoginState } from '../../service/storage'
import metrics from '../../config/metrics'
import CustomButton from '../../components/CustomButton'
import CustomButtonOutline from '../../components/CustomButtonOutline'

const resetAction =
	NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'welcomeScreen' })
        ]
    })

class Profile extends Component {

	static navigationOptions = {
		tabBarLabel: 'Profil',
		tabBarIcon: ({ focused }) => {
			switch(focused) {
			case true: return (
				<Image
					source={require('../../../assets/icons/profile_active.png')} style={styles.icon}/>
			)
			case false: return (
				<Image source={require('../../../assets/icons/profile_inactive.png')} style={styles.icon}/>
			)}
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false
		}
	}

	componentDidMount() {
		setTimeout(() => this.setState({ isLoaded: true }), 3000)
	}

	getContent() {
		if (this.props.userData) {
			return (
				<View style={styles.container}>
					<View style={styles.profileContainer}>
						<Text style={[styles.text, { fontSize: 15 }]}>PROFIL ANDA</Text>
						<Image source={this.props.userData.ava == '' ? require('../../../assets/icons/men.png') : {uri: this.props.userData.ava}} style={{ width: 100, height: 100, marginBottom: 20, marginTop: 20, borderRadius: 100 }}/>
						<Text style={[styles.text, { fontSize: 20, color: metrics.SECONDARY_COLOR, marginBottom: 10 }]}>{this.props.userData.fullname}</Text>
						<Text style={[styles.text, { marginBottom: 15, textAlign: 'center' }]}>{this.props.userData.address}</Text>
						<Text style={[styles.text, { marginBottom: 15 }]}>{this.props.userData.phone}</Text>
						<View style={{ backgroundColor: metrics.GREY_WHITE, height: 3, width: metrics.DEVICE_WIDTH*0.9, marginBottom: 15 }}/>
						<View style={styles.saldoContainer}>
							<View style={{ flex: 1 }}>
								<Text style={styles.text}>SALDO ANDA</Text>
							</View>
							<View style={{ flex: 1, alignItems: 'flex-end' }}>
								<Text style={styles.text}>Rp. {this.props.userData.balance}</Text>
							</View>
						</View>
					</View>
					<CustomButton
						style={styles.button}
						text={'UBAH PROFIL'}
						onPress={() => this.props.rootNavigator.navigate('editProfileScreen')}
					/>
					<CustomButton
						style={[styles.button, { backgroundColor: 'red' }]}
						text={'KELUAR'}
						onPress={() => {
							setLoginState('false')
							this.props.rootNavigator.dispatch(resetAction)
						}}
					/>
				</View>
			)
		} else{
			return (
				<ActivityIndicator color={metrics.SECONDARY_COLOR}/>
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.getContent()}
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	profileContainer: {
		width: metrics.DEVICE_WIDTH*0.95,
		elevation: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
		marginBottom: 20
	},

	saldoContainer: {
		flexDirection: 'row',
		padding: 10
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman'
	},

	icon: {
		width: 25,
		height: 25
	},

	button: {
		width: metrics.DEVICE_WIDTH*0.95,
		height: 50,
		marginBottom: 10
	}
})

const mapStateToProps = (state) => {
	return {
		rootNavigator: state.rootNavigator,
		userData: state.userData
	}
}

export default connect(mapStateToProps)(Profile)
