import * as actionTypes from '../actions/actionTypes';

const initialState = {
    receiveOrdersList: [],
    singleReceiveOrder: null,
    loading: false,
    error: null,
    success: null
};

const ReceiveOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_ORDERS_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null
            };
        case actionTypes.FETCH_RECEIVE_ORDERS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                receiveOrdersList: action.payload,
                error: null
            };
        case actionTypes.FETCH_RECEIVE_ORDERS_LIST_FAILURE:
        case actionTypes.FETCH_RECEIVE_ORDER_SINGLE_FAILURE:
        case actionTypes.CREATE_RECEIVE_ORDER_FAILURE:
        case actionTypes.UPDATE_RECEIVE_ORDER_FAILURE:
        case actionTypes.DELETE_RECEIVE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };
        case actionTypes.FETCH_RECEIVE_ORDER_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleReceiveOrder: action.payload,
                error: null
            };
        case actionTypes.CREATE_RECEIVE_ORDER_SUCCESS:
        case actionTypes.UPDATE_RECEIVE_ORDER_SUCCESS:
        case actionTypes.DELETE_RECEIVE_ORDER_SUCCESS:
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

export default ReceiveOrderReducer;
