import * as actionTypes from '../actions/actionTypes';

const initialState = {
    unitsList: [],
    singleUnit: null,
    loading: false,
    error: null,
    success: null
};

const UnitReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UNIT_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null,
            };
        case actionTypes.FETCH_UNITS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                unitsList: action.payload,
                error: null,
            };
        case actionTypes.FETCH_UNITS_LIST_FAILURE:
        case actionTypes.FETCH_UNIT_SINGLE_FAILURE:
        case actionTypes.CREATE_UNIT_FAILURE:
        case actionTypes.UPDATE_UNIT_FAILURE:
        case actionTypes.DELETE_UNIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null,
            };
        case actionTypes.FETCH_UNIT_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleUnit: action.payload,
                error: null,
            };
        case actionTypes.CREATE_UNIT_SUCCESS:
            return {
                ...state,
                loading: false,
                unitsList: state.unitsList,
                error: null,
                success: action.payload
            };
        case actionTypes.UPDATE_UNIT_SUCCESS:
        case actionTypes.DELETE_UNIT_SUCCESS:
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

export default UnitReducer;
