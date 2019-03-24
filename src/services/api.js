import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,

    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use( (config) => {
    const token = localStorage.getItem('authentication');
    config.headers.Authorization =  token ? `Bearer ${token}` : null;
    return config;
});

export default axiosInstance;
