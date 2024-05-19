// productionActions.js
import * as actionTypes from './actionTypes';
import ProductionController from '../../api/ProductionController';

export const productionsInit = () => {
    return {
        type: actionTypes.PRODUCTION_INIT,
    };
};

export const fetchProductionsListSuccess = (productions) => {
    return {
        type: actionTypes.FETCH_PRODUCTIONS_LIST_SUCCESS,
        payload: productions,
    };
};

export const fetchProductionsListFailure = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTIONS_LIST_FAILURE,
        payload: error,
    };
};

export const fetchProductionSingleSuccess = (production) => {
    return {
        type: actionTypes.FETCH_PRODUCTION_SINGLE_SUCCESS,
        payload: production,
    };
};

export const fetchProductionSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTION_SINGLE_FAILURE,
        payload: error,
    };
};

export const createProductionSuccess = (message) => {
    return {
        type: actionTypes.CREATE_PRODUCTION_SUCCESS,
        payload: message,
    };
};

export const createProductionFailure = (error) => {
    return {
        type: actionTypes.CREATE_PRODUCTION_FAILURE,
        payload: error,
    };
};

export const updateProductionSuccess = (production) => {
    return {
        type: actionTypes.UPDATE_PRODUCTION_SUCCESS,
        payload: production,
    };
};

export const updateProductionFailure = (error) => {
    return {
        type: actionTypes.UPDATE_PRODUCTION_FAILURE,
        payload: error,
    };
};

export const deleteProductionSuccess = (productionId) => {
    return {
        type: actionTypes.DELETE_PRODUCTION_SUCCESS,
        payload: productionId,
    };
};

export const deleteProductionFailure = (error) => {
    return {
        type: actionTypes.DELETE_PRODUCTION_FAILURE,
        payload: error,
    };
};


export const fetchProductionsList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(productionsInit());
            const result = await ProductionController.list(page, searchParam)

            if (result.code !== undefined) {
                dispatch(fetchProductionsListFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchProductionsListSuccess(processData));
                } else {
                    dispatch(fetchProductionsListSuccess(result.data));
                }
            } else {
                dispatch(fetchProductionsListFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchProductionsListFailure('Something went wrong'));
        }
    };
};


export const fetchProductionSingle = (productionId) => {
    return async (dispatch) => {
        try {
            dispatch(productionsInit());
            const result = await ProductionController.single(productionId)

            if (result.code !== undefined) {
                dispatch(fetchProductionSingleFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(fetchProductionSingleSuccess(result.data.data));
            } else {
                dispatch(fetchProductionSingleFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchProductionSingleFailure('Something went wrong'));
        }
    };
};

export const createProduction = (productionData) => {
    return async (dispatch) => {
        try {
            dispatch(productionsInit());
            const result = await ProductionController.create(productionData)

            if (result.code !== undefined) {
                dispatch(createProductionFailure('Something went wrong'));
                return;
            }

            if (result.status === 201) {
                dispatch(createProductionSuccess(result.data.message));
            } else {
                dispatch(createProductionFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(createProductionFailure('Something went wrong'));
        }
    };
};

export const updateProduction = (productionId, updatedProductionData) => {
    return async (dispatch) => {
        try {
            dispatch(productionsInit());
            const result = await ProductionController.update(productionId, updatedProductionData)

            if (result.code !== undefined) {
                dispatch(updateProductionFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(updateProductionSuccess(result.data.message));
            } else {
                dispatch(updateProductionFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(updateProductionFailure('Something went wrong'));
        }
    };
};

export const deleteProduction = (productionId) => {
    return async (dispatch) => {
        dispatch(productionsInit());
        ProductionController.delete(productionId)
            .then((result) => {
                if (result instanceof Error) {
                    let errorMsg = result.response
                        ? result.response.data
                            ? result.response.data.message
                            : 'Something went wrong'
                        : 'Something went wrong';
                    dispatch(deleteProductionFailure(errorMsg));
                } else if (result.data.status !== 'Failed') {
                    dispatch(deleteProductionSuccess(result.data.message));
                } else {
                    dispatch(deleteProductionFailure('Something went wrong'));
                }
            })
            .catch((error) => {
                dispatch(deleteProductionFailure('Something went wrong'));
            });
    };
};
