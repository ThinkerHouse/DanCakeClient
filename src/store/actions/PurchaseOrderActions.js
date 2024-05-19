// actions.js
import * as actionTypes from './actionTypes';
import PurchaseOrderController from '../../api/PurchaseOrderController';

export const purchaseOrderInit = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_INIT,
    };
};

export const fetchPurchaseOrdersListSuccess = (purchaseOrders) => {
    return {
        type: actionTypes.FETCH_PURCHASE_ORDERS_LIST_SUCCESS,
        payload: purchaseOrders,
    };
};

export const fetchPurchaseOrdersListFailure = (error) => {
    return {
        type: actionTypes.FETCH_PURCHASE_ORDERS_LIST_FAILURE,
        payload: error,
    };
};

export const fetchPurchaseOrderSingleSuccess = (purchaseOrder) => {
    return {
        type: actionTypes.FETCH_PURCHASE_ORDER_SINGLE_SUCCESS,
        payload: purchaseOrder,
    };
};

export const fetchPurchaseOrderSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_PURCHASE_ORDER_SINGLE_FAILURE,
        payload: error,
    };
};

export const createPurchaseOrderSuccess = (message) => {
    return {
        type: actionTypes.CREATE_PURCHASE_ORDER_SUCCESS,
        payload: message,
    };
};

export const createPurchaseOrderFailure = (error) => {
    return {
        type: actionTypes.CREATE_PURCHASE_ORDER_FAILURE,
        payload: error,
    };
};

export const updatePurchaseOrderSuccess = (purchaseOrder) => {
    return {
        type: actionTypes.UPDATE_PURCHASE_ORDER_SUCCESS,
        payload: purchaseOrder,
    };
};

export const updatePurchaseOrderFailure = (error) => {
    return {
        type: actionTypes.UPDATE_PURCHASE_ORDER_FAILURE,
        payload: error,
    };
};

export const deletePurchaseOrderSuccess = (purchaseOrderId) => {
    return {
        type: actionTypes.DELETE_PURCHASE_ORDER_SUCCESS,
        payload: purchaseOrderId,
    };
};

export const deletePurchaseOrderFailure = (error) => {
    return {
        type: actionTypes.DELETE_PURCHASE_ORDER_FAILURE,
        payload: error,
    };
};


export const fetchPurchaseOrdersList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(purchaseOrderInit());
            const result = await PurchaseOrderController.list(page, searchParam)

            if (result.code !== undefined) {
                dispatch(fetchPurchaseOrdersListFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.tracking_id,
                    }));
                    dispatch(fetchPurchaseOrdersListSuccess(processData));
                } else {
                    dispatch(fetchPurchaseOrdersListSuccess(result.data));
                }
            } else {
                dispatch(fetchPurchaseOrdersListFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchPurchaseOrdersListFailure('Something went wrong'));
        }
    };
};


export const fetchPurchaseOrderSingle = (orderId) => {
    return async (dispatch) => {
        try {
            dispatch(purchaseOrderInit());
            const result = await PurchaseOrderController.single(orderId)

            if (result.code !== undefined) {
                dispatch(fetchPurchaseOrderSingleFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(fetchPurchaseOrderSingleSuccess(result.data.data));
            } else {
                dispatch(fetchPurchaseOrderSingleFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchPurchaseOrderSingleFailure('Something went wrong'));
        }
    };
};

export const createPurchaseOrder = (orderData) => {
    return async (dispatch) => {
        try {
            dispatch(purchaseOrderInit());
            const result = await PurchaseOrderController.create(orderData)

            if (result.code !== undefined) {
                dispatch(createPurchaseOrderFailure('Something went wrong'));
                return;
            }

            if (result.status === 201) {
                dispatch(createPurchaseOrderSuccess(result.data.message));
            } else {
                dispatch(createPurchaseOrderFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(createPurchaseOrderFailure('Something went wrong'));
        }
    };
};

export const updatePurchaseOrder = (orderId, updatedOrderData) => {
    return async (dispatch) => {
        try {
            dispatch(purchaseOrderInit());
            const result = await PurchaseOrderController.update(orderId, updatedOrderData)

            if (result.code !== undefined) {
                dispatch(updatePurchaseOrderFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(updatePurchaseOrderSuccess(result.data.message));
            } else {
                dispatch(updatePurchaseOrderFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(updatePurchaseOrderFailure('Something went wrong'));
        }
    };
};

export const deletePurchaseOrder = (orderId) => {
    return async (dispatch) => {
        dispatch(purchaseOrderInit());
        PurchaseOrderController.delete(orderId)
            .then((result) => {
                if (result instanceof Error) {
                    let errorMsg = result.response
                        ? result.response.data
                            ? result.response.data.message
                            : 'Something went wrong'
                        : 'Something went wrong';
                    dispatch(deletePurchaseOrderFailure(errorMsg));
                } else if (result.data.status !== 'Failed') {
                    dispatch(deletePurchaseOrderSuccess(result.data.message));
                } else {
                    dispatch(deletePurchaseOrderFailure('Something went wrong'));
                }
            })
            .catch((error) => {
                dispatch(deletePurchaseOrderFailure('Something went wrong'));
            });
    };
};
