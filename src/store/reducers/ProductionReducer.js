import * as actionTypes from '../actions/actionTypes';

const initialState = {
    productionsList: [],
    singleProduction: null,
    loading: false,
    error: null,
    success: null
};

const ProductionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCTION_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null
            };
        case actionTypes.FETCH_PRODUCTIONS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                productionsList: action.payload,
                error: null
            };
        case actionTypes.FETCH_PRODUCTIONS_LIST_FAILURE:
        case actionTypes.FETCH_PRODUCTION_SINGLE_FAILURE:
        case actionTypes.CREATE_PRODUCTION_FAILURE:
        case actionTypes.UPDATE_PRODUCTION_FAILURE:
        case actionTypes.DELETE_PRODUCTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };
        case actionTypes.FETCH_PRODUCTION_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleProduction: action.payload,
                error: null
            };
        case actionTypes.CREATE_PRODUCTION_SUCCESS:
        case actionTypes.UPDATE_PRODUCTION_SUCCESS:
        case actionTypes.DELETE_PRODUCTION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: action.payload
            };
        default:
            return state;
    }
};

export default ProductionReducer;
