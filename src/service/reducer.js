import { combineReducers } from 'redux'

import { SET_USER_LOGGED_IN_STATE, SET_ROOT_NAVIGATOR, SET_USER_DATA } from './action'

function userLoggedInState(state = false, action) {
	switch (action.type) {
	case SET_USER_LOGGED_IN_STATE: {
		return action.userLoggedInState
	}
	default: {
		return state
	}}
}

function rootNavigator(state = null, action) {
	switch(action.type) {
	case SET_ROOT_NAVIGATOR: {
		return action.rootNavigator
	}
	default: {
		return state
	}
	}
}

function userData(state = null, action) {
	switch(action.type) {
	case SET_USER_DATA: {
		return action.userData
	}
	default: {
		return state
	}
	}
}

const app = combineReducers({
	userLoggedInState,
	rootNavigator,
	userData
})

export default app