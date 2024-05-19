import * as actionTypes from '../actions/actionTypes';

const initialState = {
    requisitionsList: [],
    singleRequisition: null,
    loading: false,
    error: null,
    success: null
};

// Reducer function for requisitions
const RequisitionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REQUISITION_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null
            };
        case actionTypes.FETCH_REQUISITIONS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                requisitionsList: action.payload,
                error: null
            };
        case actionTypes.FETCH_REQUISITIONS_LIST_FAILURE:
        case actionTypes.FETCH_REQUISITION_SINGLE_FAILURE:
        case actionTypes.CREATE_REQUISITION_FAILURE:
        case actionTypes.UPDATE_REQUISITION_FAILURE:
        case actionTypes.DELETE_REQUISITION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };
        case actionTypes.FETCH_REQUISITION_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleRequisition: action.payload,
                error: null
            };
        case actionTypes.CREATE_REQUISITION_SUCCESS:
        case actionTypes.UPDATE_REQUISITION_SUCCESS:
        case actionTypes.DELETE_REQUISITION_SUCCESS:
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

export default RequisitionReducer;
