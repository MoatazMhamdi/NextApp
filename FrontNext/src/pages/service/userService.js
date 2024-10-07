// src/userService.js

import axiosInstance from './axios';

export const signupUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/user/signup', userData);
        return response.data; // Return the response data
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Something went wrong.' }; // Handle errors
    }
};
export const updateUser = async (userId, userData) => {
    try {
        const response = await axiosInstance.put(`/user/${userId}`, userData);
        return response.data;  // Ensure this returns the correct data structure
    } catch (error) {
        console.error('Error in updateUser:', error); // Log the entire error for debugging
        throw error.response ? error.response.data : { msg: 'Something went wrong.' };
    }
};

