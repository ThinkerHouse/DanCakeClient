import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class ProductsController extends BaseController {
    static async list(page, searchParam) {
        try {         
            let url = this.processQueryParam(page, endpoint.PRODUCT_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(productId) {
        try {
            return await this.axiosGet(`${endpoint.PRODUCT_BASE}/${productId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(productData) {
        try {
            return await this.axiosPost(endpoint.PRODUCT_POST, productData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(productId, updatedProductData) {
        try {
            return await this.axiosPatch(`${endpoint.PRODUCT_POST}${productId}`, updatedProductData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    // static async delete(productId) {
    // 	try {
    // 		return await this.axiosGet(`${endpoint.PRODUCT_DELETE}/${productId}`, { headers: this.getHeaders() });
    // 	} catch (error) {
    // 		return error;
    // 	}
    // }
}
