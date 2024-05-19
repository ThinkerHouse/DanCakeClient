import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class DepartmentsController extends BaseController {
    static async list(page, searchParam) {
        try {          
            let url = this.processQueryParam(page,  endpoint.DEPARTMENTS_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(departmentId) {
        try {
            return await this.axiosGet(`${endpoint.DEPARTMENTS_BASE}/${departmentId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(departmentData) {
        try {
            return await this.axiosPost(endpoint.DEPARTMENTS_POST, departmentData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(departmentId, updatedDepartmentData) {
        try {
            return await this.axiosPatch(`${endpoint.DEPARTMENTS_POST}${departmentId}`, updatedDepartmentData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    // static async delete(departmentId) {
    // 	try {
    // 		return await this.axiosGet(`${endpoint.DEPARTMENTS_DELETE}/${departmentId}`, { headers: this.getHeaders() });
    // 	} catch (error) {
    // 		return error;
    // 	}
    // }
}
