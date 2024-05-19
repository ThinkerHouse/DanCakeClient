// controllers/ProductionPlantController.js

import BaseController from './BaseController';
import { endpoint } from './EndPoint';

export default class ProductionPlantController extends BaseController {
    static async list(page, searchParam) {
        try {
            let url = this.processQueryParam(page,  endpoint.PRODUCTION_PLANTS_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(plantId) {
        try {
            let path = `${endpoint.PRODUCTION_PLANTS_BASE}/${plantId}`;
            return await this.axiosGet(path, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(plantData) {
        try {
            return await this.axiosPost(endpoint.PRODUCTION_PLANTS_POST, plantData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(plantId, updatedPlantData) {
        try {
            return await this.axiosPatch(`${endpoint.PRODUCTION_PLANTS_POST}${plantId}`, updatedPlantData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async delete(plantId) {
        try {
            let path = `${endpoint.PRODUCTION_PLANTS_POST}/${plantId}`;
            return await this.axiosDelete(path, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }
}
