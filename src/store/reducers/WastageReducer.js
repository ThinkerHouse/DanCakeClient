import * as actionTypes from '../actions/actionTypes';

const initialState = {
    wastagesList: [],
    singleWastage: null,
    loading: false,
    error: null,
    success: null
};

const WastageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WASTAGE_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null,
            };
        case actionTypes.FETCH_WASTAGES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                wastagesList: action.payload,
                error: null,
            };
        case actionTypes.FETCH_WASTAGES_LIST_FAILURE:
        case actionTypes.FETCH_WASTAGE_SINGLE_FAILURE:
        case actionTypes.CREATE_WASTAGE_FAILURE:
        case actionTypes.UPDATE_WASTAGE_FAILURE:
        case actionTypes.DELETE_WASTAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null,
            };
        case actionTypes.FETCH_WASTAGE_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleWastage: action.payload,
                error: null,
            };
        case actionTypes.CREATE_WASTAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                wastagesList: state.wastagesList,
                error: null,
                success: action.payload
            };
        case actionTypes.UPDATE_WASTAGE_SUCCESS:
        case actionTypes.DELETE_WASTAGE_SUCCESS:
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

export default WastageReducer;
