import * as actionTypes from '../actions/actionTypes';

// Initial state for recipes
const initialState = {
    recipesList: [],
    singleRecipe: null,
    loading: false,
    error: null,
    success: null
};

// Reducer function for recipes
const RecipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RECIPE_INIT:
            return {
                ...state,
                loading: true,
                error: null,
                success: null
            };
        case actionTypes.FETCH_RECIPES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                recipesList: action.payload,
                error: null
            };
        case actionTypes.FETCH_RECIPES_LIST_FAILURE:
        case actionTypes.FETCH_RECIPE_SINGLE_FAILURE:
        case actionTypes.CREATE_RECIPE_FAILURE:
        case actionTypes.UPDATE_RECIPE_FAILURE:
        case actionTypes.DELETE_RECIPE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: null
            };
        case actionTypes.FETCH_RECIPE_SINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleRecipe: action.payload,
                error: null
            };
        case actionTypes.CREATE_RECIPE_SUCCESS:
        case actionTypes.UPDATE_RECIPE_SUCCESS:
        case actionTypes.DELETE_RECIPE_SUCCESS:
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

export default RecipeReducer;
