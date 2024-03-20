import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetchData(endpoint) {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  async fetchExperiencesWithItems() {
    return this.fetchData('/getExperiencesWithItems');
  }

  async fetchEducations() {
    return this.fetchData('/getEducations');
  }

  async fetchCertifications() {
    return this.fetchData('/getCertifications');
  }

  async fetchProjects() {
    return this.fetchData('/getProjects');
  }

  async fetchSkills() {
    return this.fetchData('/getSkills');
  }

  async fetchBlogs() {
    return this.fetchData('/getBlogs');
  }
}

export default ApiService;