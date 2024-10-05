import axios from 'axios';

const API_URL = 'http://192.168.20.31/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

export default api;
