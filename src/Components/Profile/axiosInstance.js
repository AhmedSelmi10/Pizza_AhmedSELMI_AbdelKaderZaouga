// axiosInstance.js

import axios from 'axios';
 

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Adjust the base URL according to your backend API
});

axiosInstance.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Append the token to the Authorization header
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
