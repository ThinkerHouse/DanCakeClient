import * as actionTypes from '../actions/actionTypes';

const initialState = {
    checklistsList: [],
    singleChecklist: null,
    loading: false,
    error: null,
    success: null
};

const CheckListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHECKLIST_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null,
            };
        case actionTypes.FETCH_CHECKLISTS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                checklistsList: action.payload,
                error: null,
            };
        case actionTypes.FETCH_CHECKLISTS_LIST_FAILURE:
        case actionTypes.FETCH_CHECKLIST_SINGLE_FAILURE:
        case actionTypes.CREATE_CHECKLIST_FAILURE:
        case actionTypes.UPDATE_CHECKLIST_FAILURE:
        case actionTypes.DELETE_CHECKLIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null,
            };
        case actionTypes.FETCH_CHECKLIST_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleChecklist: action.payload,
                error: null,
            };
        case actionTypes.CREATE_CHECKLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                checklistsList: state.checklistsList,
                error: null,
                success: action.payload
            };
        case actionTypes.UPDATE_CHECKLIST_SUCCESS:
        case actionTypes.DELETE_CHECKLIST_SUCCESS:
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

export default CheckListReducer;
