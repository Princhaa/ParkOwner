export const SET_USER_LOGGED_IN_STATE = 'SET_USER_LOGGED_IN_STATE'
export const SET_ROOT_NAVIGATOR = 'SET_ROOT_NAVIGATOR'
export const SET_USER_DATA = 'SET_USER_DATA'

export function setUserLoggedInState(userLoggedInState) {
	return {
		type: SET_USER_LOGGED_IN_STATE,
		userLoggedInState
	}
}

export function setRootNavigator(rootNavigator) {
	return {
		type: SET_ROOT_NAVIGATOR,
		rootNavigator
	}
}

export function setUserData(userData) {
	return {
		type: SET_USER_DATA,
		userData
	}
}