// actions/materialTypesActions.js
import * as actionTypes from './actionTypes';
import MaterialTypeController from '../../api/MaterialTypeController';

export const materialTypesInit = () => {
    return {
        type: actionTypes.MATERIAL_TYPE_INIT
    };
};

export const fetchMaterialTypesListSuccess = (materialTypes) => {
    return {
        type: actionTypes.FETCH_MATERIAL_TYPES_LIST_SUCCESS,
        payload: materialTypes
    };
};

export const fetchMaterialTypesListFailure = (error) => {
    return {
        type: actionTypes.FETCH_MATERIAL_TYPES_LIST_FAILURE,
        payload: error
    };
};

export const fetchMaterialTypeSingleSuccess = (materialType) => {
    return {
        type: actionTypes.FETCH_MATERIAL_TYPE_SINGLE_SUCCESS,
        payload: materialType
    };
};

export const fetchMaterialTypeSingleFailure = (error) => {
    return {
        type: actionTypes.FETCH_MATERIAL_TYPE_SINGLE_FAILURE,
        payload: error
    };
};

export const createMaterialTypeSuccess = (message) => {
    return {
        type: actionTypes.CREATE_MATERIAL_TYPE_SUCCESS,
        payload: message
    };
};

export const createMaterialTypeFailure = (error) => {
    return {
        type: actionTypes.CREATE_MATERIAL_TYPE_FAILURE,
        payload: error
    };
};

export const updateMaterialTypeSuccess = (message) => {
    return {
        type: actionTypes.UPDATE_MATERIAL_TYPE_SUCCESS,
        payload: message
    };
};

export const updateMaterialTypeFailure = (error) => {
    return {
        type: actionTypes.UPDATE_MATERIAL_TYPE_FAILURE,
        payload: error
    };
};

export const deleteMaterialTypeSuccess = (message) => {
    return {
        type: actionTypes.DELETE_MATERIAL_TYPE_SUCCESS,
        payload: message
    };
};

export const deleteMaterialTypeFailure = (error) => {
    return {
        type: actionTypes.DELETE_MATERIAL_TYPE_FAILURE,
        payload: error
    };
};

export const fetchMaterialTypesList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        try {
            dispatch(materialTypesInit());
            const result = await MaterialTypeController.list(page, searchParam);

            if (result.code !== undefined) {
                dispatch(fetchMaterialTypesListFailure('Something went wrong'));
                return;
            }

            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchMaterialTypesListSuccess(processData));
                } else {
                    dispatch(fetchMaterialTypesListSuccess(result.data));
                }
            } else {
                dispatch(fetchMaterialTypesListFailure('Failed to fetch material types'));
            }
        } catch (error) {
            dispatch(fetchMaterialTypesListFailure('Failed to fetch material types'));
        }
    };
};

export const fetchMaterialTypeSingle = (materialTypeId) => {
    return async (dispatch) => {
        try {
            dispatch(materialTypesInit());
            const result = await MaterialTypeController.single(materialTypeId);

            if (result.status === 200) {
                dispatch(fetchMaterialTypeSingleSuccess(result.data.data));
            } else {
                dispatch(fetchMaterialTypeSingleFailure('Failed to fetch material type'));
            }
        } catch (error) {
            dispatch(fetchMaterialTypeSingleFailure('Failed to fetch material type'));
        }
    };
};

export const createMaterialType = (materialTypeData) => {
    return async (dispatch) => {
        try {
            dispatch(materialTypesInit());
            const result = await MaterialTypeController.create(materialTypeData);

            if (result.status === 201) {
                dispatch(createMaterialTypeSuccess(result.data.message));
            } else {
                dispatch(createMaterialTypeFailure('Failed to create material type'));
            }
        } catch (error) {
            dispatch(createMaterialTypeFailure('Failed to create material type'));
        }
    };
};

export const updateMaterialType = (materialTypeId, updatedMaterialTypeData) => {
    return async (dispatch) => {
        try {
            dispatch(materialTypesInit());
            const result = await MaterialTypeController.update(materialTypeId, updatedMaterialTypeData);

            if (result.status === 200) {
                dispatch(updateMaterialTypeSuccess(result.data.message));
            } else {
                dispatch(updateMaterialTypeFailure('Failed to update material type'));
            }
        } catch (error) {
            dispatch(updateMaterialTypeFailure('Failed to update material type'));
        }
    };
};

export const deleteMaterialType = (materialTypeId) => {
    return async (dispatch) => {
        try {
            dispatch(materialTypesInit());
            const result = await MaterialTypeController.delete(materialTypeId);

            if (result.status === 200) {
                dispatch(deleteMaterialTypeSuccess(result.data.message));
            } else {
                dispatch(deleteMaterialTypeFailure('Failed to delete material type'));
            }
        } catch (error) {
            dispatch(deleteMaterialTypeFailure('Failed to delete material type'));
        }
    };
};

