import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class MaterialTypeController extends BaseController {
    static async list(page, searchParam) {
        try {
            let url = this.processQueryParam(page,  endpoint.MATERIAL_TYPES_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(materialTypeId) {
        try {
            return await this.axiosGet(`${endpoint.MATERIAL_TYPES_BASE}/${materialTypeId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(materialTypeData) {
        try {
            return await this.axiosPost(endpoint.MATERIAL_TYPES_POST, materialTypeData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(materialTypeId, updatedMaterialTypeData) {
        try {
            return await this.axiosPatch(`${endpoint.MATERIAL_TYPES_POST}${materialTypeId}`, updatedMaterialTypeData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async delete(materialTypeId) {
        try {
            return await this.axiosDelete(`${endpoint.MATERIAL_TYPES_BASE}/${materialTypeId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }
}
