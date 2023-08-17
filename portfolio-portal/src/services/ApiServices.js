const BASE_URL = 'http://localhost:8080/api/v1'; // Your Spring Boot API base URL

async function fetchExperiences() {
  try {
    const response = await fetch(`${BASE_URL}/getExperiences`);
    if (!response.ok) {
      throw new Error('Failed to fetch experiences');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
}

export { fetchExperiences };