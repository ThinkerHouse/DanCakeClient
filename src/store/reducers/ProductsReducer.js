import * as actionTypes from '../actions/actionTypes';

const initialState = {
    productsList: [],
    singleProduct: null,
    loading: false,
    error: null,
    success: null
};

const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCTS_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null
            };
        case actionTypes.FETCH_PRODUCTS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                productsList: action.payload,
                error: null
            };
        case actionTypes.FETCH_PRODUCTS_LIST_FAILURE:
        case actionTypes.FETCH_PRODUCT_SINGLE_FAILURE:
        case actionTypes.CREATE_PRODUCT_FAILURE:
        case actionTypes.UPDATE_PRODUCT_FAILURE:
        case actionTypes.DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };
        case actionTypes.FETCH_PRODUCT_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleProduct: action.payload,
                error: null
            };
        case actionTypes.CREATE_PRODUCT_SUCCESS:
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
        case actionTypes.DELETE_PRODUCT_SUCCESS:
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

export default ProductsReducer;
