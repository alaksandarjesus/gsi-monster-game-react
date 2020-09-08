import axios from 'axios';



const API = axios.create({
    baseURL: 'http://139.59.40.72/',
    // baseURL: 'http://localhost:8888/',
});
API.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  'Bearer '+token;

    return config;
});
export default API;