import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class RolesController extends BaseController {
	static async list(page, searchParam) {
		try {
			let pageQueryParam = page !== '' ? `?limit=10&offset=${(page - 1) * 10}&page=${page}` : '';
			let path = endpoint.ROLES_BASE
			pageQueryParam = searchParam !== '' ? pageQueryParam + '&' + searchParam : pageQueryParam;
			return await this.axiosGet(`${path}${pageQueryParam}`, { headers: this.getHeaders() });
		} catch (error) {
			return error;
		}
	}


	static async single(roleId) {
		try {
			return await this.axiosGet(`${endpoint.ROLES_BASE}/${roleId}`, { headers: this.getHeaders() });
		} catch (error) {
			return error;
		}
	}

	static async create(roleData) {
		try {
			return await this.axiosPost(endpoint.ROLES_POST, roleData, { headers: this.getHeaders() });
		} catch (error) {
			return error;
		}
	}

	static async update(roleId, updatedroleData) {
		try {
			return await this.axiosPatch(`${endpoint.ROLES_POST}${roleId}/`, updatedroleData, { headers: this.getHeaders() });
		} catch (error) {
			return error;
		}
	}

	// static async delete(roleId) {
	// 	try {
	// 		return await this.axiosGet(`${endpoint.BRAND_DELETE}/${roleId}`, { headers: this.getHeaders() });
	// 	} catch (error) {
	// 		return error;
	// 	}
	// }
}
