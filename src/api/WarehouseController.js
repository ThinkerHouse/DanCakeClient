import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class WarehouseController extends BaseController {
    static async list(page, searchParam) {
        try {
            let url = this.processQueryParam(page,  endpoint.WAREHOUSE_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(warehouseId) {
        try {
            return await this.axiosGet(`${endpoint.WAREHOUSE_BASE}/${warehouseId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(warehouseData) {
        try {
            return await this.axiosPost(endpoint.WAREHOUSE_POST, warehouseData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(warehouseId, updatedWarehouseData) {
        try {
            return await this.axiosPatch(`${endpoint.WAREHOUSE_POST}${warehouseId}`, updatedWarehouseData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    // static async delete(warehouseId) {
    // 	try {
    // 		return await this.axiosGet(`${endpoint.WAREHOUSE_DELETE}/${warehouseId}`, { headers: this.getHeaders() });
    // 	} catch (error) {
    // 		return error;
    // 	}
    // }
}
