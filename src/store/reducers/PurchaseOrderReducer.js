import * as actionTypes from '../actions/actionTypes';

const initialState = {
    purchaseOrdersList: [],
    singlePurchaseOrder: null,
    loading: false,
    error: null,
    success: null
};

const PurchaseOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_ORDER_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null,
            };
        case actionTypes.FETCH_PURCHASE_ORDERS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                purchaseOrdersList: action.payload,
                error: null,
            };
        case actionTypes.FETCH_PURCHASE_ORDERS_LIST_FAILURE:
        case actionTypes.FETCH_PURCHASE_ORDER_SINGLE_FAILURE:
        case actionTypes.CREATE_PURCHASE_ORDER_FAILURE:
        case actionTypes.UPDATE_PURCHASE_ORDER_FAILURE:
        case actionTypes.DELETE_PURCHASE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null,
            };
        case actionTypes.FETCH_PURCHASE_ORDER_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singlePurchaseOrder: action.payload,
                error: null,
            };
        case actionTypes.CREATE_PURCHASE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                purchaseOrdersList: state.purchaseOrdersList,
                error: null,
                success: action.payload
            };
        case actionTypes.UPDATE_PURCHASE_ORDER_SUCCESS:
        case actionTypes.DELETE_PURCHASE_ORDER_SUCCESS:
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

export default PurchaseOrderReducer;
