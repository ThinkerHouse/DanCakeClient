// UserActions.js
import * as actionTypes from "./actionTypes";
import UserController from "../../api/UsersController";

export const UserInit = () => {
	return {
		type: actionTypes.USER_INIT,
	};
};

export const fetchUserListSuccess = (Users) => {
	return {
		type: actionTypes.FETCH_USER_LIST_SUCCESS,
		payload: Users,
	};
};

export const fetchUserListFailure = (error) => {
	return {
		type: actionTypes.FETCH_USER_LIST_FAILURE,
		payload: error,
	};
};

export const fetchUserSingleSuccess = (User) => {
	return {
		type: actionTypes.FETCH_USER_SINGLE_SUCCESS,
		payload: User,
	};
};

export const fetchUserSingleFailure = (error) => {
	return {
		type: actionTypes.FETCH_USER_SINGLE_FAILURE,
		payload: error,
	};
};

export const createUserSuccess = (message) => {
	return {
		type: actionTypes.CREATE_USER_SUCCESS,
		payload: message,
	};
};

export const createUserFailure = (error) => {
	return {
		type: actionTypes.CREATE_USER_FAILURE,
		payload: error,
	};
};

export const updateUserSuccess = (User) => {
	return {
		type: actionTypes.UPDATE_USER_SUCCESS,
		payload: User,
	};
};

export const updateUserFailure = (error) => {
	return {
		type: actionTypes.UPDATE_USER_FAILURE,
		payload: error,
	};
};

export const fetchUserList = (page, searchParam = '', isProcess = false) => {
	return async (dispatch) => {
		try {
			dispatch(UserInit());
			const result = await UserController.list(page, searchParam)

			if (result.code !== undefined) {
				dispatch(fetchUserListFailure('Something went wrong'));
				return;
			}
			if (result.status === 200) {
				if (isProcess) {
					const processData = result.data.data.map((item) => ({
						value: item.id,
						label: item.username,
					}));
					dispatch(fetchUserListSuccess(processData));
				} else {
					dispatch(fetchUserListSuccess(result.data));
				}
			} else {
				dispatch(fetchUserListFailure('Something went wrong'));
			}
		} catch (error) {
			dispatch(fetchUserListFailure('Something went wrong'));
		}
	};
};

export const fetchUserSingle = (userId) => {
	return async (dispatch) => {
		try {
			dispatch(UserInit());
			const result = await UserController.single(userId)

			if (result.code !== undefined) {
				dispatch(fetchUserSingleFailure('Something went wrong'));
				return;
			}

			if (result.status === 200) {
				dispatch(fetchUserSingleSuccess(result.data.data));
			} else {
				dispatch(fetchUserSingleFailure(result.data.message));
			}
		} catch (error) {
			dispatch(fetchUserSingleFailure('Something went wrong'));
		}
	};
};

export const createUser = (userData, type) => {
	return async (dispatch) => {
		try {
			let formData = new FormData();
			formData.append("username", userData.username);
			formData.append("email", userData.email);
			formData.append("password", "123456");
			formData.append("first_name", userData.first_name);
			formData.append("last_name", userData.last_name);
			formData.append("phone", userData.phone);
			formData.append("dob", userData.dob);
			formData.append("address", userData.address);
			formData.append("user_type", userData.user_type);

			formData.append("is_active", userData.is_active);
			formData.append("image", userData.image[0]);

			if (Array.isArray(userData.groups)) {
				userData.groups.forEach(groupId => {
					formData.append("groups", groupId);
				});
			}

			dispatch(UserInit());
			const result = await UserController.create(formData);
			if (result.code !== undefined) {
				dispatch(createUserFailure('Something went wrong'));
				return;
			}

			if (result.status === 201) {
				dispatch(createUserSuccess(result.data.message));
			} else {
				dispatch(createUserFailure('Something went wrong'));
			}

		} catch (error) {
			dispatch(createUserFailure("Something went wrong"));
		}
	};
};

export const updateUser = (UserId, userData) => {
	return async (dispatch) => {
		try {
			let formData = new FormData();
			formData.append("username", userData.username);
			formData.append("email", userData.email);
			formData.append("password", "123456");
			formData.append("first_name", userData.first_name);
			formData.append("last_name", userData.last_name);
			formData.append("phone", userData.phone);
			formData.append("user_type", userData.user_type);

			if (userData.dob !== null) {
				formData.append("dob", userData.dob);
			}
			formData.append("address", userData.address);

			formData.append("is_active", userData.is_active);


			if (typeof userData.image !== 'string' && userData.image !== undefined) {
				formData.append("image", userData.image[0]);
			}

			if (userData.groups.length > 0) {
				userData.groups.forEach(groupId => {
					formData.append("groups", groupId);
				});
			}

			dispatch(UserInit());

			const result = await UserController.update(UserId, formData)

			if (result.code !== undefined) {
				dispatch(updateUserFailure('Something went wrong'));
				return;
			}
			if (result.status === 200) {
				dispatch(updateUserSuccess(result.data.message));
			} else {
				dispatch(updateUserFailure('Something went wrong'));
			}
		} catch (error) {
			dispatch(updateUserFailure("Something went wrong"));
		}
	};
};
