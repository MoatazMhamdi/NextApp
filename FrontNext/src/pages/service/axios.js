// src/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/', // Set your API base URL here
    timeout: 10000, // Optional: Set a timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add interceptors if you need to handle requests/responses globally
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth tokens or modify the request here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
