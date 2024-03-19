class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  async fetchExperiences() {
    return this.fetchData('/getExperiences');
  }

  async fetchExperienceItems() {
    return this.fetchData('/getExperienceItems');
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