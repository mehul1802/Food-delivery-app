import API from './api';
// import { API_URL } from '../utils';

const LOCAL_STORAGE_KEY = 'authentication';

class Session {
    constructor() {
        if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
            this.token = localStorage.getItem(LOCAL_STORAGE_KEY);
        }
    }

    isLoggedIn() {
        return !!this.token;
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }

    removeToken() {
        this.token = null;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    // authenticate(credential) {
    //     return API.post(`${API_URL.ADMIN.LOGIN}`, credential);
    // }

    logout() {
        this.removeToken();
    }
}

export const session = new Session();
