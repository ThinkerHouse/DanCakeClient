import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class PurchaseOrderController extends BaseController {
    static async list(page, searchParam) {
        try {         
            let url = this.processQueryParam(page, endpoint.PURCHASE_ORDER_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(orderId) {
        try {
            return await this.axiosGet(`${endpoint.PURCHASE_ORDER_BASE}/${orderId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(orderData) {
        try {
            return await this.axiosPost(endpoint.PURCHASE_ORDER_POST, orderData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(orderId, updatedOrderData) {
        try {
            return await this.axiosPatch(`${endpoint.PURCHASE_ORDER_POST}${orderId}`, updatedOrderData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    // static async delete(orderId) {
    // 	try {
    // 		return await this.axiosGet(`${endpoint.PURCHASE_ORDER_DELETE}/${orderId}`, { headers: this.getHeaders() });
    // 	} catch (error) {
    // 		return error;
    // 	}
    // }
}
