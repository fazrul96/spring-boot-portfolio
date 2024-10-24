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

    async request(method, endpoint, data = null, params = null) {
        try {
            const headers = await this.setHeaders();
            const config = { headers, method, url: endpoint, data, params };
            const response = await this.api.request(config);
            return response.data;
        } catch (error) {
            console.error(`Error during ${method.toUpperCase()} request to ${endpoint}:`, error.response || error.message);
            throw error;
        }
    }

	get(endpoint, params = null) {
		return this.request('get', endpoint, null, params);
	}

	// Wrapper for POST request
	post(endpoint, data) {
		return this.request('post', endpoint, data);
	}

    // Wrapper for PUT request
    put(endpoint, data) {
        return this.request('put', endpoint, data);
    }

    // Wrapper for DELETE request
    delete(endpoint) {
        return this.request('delete', endpoint);
    }

	fetchExperiencesWithItems() {
		return this.fetchData('/experiences');
	}

	fetchEducations() {
		return this.fetchData('/educations');
	}

	fetchCertifications() {
		return this.fetchData('/certifications');
	}

	fetchProjects() {
		return this.fetchData('/projects');
	}

	fetchSkills() {
		return this.fetchData('/skills');
	}

	fetchBlogs() {
		return this.fetchData('/blogs');
	}
}

export default ApiService;