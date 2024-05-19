import * as actionTypes from './actionTypes';
import AuthController from './../../api/AuthController';

export const authInit = () => {
	return {
		type: actionTypes.AUTH_INIT,
	};
};

export const authSuccess = (token, userData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userData: userData
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};


export const authLogin = (data) => {
	return async (dispatch) => {
		try {
			dispatch(authInit());
			const result = await AuthController.loginRequest(data);

			if (result.code !== undefined) {
				dispatch(authFail('Something went wrong'));
				return;
			}
			if (result.status === 200) {
				localStorage.setItem('userData', btoa(JSON.stringify(result.data.data.user_info)));
				localStorage.setItem('token', result.data.data.access);

				dispatch(authSuccess(result.data.data.access, result.data.data.user_info));
			} else {
				dispatch(authFail('Something went wrong'));
			}
		} catch (error) {
			dispatch(authFail('Something went wrong'));
		}
	};
};


export const authLogOut = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('userData');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(authLogOut());
		} else {
			const userData = JSON.parse(atob(localStorage.getItem("userData")));
			dispatch(authSuccess(token, userData));
		}
	};
};


export const forgetPassword = (data) => {
	return (dispatch) => {
		dispatch(authInit());
		AuthController.forgetPasswordRequest(data).then((result) => {
			if (result instanceof Error) {
				let errorMsg = result.response
					? result.response.data
						? result.response.data.message
						: 'Something went wrong'
					: 'Something went wrong';
				dispatch(authFail(errorMsg));
			} else if (result.data.status !== 'Failed') {
				dispatch(authSuccess(result.data.message));
			} else {
				dispatch(authFail('Something went wrong'));
			}
		})
			.catch((error) => {
				dispatch(authFail('Something went wrong'));
			});
	};
}

export const resetPassword = (data) => {
	return (dispatch) => {
		dispatch(authInit());
		AuthController.resetPasswordRequest(data).then((result) => {
			if (result instanceof Error) {
				let errorMsg = result.response
					? result.response.data
						? result.response.data.message
						: 'Something went wrong'
					: 'Something went wrong';
				dispatch(authFail(errorMsg));
			} else if (result.data.status !== 'Failed') {
				dispatch(authSuccess(result.data.message));
			} else {
				dispatch(authFail('Something went wrong'));
			}
		})
			.catch((error) => {
				dispatch(authFail('Something went wrong'));
			});
	};
}