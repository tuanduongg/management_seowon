// import axios from 'axios';
// import { ConfigApp } from 'config';

// const axiosInstance = axios.create({
//   baseURL:ConfigApp.API_URL, // Thay thế bằng URL API thực tế của bạn
// });

// const SendRequest = async (method, url, data = null, headers = {}) => {
//   try {
//     const response = await axiosInstance({
//       method,
//       url,
//       data,
//       headers,
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export default SendRequest;

const axios = require('axios');
const axiosApiInstance = axios.create();
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async config => {
        const value = await redisClient.get(rediskey)
        const keys = JSON.parse(value)
        config.headers = {
            'Authorization': `Bearer ${keys.access_token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
});

export default axiosApiInstance;
