import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import { getLoginState } from './service/storage'

//Auth screens
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import NextScreen from './screens/NextScreen'
import RegisterScreen from './screens/RegisterScreen'

import MainScreen from './screens/MainScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import Recommendation from './screens/Recommendation'

import Transaction from './screens/Transaction'
import Topup from './screens/Topup'

import Form from './screens/Form'
import FormContinue from './screens/FormContinue'

import metrics from './config/metrics'

import store from './service/store'

const Screens = (signedIn = false) => {
	return StackNavigator({
		welcomeScreen: { screen: WelcomeScreen },
		loginScreen: { screen: LoginScreen },
		nextScreen: { screen: NextScreen },
		mainScreen: { screen: MainScreen },
		registerScreen: { screen: RegisterScreen },
		editProfileScreen: {screen: EditProfileScreen},
		transaction: { screen: Transaction },
		topup: { screen: Topup },
		recommendation: { screen: Recommendation },
		form: { screen: Form },
		formContinue: { screen: FormContinue }
	}, {
		navigationOptions: {
			headerStyle: {
				backgroundColor: metrics.PRIMARY_COLOR,
			},
			headerTitleStyle: {
				color: metrics.GREY_WHITE
			},
			headerTintColor: metrics.GREY_WHITE,
		},
		initialRouteName: signedIn ? 'mainScreen' : 'welcomeScreen'
	})
}
class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			loginScreen: null
		}
	}

	componentDidMount() {
		getLoginState((value) => {
			this.setState({ loginState: value })
			SplashScreen.hide()
		})
	}

	render() {
		const App = Screens(this.state.loginState == 'true')
		return (
			<Provider store={store}>
				<App />
			</Provider>
		)
	}
}

export default App
