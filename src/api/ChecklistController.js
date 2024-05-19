import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class ChecklistController extends BaseController {
    static async list(page, searchParam) {
        try {         
            let url = this.processQueryParam(page,  endpoint.CHECKLIST_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(checklistId) {
        try {
            return await this.axiosGet(`${endpoint.CHECKLIST_BASE}/${checklistId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(checklistData) {
        try {
            return await this.axiosPost(endpoint.CHECKLIST_POST, checklistData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(checklistId, updatedChecklistData) {
        try {
            return await this.axiosPatch(`${endpoint.CHECKLIST_POST}${checklistId}`, updatedChecklistData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    // static async delete(checklistId) {
    // 	try {
    // 		return await this.axiosGet(`${endpoint.CHECKLIST_DELETE}/${checklistId}`, { headers: this.getHeaders() });
    // 	} catch (error) {
    // 		return error;
    // 	}
    // }
}
