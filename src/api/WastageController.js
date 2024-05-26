import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class WastageController extends BaseController {
    static async list(page, searchParam) {
        try {
            let url = this.processQueryParam(page, endpoint.WASTAGE_BASE, searchParam);
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(wastageId) {
        try {
            return await this.axiosGet(`${endpoint.WASTAGE_BASE}/${wastageId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(wastageData) {
        try {
            return await this.axiosPost(endpoint.WASTAGE_POST, wastageData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(wastageId, updatedWastageData) {
        try {
            return await this.axiosPatch(`${endpoint.WASTAGE_POST}${wastageId}`, updatedWastageData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    // If needed, uncomment and update the delete method for wastage
    // static async delete(wastageId) {
    //     try {
    //         return await this.axiosDelete(`${endpoint.WASTAGE_DELETE}/${wastageId}`, { headers: this.getHeaders() });
    //     } catch (error) {
    //         return error;
    //     }
    // }
}
