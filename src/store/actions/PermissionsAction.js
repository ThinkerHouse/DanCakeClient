// actions.js
import * as actionTypes from './actionTypes';
import PermissionsController from '../../api/PermissionsController';

export const PermissionsInit = () => {
	return {
		type: actionTypes.PERMISSIONS_INIT,
	};
};

export const fetchPermissionsListSuccess = (Permissions) => {
	return {
		type: actionTypes.FETCH_PERMISSIONS_LIST_SUCCESS,
		payload: Permissions,
	};
};

export const fetchPermissionsListFailure = (error) => {
	return {
		type: actionTypes.FETCH_PERMISSIONS_LIST_FAILURE,
		payload: error,
	};
};

export const fetchPermissionsList = (page, searchParam = '', isProcess = true) => {
	return async (dispatch) => {
		try {
			dispatch(PermissionsInit());
			const result = await PermissionsController.list(page, searchParam)

			if (result.code !== undefined) {
				dispatch(fetchPermissionsListFailure('Something went wrong'));
				return;
			}
			if (result.status === 200) {
				if (isProcess) {
					const processData = result.data.data.map((item) => ({
						value: item.id,
						label: item.codename,
					}));
					dispatch(fetchPermissionsListSuccess(processData));
				} else {
					dispatch(fetchPermissionsListSuccess(result.data.data));
				}
			} else {
				dispatch(fetchPermissionsListFailure('Something went wrong'));
			}
		} catch (error) {
			dispatch(fetchPermissionsListFailure('Something went wrong'));
		}
	};
};