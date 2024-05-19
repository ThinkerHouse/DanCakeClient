import * as actionTypes from '../actions/actionTypes';

const initialState = {
    departmentsList: [],
    singleDepartment: null,
    loading: false,
    error: null,
    success: null
};

const DepartmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DEPARTMENT_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null,
            };
        case actionTypes.FETCH_DEPARTMENTS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                departmentsList: action.payload,
                error: null,
            };
        case actionTypes.FETCH_DEPARTMENTS_LIST_FAILURE:
        case actionTypes.FETCH_DEPARTMENT_SINGLE_FAILURE:
        case actionTypes.CREATE_DEPARTMENT_FAILURE:
        case actionTypes.UPDATE_DEPARTMENT_FAILURE:
        case actionTypes.DELETE_DEPARTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null,
            };
        case actionTypes.FETCH_DEPARTMENT_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleDepartment: action.payload,
                error: null,
            };
        case actionTypes.CREATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                departmentsList: state.departmentsList,
                error: null,
                success: action.payload
            };
        case actionTypes.UPDATE_DEPARTMENT_SUCCESS:
        case actionTypes.DELETE_DEPARTMENT_SUCCESS:
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

export default DepartmentReducer;
