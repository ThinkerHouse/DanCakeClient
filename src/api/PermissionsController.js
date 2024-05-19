import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class PermissionsController extends BaseController {
	static async list(page, searchParam) {
		try {
			let path = endpoint.PERMISSIONS_BASE
			return await this.axiosGet(`${path}`, { headers: this.getHeaders() });
		} catch (error) {
			return error;
		}
	}
}
