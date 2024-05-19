import * as actionTypes from '../actions/actionTypes'


const initialState = {
	rolesList: [],
	singleRole: null,
	loading: false,
	error: null,
	success: null
};

const RolesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ROLES_INIT:
			return {
				...state,
				loading: true,
				error: null,
				success: null,
			};
		case actionTypes.FETCH_ROLES_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				rolesList: action.payload,
				error: null,
			};
		case actionTypes.FETCH_ROLES_LIST_FAILURE:
		case actionTypes.FETCH_ROLES_SINGLE_FAILURE:
		case actionTypes.CREATE_ROLES_FAILURE:
		case actionTypes.UPDATE_ROLES_FAILURE:
		case actionTypes.DELETE_ROLES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: null,
			};
		case actionTypes.FETCH_ROLES_SINGLE_SUCCESS:
			return {
				...state,
				loading: false,
				singleRole: action.payload,
				error: null,
			};
		case actionTypes.CREATE_ROLES_SUCCESS:
			return {
				...state,
				loading: false,
				rolesList: state.rolesList,
				error: null,
				success: action.payload
			};
		case actionTypes.UPDATE_ROLES_SUCCESS:
		case actionTypes.DELETE_ROLES_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				success: action.payload,
			};

		default:
			return state;
	}
};

export default RolesReducer;
