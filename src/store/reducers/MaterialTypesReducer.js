import * as actionTypes from '../actions/actionTypes';

const initialState = {
    materialTypesList: [],
    singleMaterialType: null,
    loading: false,
    error: null,
    success: null
};

const MaterialTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MATERIAL_TYPE_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null,
            };
        case actionTypes.FETCH_MATERIAL_TYPES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                materialTypesList: action.payload,
                error: null,
            };
        case actionTypes.FETCH_MATERIAL_TYPES_LIST_FAILURE:
        case actionTypes.FETCH_MATERIAL_TYPE_SINGLE_FAILURE:
        case actionTypes.CREATE_MATERIAL_TYPE_FAILURE:
        case actionTypes.UPDATE_MATERIAL_TYPE_FAILURE:
        case actionTypes.DELETE_MATERIAL_TYPE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null,
            };
        case actionTypes.FETCH_MATERIAL_TYPE_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleMaterialType: action.payload,
                error: null,
            };
        case actionTypes.CREATE_MATERIAL_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                materialTypesList: state.materialTypesList,
                error: null,
                success: action.payload
            };
        case actionTypes.UPDATE_MATERIAL_TYPE_SUCCESS:
        case actionTypes.DELETE_MATERIAL_TYPE_SUCCESS:
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

export default MaterialTypeReducer;
