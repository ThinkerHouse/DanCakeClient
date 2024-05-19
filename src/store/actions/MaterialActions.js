// actions/MaterialActions.js

import * as actionTypes from './actionTypes';
import MaterialController from '../../api/MaterialController';

export const materialInit = () => {
    return {
        type: actionTypes.MATERIAL_INIT
    };
};

export const fetchMaterialsList = (page, searchParam = '') => {
    console.log('oh yeah');
    return async (dispatch) => {
        dispatch(materialInit());
        try {
            const result = await MaterialController.list(page, searchParam);
            if (result.status === 200) {
                dispatch(fetchMaterialsListSuccess(result.data));
            } else {
                dispatch(fetchMaterialsListFailure('Failed to fetch materials'));
            }
        } catch (error) {
            dispatch(fetchMaterialsListFailure('Failed to fetch materials'));
        }
    };
};

const fetchMaterialsListSuccess = (materials) => {
    return {
        type: actionTypes.FETCH_MATERIALS_LIST_SUCCESS,
        payload: materials
    };
};

const fetchMaterialsListFailure = (error) => {
    return {
        type: actionTypes.FETCH_MATERIALS_LIST_FAILURE,
        payload: error
    };
};

export const fetchMaterialsProcessList = () => {
    return async (dispatch) => {
        dispatch(materialInit());
        try {
            const result = await MaterialController.list('', '');
            if (result.status === 200) {
                const processData = result.data.data.map((item) => ({
                    value: item.id,
                    label: item.name,
                }));
                dispatch(fetchMaterialsProcessListSuccess(processData));

            } else {
                dispatch(fetchMaterialsProcessListFailure('Failed to fetch materials'));
            }
        } catch (error) {
            dispatch(fetchMaterialsProcessListFailure('Failed to fetch materials'));
        }
    };
};

const fetchMaterialsProcessListSuccess = (materials) => {
    return {
        type: actionTypes.FETCH_MATERIALS_PROCESS_LIST_SUCCESS,
        payload: materials
    };
};

const fetchMaterialsProcessListFailure = (error) => {
    return {
        type: actionTypes.FETCH_MATERIALS_PROCESS_LIST_FAILURE,
        payload: error
    };
};

export const fetchMaterial = (materialId) => {
    return async (dispatch) => {
        dispatch(materialInit());
        try {
            const result = await MaterialController.single(materialId);
            if (result.status === 200) {
                dispatch(fetchMaterialSuccess(result.data.data));
            } else {
                dispatch(fetchMaterialFailure('Failed to fetch material'));
            }
        } catch (error) {
            dispatch(fetchMaterialFailure('Failed to fetch material'));
        }
    };
};

const fetchMaterialSuccess = (material) => {
    return {
        type: actionTypes.FETCH_MATERIAL_SINGLE_SUCCESS,
        payload: material
    };
};

const fetchMaterialFailure = (error) => {
    return {
        type: actionTypes.FETCH_MATERIAL_SINGLE_FAILURE,
        payload: error
    };
};

export const createMaterial = (materialData) => {
    return async (dispatch) => {
        dispatch(materialInit());
        try {
            const result = await MaterialController.create(materialData);
            if (result.status === 201) {
                dispatch(createMaterialSuccess(result.data.message));
            } else {
                dispatch(createMaterialFailure('Failed to create material'));
            }
        } catch (error) {
            dispatch(createMaterialFailure('Failed to create material'));
        }
    };
};

const createMaterialSuccess = (message) => {
    return {
        type: actionTypes.CREATE_MATERIAL_SUCCESS,
        payload: message
    };
};

const createMaterialFailure = (error) => {
    return {
        type: actionTypes.CREATE_MATERIAL_FAILURE,
        payload: error
    };
};

export const updateMaterial = (materialId, updatedMaterialData) => {
    return async (dispatch) => {
        dispatch(materialInit());
        try {
            const result = await MaterialController.update(materialId, updatedMaterialData);
            if (result.status === 200) {
                dispatch(updateMaterialSuccess(result.data.message));
            } else {
                dispatch(updateMaterialFailure('Failed to update material'));
            }
        } catch (error) {
            dispatch(updateMaterialFailure('Failed to update material'));
        }
    };
};

const updateMaterialSuccess = (message) => {
    return {
        type: actionTypes.UPDATE_MATERIAL_SUCCESS,
        payload: message
    };
};

const updateMaterialFailure = (error) => {
    return {
        type: actionTypes.UPDATE_MATERIAL_FAILURE,
        payload: error
    };
};

export const deleteMaterial = (materialId) => {
    return async (dispatch) => {
        dispatch(materialInit());
        try {
            const result = await MaterialController.delete(materialId);
            if (result.status === 200) {
                dispatch(deleteMaterialSuccess(result.data));
            } else {
                dispatch(deleteMaterialFailure('Failed to delete material'));
            }
        } catch (error) {
            dispatch(deleteMaterialFailure('Failed to delete material'));
        }
    };
};

const deleteMaterialSuccess = (message) => {
    return {
        type: actionTypes.DELETE_MATERIAL_SUCCESS,
        payload: message
    };
};

const deleteMaterialFailure = (error) => {
    return {
        type: actionTypes.DELETE_MATERIAL_FAILURE,
        payload: error
    };
};
