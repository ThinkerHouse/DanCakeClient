import axios from "axios";

export default class BaseController {
	static baseUrl = process.env.REACT_APP_API_URL;

	static getHeaders(config = {}) {
		const token = localStorage.getItem("token");
		return {
			Authorization: `Bearer ${token}`,
			...config.headers,
		};
	}

	static async axiosPost(path, data, config = {}) {
		try {
			const headers = this.getHeaders(config);
			return await axios.post(this.baseUrl + path, data, { ...config, headers });
		} catch (error) {
			this.handleError(error);
			throw error;
		}
	}

	static async axiosGet(path, config = {}) {
		try {
			const headers = this.getHeaders(config);
			return await axios.get(this.baseUrl + path, { ...config, headers });
		} catch (error) {
			this.handleError(error);
			throw error;
		}
	}

	static async axiosPatch(path, data, config = {}) {
		try {
			const headers = this.getHeaders(config);
			return await axios.patch(this.baseUrl + path, data, { ...config, headers });
		} catch (error) {
			this.handleError(error);
			throw error;
		}
	}

	static handleError(error) {
		if (error?.response?.data?.status === 401) {
			console.log('oi');
			localStorage.removeItem('token');
			localStorage.removeItem('userData');

			const currentBaseUrl = window.location.origin;
			const newUrl = new URL('/', currentBaseUrl).toString();
			window.location.replace(newUrl);
		}
	}

	static processQueryParam = (page, endpoint, searchParam) => {
		let pageQueryParam = page !== '' ? `?limit=10&offset=${(page - 1) * 10}&page=${page}` : '';
		if (searchParam !== '') {
			pageQueryParam += pageQueryParam !== '' ? `&${searchParam}` : `?${searchParam}`;
		}

		return `${endpoint}${pageQueryParam}`;
	}
}
