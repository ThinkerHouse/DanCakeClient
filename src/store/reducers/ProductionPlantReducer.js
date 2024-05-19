import * as actionTypes from '../actions/actionTypes';

const initialState = {
    productionPlantsList: [],
    singleProductionPlant: null,
    loading: false,
    error: null,
    success: null
};

// Reducer function for production plants
const ProductionPlantReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCTION_PLANT_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null
            };
        case actionTypes.FETCH_PRODUCTION_PLANTS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                productionPlantsList: action.payload,
                error: null
            };
        case actionTypes.FETCH_PRODUCTION_PLANTS_LIST_FAILURE:
        case actionTypes.FETCH_PRODUCTION_PLANT_SINGLE_FAILURE:
        case actionTypes.CREATE_PRODUCTION_PLANT_FAILURE:
        case actionTypes.UPDATE_PRODUCTION_PLANT_FAILURE:
        case actionTypes.DELETE_PRODUCTION_PLANT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };
        case actionTypes.FETCH_PRODUCTION_PLANT_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleProductionPlant: action.payload,
                error: null
            };
        case actionTypes.CREATE_PRODUCTION_PLANT_SUCCESS:
        case actionTypes.UPDATE_PRODUCTION_PLANT_SUCCESS:
        case actionTypes.DELETE_PRODUCTION_PLANT_SUCCESS:
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

export default ProductionPlantReducer;
