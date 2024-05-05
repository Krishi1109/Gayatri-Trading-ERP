import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json', // Example headers
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // You can modify the request config here
    // console.log('Request sent:', config);
    return config;
  },
  (error) => {
    // Handle request errors
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    // console.log('Response received:', response);
    return response;
  },
  (error) => {
    // Handle response errors
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
