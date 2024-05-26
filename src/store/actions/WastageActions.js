import * as actionTypes from './actionTypes';
import WastageController from '../../api/WastageController';

export const wastagesInit = () => {
    return {
        type: actionTypes.WASTAGE_INIT,
    };
};

export const fetchWastagesListSuccess = (wastages) => {
    return {
        type: actionTypes.FETCH_WASTAGES_LIST_SUCCESS,
        payload: wastages,
    };
};

export const fetchWastagesListFailure = (error) => {
    return {
        type: actionTypes.FETCH_WASTAGES_LIST_FAILURE,
        payload: error,
    };
};

export const fetchWastageSingleSuccess = (wastage) => {
    return {
        type: actionTypes.FETCH_WASTAGE_SINGLE_SUCCESS,
        payload: wastage,
    };
};

export const fetchWastageSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_WASTAGE_SINGLE_FAILURE,
        payload: error,
    };
};

export const createWastageSuccess = (message) => {
    return {
        type: actionTypes.CREATE_WASTAGE_SUCCESS,
        payload: message,
    };
};

export const createWastageFailure = (error) => {
    return {
        type: actionTypes.CREATE_WASTAGE_FAILURE,
        payload: error,
    };
};

export const updateWastageSuccess = (wastage) => {
    return {
        type: actionTypes.UPDATE_WASTAGE_SUCCESS,
        payload: wastage,
    };
};

export const updateWastageFailure = (error) => {
    return {
        type: actionTypes.UPDATE_WASTAGE_FAILURE,
        payload: error,
    };
};

export const deleteWastageSuccess = (wastageId) => {
    return {
        type: actionTypes.DELETE_WASTAGE_SUCCESS,
        payload: wastageId,
    };
};

export const deleteWastageFailure = (error) => {
    return {
        type: actionTypes.DELETE_WASTAGE_FAILURE,
        payload: error,
    };
};

export const fetchWastagesList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(wastagesInit());
            const result = await WastageController.list(page, searchParam);

            if (result.code !== undefined) {
                dispatch(fetchWastagesListFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchWastagesListSuccess(processData));
                } else {
                    dispatch(fetchWastagesListSuccess(result.data));
                }
            } else {
                dispatch(fetchWastagesListFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchWastagesListFailure('Something went wrong'));
        }
    };
};

export const fetchWastageSingle = (wastageId) => {
    return async (dispatch) => {
        try {
            dispatch(wastagesInit());
            const result = await WastageController.single(wastageId);

            if (result.code !== undefined) {
                dispatch(fetchWastageSingleFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(fetchWastageSingleSuccess(result.data.data));
            } else {
                dispatch(fetchWastageSingleFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchWastageSingleFailure('Something went wrong'));
        }
    };
};

export const createWastage = (wastageData) => {
    return async (dispatch) => {
        try {
            dispatch(wastagesInit());
            const result = await WastageController.create(wastageData);

            if (result.code !== undefined) {
                dispatch(createWastageFailure('Something went wrong'));
                return;
            }

            if (result.status === 201) {
                dispatch(createWastageSuccess(result.data.message));
            } else {
                dispatch(createWastageFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(createWastageFailure('Something went wrong'));
        }
    };
};

export const updateWastage = (wastageId, updatedWastageData) => {
    return async (dispatch) => {
        try {
            dispatch(wastagesInit());
            const result = await WastageController.update(wastageId, updatedWastageData);

            if (result.code !== undefined) {
                dispatch(updateWastageFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(updateWastageSuccess(result.data.message));
            } else {
                dispatch(updateWastageFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(updateWastageFailure('Something went wrong'));
        }
    };
};

export const deleteWastage = (wastageId) => {
    return async (dispatch) => {
        dispatch(wastagesInit());
        WastageController.delete(wastageId)
            .then((result) => {
                if (result instanceof Error) {
                    let errorMsg = result.response
                        ? result.response.data
                            ? result.response.data.message
                            : 'Something went wrong'
                        : 'Something went wrong';
                    dispatch(deleteWastageFailure(errorMsg));
                } else if (result.data.status !== 'Failed') {
                    dispatch(deleteWastageSuccess(result.data.message));
                } else {
                    dispatch(deleteWastageFailure('Something went wrong'));
                }
            })
            .catch((error) => {
                dispatch(deleteWastageFailure('Something went wrong'));
            });
    };
};
