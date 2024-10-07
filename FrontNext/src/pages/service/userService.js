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
    try{
    const response = await axios.put(`/user/${userId}`, userData);  // Adjust endpoint as needed
    return response.data;
    }catch (error){
        throw error.response ? error.response.data : { msg: 'Something went wrong.' }; // Handle errors

    }
};
