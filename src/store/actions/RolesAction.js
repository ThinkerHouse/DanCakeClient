// actions.js
import * as actionTypes from './actionTypes';
import RolesController from '../../api/RolesController';

export const RolesInit = () => {
	return {
		type: actionTypes.ROLES_INIT,
	};
};

export const fetchRolesListSuccess = (Roless) => {
	return {
		type: actionTypes.FETCH_ROLES_LIST_SUCCESS,
		payload: Roless,
	};
};

export const fetchRolesListFailure = (error) => {
	return {
		type: actionTypes.FETCH_ROLES_LIST_FAILURE,
		payload: error,
	};
};


export const fetchRolesSingleSuccess = (Roles) => {
	return {
		type: actionTypes.FETCH_ROLES_SINGLE_SUCCESS,
		payload: Roles,
	};
};

export const fetchRolesSingleFailure = (error) => {
	return {
		type: actionTypes.FETCH_ROLES_SINGLE_FAILURE,
		payload: error,
	};
};

export const createRolesSuccess = (message) => {
	return {
		type: actionTypes.CREATE_ROLES_SUCCESS,
		payload: message,
	};
};

export const createRolesFailure = (error) => {
	return {
		type: actionTypes.CREATE_ROLES_FAILURE,
		payload: error,
	};
};

export const updateRolesSuccess = (Roles) => {
	return {
		type: actionTypes.UPDATE_ROLES_SUCCESS,
		payload: Roles,
	};
};

export const updateRolesFailure = (error) => {
	return {
		type: actionTypes.UPDATE_ROLES_FAILURE,
		payload: error,
	};
};

export const deleteRolesSuccess = (RolesId) => {
	return {
		type: actionTypes.DELETE_ROLES_SUCCESS,
		payload: RolesId,
	};
};

export const deleteRolesFailure = (error) => {
	return {
		type: actionTypes.DELETE_ROLES_FAILURE,
		payload: error,
	};
};


export const fetchRolesList = (page, searchParam = '', isProcess = false) => {
	return async (dispatch) => {
		try {
			dispatch(RolesInit());
			const result = await RolesController.list(page, searchParam)

			if (result.code !== undefined) {
				dispatch(fetchRolesListFailure('Something went wrong'));
				return;
			}
			if (result.status === 200) {
				// dispatch(fetchRolesListSuccess(result.data));
				if (isProcess) {
					const processData = result.data.data.map((item) => ({
						value: item.id,
						label: item.name,
					}));
					dispatch(fetchRolesListSuccess(processData));
				} else {
					dispatch(fetchRolesListSuccess(result.data));
				}
			} else {
				dispatch(fetchRolesListFailure('Something went wrong'));
			}
		} catch (error) {
			dispatch(fetchRolesListFailure('Something went wrong'));
		}
	};
};


export const fetchRolesSingle = (rolesId) => {
	return async (dispatch) => {
		try {
			dispatch(RolesInit());
			const result = await RolesController.single(rolesId)

			if (result.code !== undefined) {
				dispatch(fetchRolesSingleFailure('Something went wrong'));
				return;
			}
			if (result.status === 200) {
				dispatch(fetchRolesSingleSuccess(result.data.data));
			} else {
				dispatch(fetchRolesSingleFailure('Something went wrong'));
			}
		} catch (error) {
			dispatch(fetchRolesSingleFailure('Something went wrong'));
		}
	};
};

export const createRoles = (rolesData) => {
	return async (dispatch) => {
		try {
			dispatch(RolesInit());
			const result = await RolesController.create(rolesData)

			if (result.code !== undefined) {
				dispatch(createRolesFailure('Something went wrong'));
				return;
			}


			if (result.status === 201) {
				dispatch(createRolesSuccess(result.data.message));
			} else {
				dispatch(createRolesFailure('Something went wrong'));
			}
		} catch (error) {
			dispatch(createRolesFailure('Something went wrong'));
		}
	};
};

export const updateRoles = (rolesId, updatedRolesData) => {
	return async (dispatch) => {
		try {
			dispatch(RolesInit());
			const result = await RolesController.update(rolesId, updatedRolesData)

			if (result.code !== undefined) {
				dispatch(updateRolesFailure('Something went wrong'));
				return;
			}
			if (result.status === 200) {
				dispatch(updateRolesSuccess(result.data.message));
			} else {
				dispatch(updateRolesFailure('Something went wrong'));
			}
		} catch (error) {
			dispatch(updateRolesFailure('Something went wrong'));
		}
	};
};

export const deleteRoles = (RolesId) => {
	return async (dispatch) => {
		dispatch(RolesInit());
		RolesController.delete(RolesId)
			.then((result) => {
				if (result instanceof Error) {
					let errorMsg = result.response
						? result.response.data
							? result.response.data.message
							: 'Something went wrong'
						: 'Something went wrong';
					dispatch(deleteRolesFailure(errorMsg));
				} else if (result.data.status !== 'Failed') {
					dispatch(deleteRolesSuccess(result.data.message));
				} else {
					dispatch(deleteRolesFailure('Something went wrong1'));
				}
			})
			.catch((error) => {
				dispatch(deleteRolesFailure('Something went wrong3'));
			});
	};
};
