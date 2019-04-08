import axios from 'axios';
import querystring from 'querystring';
import { store } from '../store';

class StripePayment {
    key = process.env.REACT_APP_STRIPE_KEY;

    secretKey = process.env.REACT_APP_SECRET_KEY;

    url = process.env.REACT_APP_STRIPE_URL;

    config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${this.secretKey}`
        }
    };

    async createCustomer (obj, url = '') {
        try {
            const response = await axios.post(`${this.url}/customers${url}`, querystring.stringify(obj), this.config);
            return Promise.resolve(response);
        } catch(e) {
            return Promise.reject(e);
        }
    }

    async deleteCard (url = '') {
        try {
            const response = await axios.delete(`${this.url}/customers${url}`, this.config);
            return Promise.resolve(response);
        } catch(e) {
            return Promise.reject(e);
        }
    }
}

export const stripePayment = new StripePayment();
