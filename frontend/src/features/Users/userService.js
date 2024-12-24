import axios from 'axios';

const base_url = "http://localhost:3001/api/user";

export const registerUser = async(userData) => {
    const response = await axios.post(`${base_url}/register-user`, userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
};

export const verifyOTP = async(otpData) => {
    const response = await axios.post(`${base_url}/verify-otp/${otpData.user_id}`, otpData);

    return response.data;
};

export const getAllUsers = async() => {
    const response = await axios.get(`${base_url}/get-all-users`);
    return response.data;
};