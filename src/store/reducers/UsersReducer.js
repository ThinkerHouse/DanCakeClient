// UserReducer.js
import * as actionTypes from "../actions/actionTypes";

const initialState = {
	loading: false,
	userList: [],
	singleUser: null,
	error: null,
	success: null,
};

const UsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.USER_INIT:
			return {
				...state,
				loading: true,
				error: null,
				success: null,
			};

		case actionTypes.FETCH_USER_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				userList: action.payload,
				error: null,
			};

		case actionTypes.FETCH_USER_LIST_FAILURE:
			return {
				...state,
				loading: false,
				userList: [],
				error: action.payload,
			};

		case actionTypes.FETCH_USER_SINGLE_SUCCESS:
			return {
				...state,
				loading: false,
				singleUser: action.payload,
				error: null,
			};

		case actionTypes.FETCH_USER_SINGLE_FAILURE:
			return {
				...state,
				loading: false,
				singleUser: null,
				error: action.payload,
			};

		case actionTypes.CREATE_USER_SUCCESS:
		case actionTypes.UPDATE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload,
				error: null,
			};

		case actionTypes.UPDATE_USER_FAILURE:
		case actionTypes.CREATE_USER_FAILURE:
			return {
				...state,
				loading: false,
				success: null,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default UsersReducer;
