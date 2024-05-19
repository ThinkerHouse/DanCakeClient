import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class ReceivedOrdersController extends BaseController {
    static async list(page, searchParam) {
        try {          
            let url = this.processQueryParam(page,  endpoint.RECEIVED_ORDERS_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(orderId) {
        try {
            return await this.axiosGet(`${endpoint.RECEIVED_ORDERS_BASE}/${orderId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(orderData) {
        try {
            return await this.axiosPost(endpoint.RECEIVED_ORDERS_POST, orderData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(orderId, updatedOrderData) {
        try {
            return await this.axiosPatch(`${endpoint.RECEIVED_ORDERS_POST}${orderId}`, updatedOrderData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    // static async delete(orderId) {
    //     try {
    //         return await this.axiosGet(`${endpoint.RECEIVED_ORDERS_DELETE}/${orderId}`, { headers: this.getHeaders() });
    //     } catch (error) {
    //         return error;
    //     }
    // }
}
