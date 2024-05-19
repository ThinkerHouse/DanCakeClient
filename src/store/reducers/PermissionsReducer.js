import * as actionTypes from '../actions/actionTypes'

const initialState = {
	permissionsList: [],
	loading: false,
	error: null,
	success: null
};

const PermissionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PERMISSIONS_INIT:
			return {
				...state,
				loading: true,
				error: null,
				success: null,
			};
		case actionTypes.FETCH_PERMISSIONS_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				permissionsList: action.payload,
				error: null,
			};
		case actionTypes.FETCH_PERMISSIONS_LIST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default PermissionsReducer;
