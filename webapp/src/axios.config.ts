import axios from 'axios';

const instance = () => {
  const apiInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your API base URL
  });
  const token = localStorage.getItem('token');
  apiInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
  return apiInstance;
}

export default instance;
