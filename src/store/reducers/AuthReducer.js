import * as actionTypes from '../actions/actionTypes'

const initialState = {
	loading: false,
	token: null,
	userData: null,
	error: null,
	success: null,
	isAuthenticated: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_INIT:
			return {
				...state,
				loading: true,
				error: null,
				success: null,
			};

		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				loading: false,
				token: action.token,
				userData: action.userData,
				isAuthenticated: true,
				error: null,
			};

		case actionTypes.AUTH_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
				success: null,
				isAuthenticated: false,
			};

		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userData: null,
				isAuthenticated: false,
				error: null,
				success: null,
			};

		default:
			return state;
	}
}

export default reducer