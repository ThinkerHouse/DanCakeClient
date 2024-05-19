// actions.js
import * as actionTypes from './actionTypes';
import ChecklistController from '../../api/ChecklistController';

export const checklistInit = () => {
    return {
        type: actionTypes.CHECKLIST_INIT,
    };
};

export const fetchChecklistListSuccess = (checklists) => {
    return {
        type: actionTypes.FETCH_CHECKLISTS_LIST_SUCCESS,
        payload: checklists,
    };
};

export const fetchChecklistListFailure = (error) => {
    return {
        type: actionTypes.FETCH_CHECKLISTS_LIST_FAILURE,
        payload: error,
    };
};

export const fetchChecklistSingleSuccess = (checklist) => {
    return {
        type: actionTypes.FETCH_CHECKLIST_SINGLE_SUCCESS,
        payload: checklist,
    };
};

export const fetchChecklistSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_CHECKLIST_SINGLE_FAILURE,
        payload: error,
    };
};

export const createChecklistSuccess = (message) => {
    return {
        type: actionTypes.CREATE_CHECKLIST_SUCCESS,
        payload: message,
    };
};

export const createChecklistFailure = (error) => {
    return {
        type: actionTypes.CREATE_CHECKLIST_FAILURE,
        payload: error,
    };
};

export const updateChecklistSuccess = (checklist) => {
    return {
        type: actionTypes.UPDATE_CHECKLIST_SUCCESS,
        payload: checklist,
    };
};

export const updateChecklistFailure = (error) => {
    return {
        type: actionTypes.UPDATE_CHECKLIST_FAILURE,
        payload: error,
    };
};

export const deleteChecklistSuccess = (checklistId) => {
    return {
        type: actionTypes.DELETE_CHECKLIST_SUCCESS,
        payload: checklistId,
    };
};

export const deleteChecklistFailure = (error) => {
    return {
        type: actionTypes.DELETE_CHECKLIST_FAILURE,
        payload: error,
    };
};


export const fetchChecklistList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(checklistInit());
            const result = await ChecklistController.list(page, searchParam)

            if (result.code !== undefined) {
                dispatch(fetchChecklistListFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchChecklistListSuccess(processData));
                } else {
                    dispatch(fetchChecklistListSuccess(result.data));
                }
            } else {
                dispatch(fetchChecklistListFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchChecklistListFailure('Something went wrong'));
        }
    };
};


export const fetchChecklistSingle = (checklistId) => {
    return async (dispatch) => {
        try {
            dispatch(checklistInit());
            const result = await ChecklistController.single(checklistId)

            if (result.code !== undefined) {
                dispatch(fetchChecklistSingleFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(fetchChecklistSingleSuccess(result.data.data));
            } else {
                dispatch(fetchChecklistSingleFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(fetchChecklistSingleFailure('Something went wrong'));
        }
    };
};

export const createChecklist = (checklistData) => {
    return async (dispatch) => {
        try {
            dispatch(checklistInit());
            const result = await ChecklistController.create(checklistData)

            if (result.code !== undefined) {
                dispatch(createChecklistFailure('Something went wrong'));
                return;
            }

            if (result.status === 201) {
                dispatch(createChecklistSuccess(result.data.message));
            } else {
                dispatch(createChecklistFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(createChecklistFailure('Something went wrong'));
        }
    };
};

export const updateChecklist = (checklistId, updatedChecklistData) => {
    return async (dispatch) => {
        try {
            dispatch(checklistInit());
            const result = await ChecklistController.update(checklistId, updatedChecklistData)

            if (result.code !== undefined) {
                dispatch(updateChecklistFailure('Something went wrong'));
                return;
            }
            if (result.status === 200) {
                dispatch(updateChecklistSuccess(result.data.message));
            } else {
                dispatch(updateChecklistFailure('Something went wrong'));
            }
        } catch (error) {
            dispatch(updateChecklistFailure('Something went wrong'));
        }
    };
};

export const deleteChecklist = (checklistId) => {
    return async (dispatch) => {
        dispatch(checklistInit());
        ChecklistController.delete(checklistId)
            .then((result) => {
                if (result instanceof Error) {
                    let errorMsg = result.response
                        ? result.response.data
                            ? result.response.data.message
                            : 'Something went wrong'
                        : 'Something went wrong';
                    dispatch(deleteChecklistFailure(errorMsg));
                } else if (result.data.status !== 'Failed') {
                    dispatch(deleteChecklistSuccess(result.data.message));
                } else {
                    dispatch(deleteChecklistFailure('Something went wrong'));
                }
            })
            .catch((error) => {
                dispatch(deleteChecklistFailure('Something went wrong'));
            });
    };
};
