import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class UnitController extends BaseController {
    static async list(page, searchParam) {
        try {
            let url = this.processQueryParam(page,  endpoint.UNITS_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }

    }

    static async single(unitId) {
        try {
            return await this.axiosGet(`${endpoint.UNITS_BASE}/${unitId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(unitData) {
        try {
            return await this.axiosPost(endpoint.UNITS_POST, unitData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(unitId, updatedUnitData) {
        try {
            return await this.axiosPatch(`${endpoint.UNITS_POST}${unitId}`, updatedUnitData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    // static async delete(unitId) {
    // 	try {
    // 		return await this.axiosGet(`${endpoint.UNITS_DELETE}/${unitId}`, { headers: this.getHeaders() });
    // 	} catch (error) {
    // 		return error;
    // 	}
    // }
}
