// actions.js
import * as actionTypes from './actionTypes';
import DepartmentController from '../../api/DepartmentsController';

export const departmentsInit = () => {
    return {
        type: actionTypes.DEPARTMENT_INIT,
    };
};

export const fetchDepartmentsListSuccess = (departments) => {
    return {
        type: actionTypes.FETCH_DEPARTMENTS_LIST_SUCCESS,
        payload: departments,
    };
};

export const fetchDepartmentsListFailure = (error) => {
    return {
        type: actionTypes.FETCH_DEPARTMENTS_LIST_FAILURE,
        payload: error,
    };
};

export const fetchDepartmentSingleSuccess = (department) => {
    return {
        type: actionTypes.FETCH_DEPARTMENT_SINGLE_SUCCESS,
        payload: department,
    };
};

export const fetchDepartmentSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_DEPARTMENT_SINGLE_FAILURE,
        payload: error,
    };
};

export const createDepartmentSuccess = (message) => {
    return {
        type: actionTypes.CREATE_DEPARTMENT_SUCCESS,
        payload: message,
    };
};

export const createDepartmentFailure = (error) => {
    return {
        type: actionTypes.CREATE_DEPARTMENT_FAILURE,
        payload: error,
    };
};

export const updateDepartmentSuccess = (department) => {
    return {
        type: actionTypes.UPDATE_DEPARTMENT_SUCCESS,
        payload: department,
    };
};

export const updateDepartmentFailure = (error) => {
    return {
        type: actionTypes.UPDATE_DEPARTMENT_FAILURE,
        payload: error,
    };
};

export const deleteDepartmentSuccess = (departmentId) => {
    return {
        type: actionTypes.DELETE_DEPARTMENT_SUCCESS,
        payload: departmentId,
    };
};

export const deleteDepartmentFailure = (error) => {
    return {
        type: actionTypes.DELETE_DEPARTMENT_FAILURE,
        payload: error,
    };
};


export const fetchDepartmentsList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(departmentsInit());
            const result = await DepartmentController.list(page, searchParam)

            if (result.code !== undefined) {
                dispatch(fetchDepartmentsListFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchDepartmentsListSuccess(processData));
                } else {
                    dispatch(fetchDepartmentsListSuccess(result.data));
                }
            } else {
                dispatch(fetchDepartmentsListFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchDepartmentsListFailure('Something went wrong'));
        }
    };
};


export const fetchDepartmentSingle = (departmentId) => {
    return async (dispatch) => {
        try {
            dispatch(departmentsInit());
            const result = await DepartmentController.single(departmentId)

            if (result.code !== undefined) {
                dispatch(fetchDepartmentSingleFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(fetchDepartmentSingleSuccess(result.data.data));
            } else {
                dispatch(fetchDepartmentSingleFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchDepartmentSingleFailure('Something went wrong'));
        }
    };
};

export const createDepartment = (departmentData) => {
    return async (dispatch) => {
        try {
            dispatch(departmentsInit());
            const result = await DepartmentController.create(departmentData)

            if (result.code !== undefined) {
                dispatch(createDepartmentFailure('Something went wrong'));
                return;
            }

            if (result.status === 201) {
                dispatch(createDepartmentSuccess(result.data.message));
            } else {
                dispatch(createDepartmentFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(createDepartmentFailure('Something went wrong'));
        }
    };
};

export const updateDepartment = (departmentId, updatedDepartmentData) => {
    return async (dispatch) => {
        try {
            dispatch(departmentsInit());
            const result = await DepartmentController.update(departmentId, updatedDepartmentData)

            if (result.code !== undefined) {
                dispatch(updateDepartmentFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(updateDepartmentSuccess(result.data.message));
            } else {
                dispatch(updateDepartmentFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(updateDepartmentFailure('Something went wrong'));
        }
    };
};

export const deleteDepartment = (departmentId) => {
    return async (dispatch) => {
        dispatch(departmentsInit());
        DepartmentController.delete(departmentId)
            .then((result) => {
                if (result instanceof Error) {
                    let errorMsg = result.response
                        ? result.response.data
                            ? result.response.data.message
                            : 'Something went wrong'
                        : 'Something went wrong';
                    dispatch(deleteDepartmentFailure(errorMsg));
                } else if (result.data.status !== 'Failed') {
                    dispatch(deleteDepartmentSuccess(result.data.message));
                } else {
                    dispatch(deleteDepartmentFailure('Something went wrong'));
                }
            })
            .catch((error) => {
                dispatch(deleteDepartmentFailure('Something went wrong'));
            });
    };
};
