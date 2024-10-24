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

	async fetchResource(resourceType) {
		return this.fetchData(`/${resourceType}`);
	}

    async createResource(resourceType, data) {
        const headers = await this.setHeaders();
        try {
            const response = await this.api.post(`/${resourceType}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error creating resource at /${resourceType}:`, error.response || error.message);
            throw error;
        }
    }

    async updateResource(resourceType, id, data) {
        const headers = await this.setHeaders();
        try {
            const response = await this.api.put(`/${resourceType}/${id}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error updating resource at /${resourceType}/${id}:`, error.response || error.message);
            throw error;
        }
    }

    async deleteResource(resourceType, id) {
        const headers = await this.setHeaders();
        try {
            await this.api.delete(`/${resourceType}/${id}`, { headers });
        } catch (error) {
            console.error(`Error deleting resource at /${resourceType}/${id}:`, error.response || error.message);
            throw error;
        }
    }
}

export default ApiService;