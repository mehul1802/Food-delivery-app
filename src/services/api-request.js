import API from './api'
// import PublicAPI from './public-api';
import axios from 'axios';
import { session } from './session';

class ApiRequestClass {
    config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    async triggerApi (url, data, method = 'post') {
        try {
            const response = await API[method](url, data);
            return Promise.resolve(response);
        } catch(e) {
            return Promise.reject(e);
        }
    }

    async getRecords (url) {
        try {
            const response = await API.get(url);
            return Promise.resolve(response);
        } catch(e) {
            return Promise.reject(e);
        }
    }

    async upload (url, data, method = 'post') {
        try {
            const response = await axios[method](`${process.env.REACT_APP_API_URL}${url}`, data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': session.token ? `Bearer ${session.token}` : null
                }
            });
            return Promise.resolve(response);
        } catch(e) {
            return Promise.reject(e);
        }
    }
}

export const ApiRequest = new ApiRequestClass();
