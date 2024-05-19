// requisitionActions.js
import * as actionTypes from './actionTypes';
import RequisitionController from '../../api/RequisitionController';

export const requisitionsInit = () => {
    return {
        type: actionTypes.REQUISITION_INIT,
    };
};

export const fetchRequisitionsListSuccess = (requisitions) => {
    return {
        type: actionTypes.FETCH_REQUISITIONS_LIST_SUCCESS,
        payload: requisitions,
    };
};

export const fetchRequisitionsListFailure = (error) => {
    return {
        type: actionTypes.FETCH_REQUISITIONS_LIST_FAILURE,
        payload: error,
    };
};

export const fetchRequisitionSingleSuccess = (requisition) => {
    return {
        type: actionTypes.FETCH_REQUISITION_SINGLE_SUCCESS,
        payload: requisition,
    };
};

export const fetchRequisitionSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_REQUISITION_SINGLE_FAILURE,
        payload: error,
    };
};

export const createRequisitionSuccess = (message) => {
    return {
        type: actionTypes.CREATE_REQUISITION_SUCCESS,
        payload: message,
    };
};

export const createRequisitionFailure = (error) => {
    return {
        type: actionTypes.CREATE_REQUISITION_FAILURE,
        payload: error,
    };
};

export const updateRequisitionSuccess = (requisition) => {
    return {
        type: actionTypes.UPDATE_REQUISITION_SUCCESS,
        payload: requisition,
    };
};

export const updateRequisitionFailure = (error) => {
    return {
        type: actionTypes.UPDATE_REQUISITION_FAILURE,
        payload: error,
    };
};

export const deleteRequisitionSuccess = (requisitionId) => {
    return {
        type: actionTypes.DELETE_REQUISITION_SUCCESS,
        payload: requisitionId,
    };
};

export const deleteRequisitionFailure = (error) => {
    return {
        type: actionTypes.DELETE_REQUISITION_FAILURE,
        payload: error,
    };
};


export const fetchRequisitionsList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(requisitionsInit());
            const result = await RequisitionController.list(page, searchParam)

            if (result.code !== undefined) {
                dispatch(fetchRequisitionsListFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchRequisitionsListSuccess(processData));
                } else {
                    dispatch(fetchRequisitionsListSuccess(result.data));
                }
            } else {
                dispatch(fetchRequisitionsListFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchRequisitionsListFailure('Something went wrong'));
        }
    };
};


export const fetchRequisitionSingle = (requisitionId) => {
    return async (dispatch) => {
        try {
            dispatch(requisitionsInit());
            const result = await RequisitionController.single(requisitionId)

            if (result.code !== undefined) {
                dispatch(fetchRequisitionSingleFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(fetchRequisitionSingleSuccess(result.data.data));
            } else {
                dispatch(fetchRequisitionSingleFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchRequisitionSingleFailure('Something went wrong'));
        }
    };
};

export const createRequisition = (requisitionData) => {
    return async (dispatch) => {
        try {
            dispatch(requisitionsInit());
            const result = await RequisitionController.create(requisitionData)

            if (result.code !== undefined) {
                dispatch(createRequisitionFailure('Something went wrong'));
                return;
            }

            if (result.status === 201) {
                dispatch(createRequisitionSuccess(result.data.message));
            } else {
                dispatch(createRequisitionFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(createRequisitionFailure('Something went wrong'));
        }
    };
};

export const updateRequisition = (requisitionId, updatedRequisitionData) => {
    return async (dispatch) => {
        try {
            dispatch(requisitionsInit());
            const result = await RequisitionController.update(requisitionId, updatedRequisitionData)

            if (result.code !== undefined) {
                dispatch(updateRequisitionFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(updateRequisitionSuccess(result.data.message));
            } else {
                dispatch(updateRequisitionFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(updateRequisitionFailure('Something went wrong'));
        }
    };
};

export const deleteRequisition = (requisitionId) => {
    return async (dispatch) => {
        dispatch(requisitionsInit());
        RequisitionController.delete(requisitionId)
            .then((result) => {
                if (result instanceof Error) {
                    let errorMsg = result.response
                        ? result.response.data
                            ? result.response.data.message
                            : 'Something went wrong'
                        : 'Something went wrong';
                    dispatch(deleteRequisitionFailure(errorMsg));
                } else if (result.data.status !== 'Failed') {
                    dispatch(deleteRequisitionSuccess(result.data.message));
                } else {
                    dispatch(deleteRequisitionFailure('Something went wrong'));
                }
            })
            .catch((error) => {
                dispatch(deleteRequisitionFailure('Something went wrong'));
            });
    };
};
