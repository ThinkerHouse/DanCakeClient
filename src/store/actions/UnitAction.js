// actions.js
import * as actionTypes from './actionTypes';
import UnitController from '../../api/UnitController';

export const unitsInit = () => {
    return {
        type: actionTypes.UNIT_INIT,
    };
};

export const fetchUnitsListSuccess = (units) => {
    return {
        type: actionTypes.FETCH_UNITS_LIST_SUCCESS,
        payload: units,
    };
};

export const fetchUnitsListFailure = (error) => {
    return {
        type: actionTypes.FETCH_UNITS_LIST_FAILURE,
        payload: error,
    };
};

export const fetchUnitSingleSuccess = (unit) => {
    return {
        type: actionTypes.FETCH_UNIT_SINGLE_SUCCESS,
        payload: unit,
    };
};

export const fetchUnitSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_UNIT_SINGLE_FAILURE,
        payload: error,
    };
};

export const createUnitSuccess = (message) => {
    return {
        type: actionTypes.CREATE_UNIT_SUCCESS,
        payload: message,
    };
};

export const createUnitFailure = (error) => {
    return {
        type: actionTypes.CREATE_UNIT_FAILURE,
        payload: error,
    };
};

export const updateUnitSuccess = (unit) => {
    return {
        type: actionTypes.UPDATE_UNIT_SUCCESS,
        payload: unit,
    };
};

export const updateUnitFailure = (error) => {
    return {
        type: actionTypes.UPDATE_UNIT_FAILURE,
        payload: error,
    };
};

export const deleteUnitSuccess = (unitId) => {
    return {
        type: actionTypes.DELETE_UNIT_SUCCESS,
        payload: unitId,
    };
};

export const deleteUnitFailure = (error) => {
    return {
        type: actionTypes.DELETE_UNIT_FAILURE,
        payload: error,
    };
};


export const fetchUnitsList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(unitsInit());
            const result = await UnitController.list(page, searchParam)

            if (result.code !== undefined) {
                dispatch(fetchUnitsListFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchUnitsListSuccess(processData));
                } else {
                    dispatch(fetchUnitsListSuccess(result.data));
                }
            } else {
                dispatch(fetchUnitsListFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchUnitsListFailure('Something went wrong'));
        }
    };
};


export const fetchUnitSingle = (unitId) => {
    return async (dispatch) => {
        try {
            dispatch(unitsInit());
            const result = await UnitController.single(unitId)

            if (result.code !== undefined) {
                dispatch(fetchUnitSingleFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(fetchUnitSingleSuccess(result.data.data));
            } else {
                dispatch(fetchUnitSingleFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchUnitSingleFailure('Something went wrong'));
        }
    };
};

export const createUnit = (unitData) => {
    return async (dispatch) => {
        try {
            dispatch(unitsInit());
            const result = await UnitController.create(unitData)

            if (result.code !== undefined) {
                dispatch(createUnitFailure('Something went wrong'));
                return;
            }

            if (result.status === 201) {
                dispatch(createUnitSuccess(result.data.message));
            } else {
                dispatch(createUnitFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(createUnitFailure('Something went wrong'));
        }
    };
};

export const updateUnit = (unitId, updatedUnitData) => {
    return async (dispatch) => {
        try {
            dispatch(unitsInit());
            const result = await UnitController.update(unitId, updatedUnitData)

            if (result.code !== undefined) {
                dispatch(updateUnitFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(updateUnitSuccess(result.data.message));
            } else {
                dispatch(updateUnitFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(updateUnitFailure('Something went wrong'));
        }
    };
};

export const deleteUnit = (unitId) => {
    return async (dispatch) => {
        dispatch(unitsInit());
        UnitController.delete(unitId)
            .then((result) => {
                if (result instanceof Error) {
                    let errorMsg = result.response
                        ? result.response.data
                            ? result.response.data.message
                            : 'Something went wrong'
                        : 'Something went wrong';
                    dispatch(deleteUnitFailure(errorMsg));
                } else if (result.data.status !== 'Failed') {
                    dispatch(deleteUnitSuccess(result.data.message));
                } else {
                    dispatch(deleteUnitFailure('Something went wrong'));
                }
            })
            .catch((error) => {
                dispatch(deleteUnitFailure('Something went wrong'));
            });
    };
};
