import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class UsersController extends BaseController {
	static async list(page, searchParam) {
		try {
			let url = this.processQueryParam(page,  endpoint.USERS_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
		} catch (error) {
			return error;
		}
	}

	static async single(userId) {
		try {
			return await this.axiosGet(`${endpoint.USERS_BASE}/${userId}`, { headers: this.getHeaders() });
		} catch (error) {
			return error;
		}
	}

	static async create(userData, type) {
		try {
			let path = endpoint.USERS_POST
			return await this.axiosPost(path, userData, { headers: this.getHeaders() });
		} catch (error) {
			return error;
		}
	}

	static async update(userId, updatedUserData) {
		try {
			return await this.axiosPatch(`${endpoint.USERS_POST}${userId}/`, updatedUserData, { headers: this.getHeaders() });
		} catch (error) {
			return error;
		}
	}
}
