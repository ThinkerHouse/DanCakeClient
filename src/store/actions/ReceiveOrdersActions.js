// receiveOrdersActions.js
import * as actionTypes from './actionTypes';
import ReceivedOrdersController from '../../api/ReceivedOrdersController';

export const receiveOrdersInit = () => {
    return {
        type: actionTypes.RECEIVE_ORDERS_INIT,
    };
};

export const fetchReceiveOrdersListSuccess = (receiveOrders) => {
    return {
        type: actionTypes.FETCH_RECEIVE_ORDERS_LIST_SUCCESS,
        payload: receiveOrders,
    };
};

export const fetchReceiveOrdersListFailure = (error) => {
    return {
        type: actionTypes.FETCH_RECEIVE_ORDERS_LIST_FAILURE,
        payload: error,
    };
};

export const fetchReceiveOrderSingleSuccess = (receiveOrder) => {
    return {
        type: actionTypes.FETCH_RECEIVE_ORDER_SINGLE_SUCCESS,
        payload: receiveOrder,
    };
};

export const fetchReceiveOrderSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_RECEIVE_ORDER_SINGLE_FAILURE,
        payload: error,
    };
};

export const createReceiveOrderSuccess = (message) => {
    return {
        type: actionTypes.CREATE_RECEIVE_ORDER_SUCCESS,
        payload: message,
    };
};

export const createReceiveOrderFailure = (error) => {
    return {
        type: actionTypes.CREATE_RECEIVE_ORDER_FAILURE,
        payload: error,
    };
};

export const updateReceiveOrderSuccess = (receiveOrder) => {
    return {
        type: actionTypes.UPDATE_RECEIVE_ORDER_SUCCESS,
        payload: receiveOrder,
    };
};

export const updateReceiveOrderFailure = (error) => {
    return {
        type: actionTypes.UPDATE_RECEIVE_ORDER_FAILURE,
        payload: error,
    };
};

export const deleteReceiveOrderSuccess = (receiveOrderId) => {
    return {
        type: actionTypes.DELETE_RECEIVE_ORDER_SUCCESS,
        payload: receiveOrderId,
    };
};

export const deleteReceiveOrderFailure = (error) => {
    return {
        type: actionTypes.DELETE_RECEIVE_ORDER_FAILURE,
        payload: error,
    };
};


export const fetchReceiveOrdersList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(receiveOrdersInit());
            const result = await ReceivedOrdersController.list(page, searchParam)

            if (result.code !== undefined) {
                dispatch(fetchReceiveOrdersListFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchReceiveOrdersListSuccess(processData));
                } else {
                    dispatch(fetchReceiveOrdersListSuccess(result.data));
                }
            } else {
                dispatch(fetchReceiveOrdersListFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchReceiveOrdersListFailure('Something went wrong'));
        }
    };
};


export const fetchReceiveOrderSingle = (receiveOrderId) => {
    return async (dispatch) => {
        try {
            dispatch(receiveOrdersInit());
            const result = await ReceivedOrdersController.single(receiveOrderId)

            if (result.code !== undefined) {
                dispatch(fetchReceiveOrderSingleFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(fetchReceiveOrderSingleSuccess(result.data.data));
            } else {
                dispatch(fetchReceiveOrderSingleFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchReceiveOrderSingleFailure('Something went wrong'));
        }
    };
};

export const createReceiveOrder = (receiveOrderData) => {
    return async (dispatch) => {
        try {
            dispatch(receiveOrdersInit());
            const result = await ReceivedOrdersController.create(receiveOrderData)

            if (result.code !== undefined) {
                dispatch(createReceiveOrderFailure('Something went wrong'));
                return;
            }

            if (result.status === 201) {
                dispatch(createReceiveOrderSuccess(result.data.message));
            } else {
                dispatch(createReceiveOrderFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(createReceiveOrderFailure('Something went wrong'));
        }
    };
};

export const updateReceiveOrder = (receiveOrderId, updatedReceiveOrderData) => {
    return async (dispatch) => {
        try {
            dispatch(receiveOrdersInit());
            const result = await ReceivedOrdersController.update(receiveOrderId, updatedReceiveOrderData)

            if (result.code !== undefined) {
                dispatch(updateReceiveOrderFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(updateReceiveOrderSuccess(result.data.message));
            } else {
                dispatch(updateReceiveOrderFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(updateReceiveOrderFailure('Something went wrong'));
        }
    };
};

export const deleteReceiveOrder = (receiveOrderId) => {
    return async (dispatch) => {
        dispatch(receiveOrdersInit());
        ReceivedOrdersController.delete(receiveOrderId)
            .then((result) => {
                if (result instanceof Error) {
                    let errorMsg = result.response
                        ? result.response.data
                            ? result.response.data.message
                            : 'Something went wrong'
                        : 'Something went wrong';
                    dispatch(deleteReceiveOrderFailure(errorMsg));
                } else if (result.data.status !== 'Failed') {
                    dispatch(deleteReceiveOrderSuccess(result.data.message));
                } else {
                    dispatch(deleteReceiveOrderFailure('Something went wrong'));
                }
            })
            .catch((error) => {
                dispatch(deleteReceiveOrderFailure('Something went wrong'));
            });
    };
};
