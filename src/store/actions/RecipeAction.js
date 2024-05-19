// recipeActions.js
import * as actionTypes from './actionTypes';
import RecipeController from '../../api/RecipeController';

export const recipesInit = () => {
    return {
        type: actionTypes.RECIPE_INIT,
    };
};

export const fetchRecipesListSuccess = (recipes) => {
    return {
        type: actionTypes.FETCH_RECIPES_LIST_SUCCESS,
        payload: recipes,
    };
};

export const fetchRecipesListFailure = (error) => {
    return {
        type: actionTypes.FETCH_RECIPES_LIST_FAILURE,
        payload: error,
    };
};

export const fetchRecipeSingleSuccess = (recipe) => {
    return {
        type: actionTypes.FETCH_RECIPE_SINGLE_SUCCESS,
        payload: recipe,
    };
};

export const fetchRecipeSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_RECIPE_SINGLE_FAILURE,
        payload: error,
    };
};

export const createRecipeSuccess = (message) => {
    return {
        type: actionTypes.CREATE_RECIPE_SUCCESS,
        payload: message,
    };
};

export const createRecipeFailure = (error) => {
    return {
        type: actionTypes.CREATE_RECIPE_FAILURE,
        payload: error,
    };
};

export const updateRecipeSuccess = (recipe) => {
    return {
        type: actionTypes.UPDATE_RECIPE_SUCCESS,
        payload: recipe,
    };
};

export const updateRecipeFailure = (error) => {
    return {
        type: actionTypes.UPDATE_RECIPE_FAILURE,
        payload: error,
    };
};

export const deleteRecipeSuccess = (recipeId) => {
    return {
        type: actionTypes.DELETE_RECIPE_SUCCESS,
        payload: recipeId,
    };
};

export const deleteRecipeFailure = (error) => {
    return {
        type: actionTypes.DELETE_RECIPE_FAILURE,
        payload: error,
    };
};


export const fetchRecipesList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(recipesInit());
            const result = await RecipeController.list(page, searchParam)

            if (result.code !== undefined) {
                dispatch(fetchRecipesListFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchRecipesListSuccess(processData));
                } else {
                    dispatch(fetchRecipesListSuccess(result.data));
                }
            } else {
                dispatch(fetchRecipesListFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchRecipesListFailure('Something went wrong'));
        }
    };
};


export const fetchRecipeSingle = (recipeId) => {
    return async (dispatch) => {
        try {
            dispatch(recipesInit());
            const result = await RecipeController.single(recipeId)

            if (result.code !== undefined) {
                dispatch(fetchRecipeSingleFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(fetchRecipeSingleSuccess(result.data.data));
            } else {
                dispatch(fetchRecipeSingleFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchRecipeSingleFailure('Something went wrong'));
        }
    };
};

export const createRecipe = (recipeData) => {
    return async (dispatch) => {
        try {
            dispatch(recipesInit());
            const result = await RecipeController.create(recipeData)

            if (result.code !== undefined) {
                dispatch(createRecipeFailure('Something went wrong'));
                return;
            }

            if (result.status === 201) {
                dispatch(createRecipeSuccess(result.data.message));
            } else {
                dispatch(createRecipeFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(createRecipeFailure('Something went wrong'));
        }
    };
};

export const updateRecipe = (recipeId, updatedRecipeData) => {
    return async (dispatch) => {
        try {
            dispatch(recipesInit());
            const result = await RecipeController.update(recipeId, updatedRecipeData)

            if (result.code !== undefined) {
                dispatch(updateRecipeFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(updateRecipeSuccess(result.data.message));
            } else {
                dispatch(updateRecipeFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(updateRecipeFailure('Something went wrong'));
        }
    };
};

export const deleteRecipe = (recipeId) => {
    return async (dispatch) => {
        dispatch(recipesInit());
        RecipeController.delete(recipeId)
            .then((result) => {
                if (result instanceof Error) {
                    let errorMsg = result.response
                        ? result.response.data
                            ? result.response.data.message
                            : 'Something went wrong'
                        : 'Something went wrong';
                    dispatch(deleteRecipeFailure(errorMsg));
                } else if (result.data.status !== 'Failed') {
                    dispatch(deleteRecipeSuccess(result.data.message));
                } else {
                    dispatch(deleteRecipeFailure('Something went wrong'));
                }
            })
            .catch((error) => {
                dispatch(deleteRecipeFailure('Something went wrong'));
            });
    };
};
