import axios from 'axios';

const instance = () => {
  const token = localStorage.getItem('token');

  const apiInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your API base URL
  });

  // Intercept requests and add the Authorization header
  apiInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return apiInstance;
};

export default instance;
