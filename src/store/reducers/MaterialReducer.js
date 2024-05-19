import * as actionTypes from '../actions/actionTypes';

// Initial state for materials
const initialState = {
    materialsList: [],
    processedMaterialsList: [],
    singleMaterial: null,
    loading: false,
    error: null,
    success: null
};

// Reducer function for materials
const MaterialReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MATERIAL_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null
            };
        case actionTypes.FETCH_MATERIALS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                materialsList: action.payload,
                error: null
            };

        case actionTypes.FETCH_MATERIALS_PROCESS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                processedMaterialsList: action.payload,
                error: null
            };
        case actionTypes.FETCH_MATERIALS_LIST_FAILURE:
        case actionTypes.FETCH_MATERIALS_PROCESS_LIST_FAILURE:
        case actionTypes.FETCH_MATERIAL_SINGLE_FAILURE:
        case actionTypes.CREATE_MATERIAL_FAILURE:
        case actionTypes.UPDATE_MATERIAL_FAILURE:
        case actionTypes.DELETE_MATERIAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };
        case actionTypes.FETCH_MATERIAL_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleMaterial: action.payload,
                error: null
            };
        case actionTypes.CREATE_MATERIAL_SUCCESS:
        case actionTypes.UPDATE_MATERIAL_SUCCESS:
        case actionTypes.DELETE_MATERIAL_SUCCESS:
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

export default MaterialReducer;
