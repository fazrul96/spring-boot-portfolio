import axios from 'axios';
import { AUTH0_AUDIENCE, AUTH0_SCOPE_READ_ITEMS, AUTH0_PROMPT } from './../constants/ApiConstants';

class ApiService {
	constructor(baseURL, getAccessTokenSilently) {
		this.api = axios.create({
	        baseURL,
	        withCredentials: true,
		});
		this.getAccessTokenSilently = getAccessTokenSilently;
	}

	async setHeaders() {
		try {
			const token = await this.getAccessTokenSilently({
				audience: AUTH0_AUDIENCE,
				scope: AUTH0_SCOPE_READ_ITEMS,
				prompt: AUTH0_PROMPT,
			});
			return {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			};
		} catch (error) {
			console.error('Error fetching token:', error);
			throw error;
		}
	}

	async fetchData(endpoint) {
		const headers = await this.setHeaders();
		try {
			const response = await this.api.get(endpoint, { headers });
            return response.data;
		} catch (error) {
			console.error(`Error fetching data from ${endpoint}:`, error.response || error.message);
	        throw error;
	    }
    }

	fetchResource(resourceType) {
		return this.fetchData(`/${resourceType}`);
	}
}

export default ApiService;