import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class RequisitionController extends BaseController {
    static async list(page, searchParam) {
        try {         
            let url = this.processQueryParam(page, endpoint.REQUISITION_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(requisitionId) {
        try {
            return await this.axiosGet(`${endpoint.REQUISITION_BASE}/${requisitionId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(requisitionData) {
        try {
            return await this.axiosPost(endpoint.REQUISITION_POST, requisitionData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(requisitionId, updatedRequisitionData) {
        try {
            return await this.axiosPatch(`${endpoint.REQUISITION_POST}${requisitionId}`, updatedRequisitionData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    // static async delete(requisitionId) {
    // 	try {
    // 		return await this.axiosGet(`${endpoint.REQUISITION_DELETE}/${requisitionId}`, { headers: this.getHeaders() });
    // 	} catch (error) {
    // 		return error;
    // 	}
    // }
}
