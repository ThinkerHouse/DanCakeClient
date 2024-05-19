import * as actionTypes from '../actions/actionTypes';

const initialState = {
    warehousesList: [],
    singleWarehouse: null,
    loading: false,
    error: null,
    success: null
};

const WarehouseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WAREHOUSE_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null,
            };
        case actionTypes.FETCH_WAREHOUSES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                warehousesList: action.payload,
                error: null,
            };
        case actionTypes.FETCH_WAREHOUSES_LIST_FAILURE:
        case actionTypes.FETCH_WAREHOUSE_SINGLE_FAILURE:
        case actionTypes.CREATE_WAREHOUSE_FAILURE:
        case actionTypes.UPDATE_WAREHOUSE_FAILURE:
        case actionTypes.DELETE_WAREHOUSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null,
            };
        case actionTypes.FETCH_WAREHOUSE_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleWarehouse: action.payload,
                error: null,
            };
        case actionTypes.CREATE_WAREHOUSE_SUCCESS:
            return {
                ...state,
                loading: false,
                warehousesList: state.warehousesList,
                error: null,
                success: action.payload
            };
        case actionTypes.UPDATE_WAREHOUSE_SUCCESS:
        case actionTypes.DELETE_WAREHOUSE_SUCCESS:
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

export default WarehouseReducer;
