import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class ProductionController extends BaseController {
    static async list(page, searchParam) {
        try {         
            let url = this.processQueryParam(page, endpoint.PRODUCTION_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(productionId) {
        try {
            return await this.axiosGet(`${endpoint.PRODUCTION_BASE}/${productionId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(productionData) {
        try {
            return await this.axiosPost(endpoint.PRODUCTION_POST, productionData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(productionId, updatedProductionData) {
        try {
            return await this.axiosPatch(`${endpoint.PRODUCTION_POST}${productionId}`, updatedProductionData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    // static async delete(productionId) {
    // 	try {
    // 		return await this.axiosGet(`${endpoint.PRODUCTION_DELETE}/${productionId}`, { headers: this.getHeaders() });
    // 	} catch (error) {
    // 		return error;
    // 	}
    // }
}
