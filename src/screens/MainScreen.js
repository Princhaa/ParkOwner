import React, { Component } from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import metrics from '../config/metrics'

import Profile from './mainScreens/Profile'
import History from './mainScreens/History'
import MyPark from './mainScreens/MyPark'
import QRCode from './mainScreens/QRCode'

import { setLoginState, getLoginState } from '../service/storage'
import { getUserId } from '../service/storage'
import { getUserData } from '../service/firebase/database'
import store from '../service/store'
import { setUserData, setRootNavigator } from '../service/action'


const Main = TabNavigator({
	myPark: { screen: MyPark },
	qrCode: { screen: QRCode },
	history: { screen: History },
	profile: { screen: Profile }
}, {
	tabBarOptions: {
		activeTintColor: metrics.SECONDARY_COLOR,
		inactiveTintColor: '#909090',
		showIcon: true,
		pressColor: metrics.GREY_WHITE,
		style: {
			backgroundColor: 'white'
		}
	},
	tabBarComponent: TabBarBottom,
	tabBarPosition: 'bottom',
	animationEnabled: false,
	swipeEnabled: false
})

export default class MainScreen extends Component {

	static navigationOptions = {
		header: null
	}

	componentWillMount() {
		store.dispatch(setRootNavigator(this.props.navigation))
		setLoginState('true')
		getLoginState((value) => {
			if (value == 'true') {
				getUserId((uid) => {
					setTimeout(() => {
						getUserData(uid, (userData) => {
							console.log(userData)
							store.dispatch(setUserData(userData))
						})
					})
				})
			}
		})
	}

	render() {
		return (
			<Main />
		)
	}

}
