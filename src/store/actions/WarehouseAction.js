// actions.js
import * as actionTypes from './actionTypes';
import WarehouseController from '../../api/WarehouseController';

export const warehousesInit = () => {
    return {
        type: actionTypes.WAREHOUSE_INIT,
    };
};

export const fetchWarehousesListSuccess = (warehouses) => {
    return {
        type: actionTypes.FETCH_WAREHOUSES_LIST_SUCCESS,
        payload: warehouses,
    };
};

export const fetchWarehousesListFailure = (error) => {
    return {
        type: actionTypes.FETCH_WAREHOUSES_LIST_FAILURE,
        payload: error,
    };
};

export const fetchWarehouseSingleSuccess = (warehouse) => {
    return {
        type: actionTypes.FETCH_WAREHOUSE_SINGLE_SUCCESS,
        payload: warehouse,
    };
};

export const fetchWarehouseSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_WAREHOUSE_SINGLE_FAILURE,
        payload: error,
    };
};

export const createWarehouseSuccess = (message) => {
    return {
        type: actionTypes.CREATE_WAREHOUSE_SUCCESS,
        payload: message,
    };
};

export const createWarehouseFailure = (error) => {
    return {
        type: actionTypes.CREATE_WAREHOUSE_FAILURE,
        payload: error,
    };
};

export const updateWarehouseSuccess = (warehouse) => {
    return {
        type: actionTypes.UPDATE_WAREHOUSE_SUCCESS,
        payload: warehouse,
    };
};

export const updateWarehouseFailure = (error) => {
    return {
        type: actionTypes.UPDATE_WAREHOUSE_FAILURE,
        payload: error,
    };
};

export const deleteWarehouseSuccess = (warehouseId) => {
    return {
        type: actionTypes.DELETE_WAREHOUSE_SUCCESS,
        payload: warehouseId,
    };
};

export const deleteWarehouseFailure = (error) => {
    return {
        type: actionTypes.DELETE_WAREHOUSE_FAILURE,
        payload: error,
    };
};


export const fetchWarehousesList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(warehousesInit());
            const result = await WarehouseController.list(page, searchParam)

            if (result.code !== undefined) {
                dispatch(fetchWarehousesListFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchWarehousesListSuccess(processData));
                } else {
                    dispatch(fetchWarehousesListSuccess(result.data));
                }
            } else {
                dispatch(fetchWarehousesListFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchWarehousesListFailure('Something went wrong'));
        }
    };
};


export const fetchWarehouseSingle = (warehouseId) => {
    return async (dispatch) => {
        try {
            dispatch(warehousesInit());
            const result = await WarehouseController.single(warehouseId)

            if (result.code !== undefined) {
                dispatch(fetchWarehouseSingleFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(fetchWarehouseSingleSuccess(result.data.data));
            } else {
                dispatch(fetchWarehouseSingleFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchWarehouseSingleFailure('Something went wrong'));
        }
    };
};

export const createWarehouse = (warehouseData) => {
    return async (dispatch) => {
        try {
            dispatch(warehousesInit());
            const result = await WarehouseController.create(warehouseData)

            if (result.code !== undefined) {
                dispatch(createWarehouseFailure('Something went wrong'));
                return;
            }

            if (result.status === 201) {
                dispatch(createWarehouseSuccess(result.data.message));
            } else {
                dispatch(createWarehouseFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(createWarehouseFailure('Something went wrong'));
        }
    };
};

export const updateWarehouse = (warehouseId, updatedWarehouseData) => {
    return async (dispatch) => {
        try {
            dispatch(warehousesInit());
            const result = await WarehouseController.update(warehouseId, updatedWarehouseData)

            if (result.code !== undefined) {
                dispatch(updateWarehouseFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(updateWarehouseSuccess(result.data.message));
            } else {
                dispatch(updateWarehouseFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(updateWarehouseFailure('Something went wrong'));
        }
    };
};

export const deleteWarehouse = (warehouseId) => {
    return async (dispatch) => {
        dispatch(warehousesInit());
        WarehouseController.delete(warehouseId)
            .then((result) => {
                if (result instanceof Error) {
                    let errorMsg = result.response
                        ? result.response.data
                            ? result.response.data.message
                            : 'Something went wrong'
                        : 'Something went wrong';
                    dispatch(deleteWarehouseFailure(errorMsg));
                } else if (result.data.status !== 'Failed') {
                    dispatch(deleteWarehouseSuccess(result.data.message));
                } else {
                    dispatch(deleteWarehouseFailure('Something went wrong'));
                }
            })
            .catch((error) => {
                dispatch(deleteWarehouseFailure('Something went wrong'));
            });
    };
};
