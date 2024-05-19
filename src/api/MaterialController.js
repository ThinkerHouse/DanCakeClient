// controllers/MaterialController.js

import BaseController from './BaseController';
import { endpoint } from './EndPoint';

export default class MaterialController extends BaseController {
    static async list(page, searchParam) {
        try {
            let url = this.processQueryParam(page,  endpoint.MATERIALS_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(materialId) {
        try {
            let path = `${endpoint.MATERIALS_BASE}/${materialId}`;
            return await this.axiosGet(path, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(materialData) {
        try {
            return await this.axiosPost(endpoint.MATERIALS_POST, materialData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(materialId, updatedMaterialData) {
        try {
            return await this.axiosPatch(`${endpoint.MATERIALS_POST}${materialId}`, updatedMaterialData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async delete(materialId) {
        try {
            let path = `${endpoint.MATERIALS_POST}/${materialId}`;
            return await this.axiosDelete(path, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }
}
