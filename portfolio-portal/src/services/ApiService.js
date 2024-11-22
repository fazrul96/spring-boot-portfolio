import axios from 'axios';
import { AUTH0_AUDIENCE, AUTH0_SCOPE_READ_ITEMS, AUTH0_PROMPT } from './../constants/ApiConstants';

class ApiService {
    constructor(baseURL, getAccessTokenSilently) {
        this.api = axios.create({
            baseURL,
            withCredentials: true,
        });
        this.getAccessTokenSilently = getAccessTokenSilently;
        this.token = null; // Cache for token
        this.tokenExpiry = null; // Cache for token expiration
    }

    // Check if the token has expired
    isTokenExpired() {
        return !this.token || Date.now() > this.tokenExpiry;
    }

    // Set headers for authorization and content type
	async setHeaders(isSecure = false) {
	    const headers = { 'Content-Type': 'application/json' };

	    if (isSecure) {
	        try {
	            if (this.isTokenExpired()) {
	                const token = await this.getAccessTokenSilently({
	                    audience: AUTH0_AUDIENCE,
	                    scope: AUTH0_SCOPE_READ_ITEMS,
	                    prompt: AUTH0_PROMPT,
	                });
	                this.token = token;
	                this.tokenExpiry = Date.now() + 3600 * 1000; // Token expires in 1 hour
	            }

	            headers.Authorization = `Bearer ${this.token}`;
	        } catch (error) {
	            console.error('Error fetching token:', error);
	            throw error;
	        }
	    }

	    return headers;
	}

    // Fetch data from the API
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

	async fetchResourceWithParams(endpoint, params = {}) {
	    const headers = await this.setHeaders();
	    try {
	        const response = await this.api.get(endpoint, {
	            headers,
	            params,
	        });
	        return response.data;
	    } catch (error) {
	        console.error(`Error fetching data from ${endpoint}:`, error.response || error.message);
	        throw error;
	    }
	}

	async fetchResourceWithFormData(endpoint, formData) {
        const headers = await this.setHeaders();
        delete headers['Content-Type']; // Remove explicit `Content-Type` to allow FormData to set it
        try {
            const response = await this.api.post(endpoint, formData, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error fetching data from ${endpoint} with FormData:`, error.response || error.message);
            throw error;
        }
    }

    // Create a resource (e.g., POST /webtoons)
    async createResource(resourceType, data, isFormData = false, options = {}) {
        const headers = await this.setHeaders();

        let requestData;
        if (isFormData) {
            requestData = new FormData();
            for (const key in data) {
                requestData.append(key, data[key]);
            }
            headers['Content-Type'] = 'multipart/form-data';
        } else {
            requestData = data;
            headers['Content-Type'] = 'application/json';
        }

        try {
            const response = await this.api.post(`/${resourceType}`, requestData, {
                headers,
                ...options,
            });
            return response.data;
        } catch (error) {
            console.error(`Error creating resource at /${resourceType}:`, error.response || error.message);
            throw error;
        }
    }

    // Update a resource (e.g., PUT /webtoons/:id)
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

    // Delete a resource (e.g., DELETE /webtoons/:id)
    async deleteResource(resourceType, id) {
        const headers = await this.setHeaders();
        try {
            await this.api.delete(`/${resourceType}/${id}`, { headers });
        } catch (error) {
            console.error(`Error deleting resource at /${resourceType}/${id}:`, error.response || error.message);
            throw error;
        }
    }

	// Delete a resource file (e.g., DELETE /webtoons/:fileName)
    async deleteResourceFile(endpoint, params = {}) {
        const headers = await this.setHeaders();
        try {
        const response = await this.api.delete(endpoint, {
            headers,
            params,
        });

        } catch (error) {
			console.error(`Error deleting resource at ${endpoint}:`, error.response?.data || error.message);
            throw error;
        }
    }
}

export default ApiService;