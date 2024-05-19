import { jwtDecode } from 'jwt-decode';

function checkTokenValidity(token) {
	try {
		const decodedToken = jwtDecode(token);
		// Check if the token is expired
		const currentTime = Date.now() / 1000;
		if (decodedToken.exp < currentTime) {
			return false;
		} else {
			return true;
		}
	} catch (err) {
		return err;
	}
}

const token = localStorage.getItem('token');
export const isTokenValid = checkTokenValidity(token);
