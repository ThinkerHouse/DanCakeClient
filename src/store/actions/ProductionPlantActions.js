import * as actionTypes from './actionTypes';
import ProductionPlantController from '../../api/ProductionPlantController';

export const productionPlantInit = () => {
    return {
        type: actionTypes.PRODUCTION_PLANT_INIT
    };
};

export const fetchProductionPlantsList = (page, searchParam = '', isProcess = false) => {
    return async (dispatch) => {
        dispatch(productionPlantInit());
        try {
            const result = await ProductionPlantController.list(page, searchParam);

            if (result.code !== undefined) {
                dispatch(fetchProductionPlantsListFailure('Something went wrong'));
                return;
            }

            if (result.status === 200) {
                if (isProcess) {
                    const processData = result.data.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));
                    dispatch(fetchProductionPlantsListSuccess(processData));
                } else {
                    dispatch(fetchProductionPlantsListSuccess(result.data));
                }
            } else {
                dispatch(fetchProductionPlantsListFailure('Failed to fetch production plants'));
            }
        } catch (error) {
            dispatch(fetchProductionPlantsListFailure('Failed to fetch production plants'));
        }
    };
};

const fetchProductionPlantsListSuccess = (productionPlants) => {
    return {
        type: actionTypes.FETCH_PRODUCTION_PLANTS_LIST_SUCCESS,
        payload: productionPlants
    };
};

const fetchProductionPlantsListFailure = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTION_PLANTS_LIST_FAILURE,
        payload: error
    };
};

export const fetchProductionPlant = (plantId) => {
    return async (dispatch) => {
        dispatch(productionPlantInit());
        try {
            const result = await ProductionPlantController.single(plantId);
            if (result.status === 200) {
                dispatch(fetchProductionPlantSuccess(result.data.data));
            } else {
                dispatch(fetchProductionPlantFailure('Failed to fetch production plant'));
            }
        } catch (error) {
            dispatch(fetchProductionPlantFailure('Failed to fetch production plant'));
        }
    };
};

const fetchProductionPlantSuccess = (productionPlant) => {
    return {
        type: actionTypes.FETCH_PRODUCTION_PLANT_SINGLE_SUCCESS,
        payload: productionPlant
    };
};

const fetchProductionPlantFailure = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTION_PLANT_SINGLE_FAILURE,
        payload: error
    };
};

export const createProductionPlant = (plantData) => {
    return async (dispatch) => {
        dispatch(productionPlantInit());
        try {
            const result = await ProductionPlantController.create(plantData);
            if (result.status === 201) {
                dispatch(createProductionPlantSuccess(result.data.message));
            } else {
                dispatch(createProductionPlantFailure('Failed to create production plant'));
            }
        } catch (error) {
            dispatch(createProductionPlantFailure('Failed to create production plant'));
        }
    };
};

const createProductionPlantSuccess = (message) => {
    return {
        type: actionTypes.CREATE_PRODUCTION_PLANT_SUCCESS,
        payload: message
    };
};

const createProductionPlantFailure = (error) => {
    return {
        type: actionTypes.CREATE_PRODUCTION_PLANT_FAILURE,
        payload: error
    };
};

export const updateProductionPlant = (plantId, updatedPlantData) => {
    return async (dispatch) => {
        dispatch(productionPlantInit());
        try {
            const result = await ProductionPlantController.update(plantId, updatedPlantData);
            if (result.status === 200) {
                dispatch(updateProductionPlantSuccess(result.data.message));
            } else {
                dispatch(updateProductionPlantFailure('Failed to update production plant'));
            }
        } catch (error) {
            dispatch(updateProductionPlantFailure('Failed to update production plant'));
        }
    };
};

const updateProductionPlantSuccess = (message) => {
    return {
        type: actionTypes.UPDATE_PRODUCTION_PLANT_SUCCESS,
        payload: message
    };
};

const updateProductionPlantFailure = (error) => {
    return {
        type: actionTypes.UPDATE_PRODUCTION_PLANT_FAILURE,
        payload: error
    };
};

export const deleteProductionPlant = (plantId) => {
    return async (dispatch) => {
        dispatch(productionPlantInit());
        try {
            const result = await ProductionPlantController.delete(plantId);
            if (result.status === 200) {
                dispatch(deleteProductionPlantSuccess(result.data));
            } else {
                dispatch(deleteProductionPlantFailure('Failed to delete production plant'));
            }
        } catch (error) {
            dispatch(deleteProductionPlantFailure('Failed to delete production plant'));
        }
    };
};

const deleteProductionPlantSuccess = (message) => {
    return {
        type: actionTypes.DELETE_PRODUCTION_PLANT_SUCCESS,
        payload: message
    };
};

const deleteProductionPlantFailure = (error) => {
    return {
        type: actionTypes.DELETE_PRODUCTION_PLANT_FAILURE,
        payload: error
    };
};
