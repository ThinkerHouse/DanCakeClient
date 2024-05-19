import BaseController from './BaseController';
import { endpoint } from "./EndPoint";

export default class RecipeController extends BaseController {
    static async list(page, searchParam) {
        try {         
            let url = this.processQueryParam(page, endpoint.RECIPE_BASE, searchParam)
            return await this.axiosGet(url, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async single(recipeId) {
        try {
            return await this.axiosGet(`${endpoint.RECIPE_BASE}/${recipeId}`, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async create(recipeData) {
        try {
            return await this.axiosPost(endpoint.RECIPE_POST, recipeData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    static async update(recipeId, updatedRecipeData) {
        try {
            return await this.axiosPatch(`${endpoint.RECIPE_POST}${recipeId}`, updatedRecipeData, { headers: this.getHeaders() });
        } catch (error) {
            return error;
        }
    }

    // static async delete(recipeId) {
    // 	try {
    // 		return await this.axiosGet(`${endpoint.RECIPE_DELETE}/${recipeId}`, { headers: this.getHeaders() });
    // 	} catch (error) {
    // 		return error;
    // 	}
    // }
}
