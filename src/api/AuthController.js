import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class AuthController extends BaseController {
	constructor() { }

	static async loginRequest(data) {
		try {
			return await this.axiosPost(endpoint.LOGIN, data);
		} catch (error) {
			return error
		}
	}

	static async forgetPasswordRequest(data) {
		try {
			return await this.axiosPost(endpoint.FORGET_PASSWORD, data);
		} catch (error) {
			return error
		}
	}

	static async resetPasswordRequest(data) {
		try {
			return await this.axiosPost(endpoint.RESET_PASSWORD, data);
		} catch (error) {
			return error
		}
	}

}
