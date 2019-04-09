import API from './api';
import { store } from '../store';
import { apiServices as action } from '../actions';
import { ApiRequest } from './api-request';

const LOCAL_STORAGE_KEY = 'authentication';
const CART_KEY = 'cart';

class Session {
    constructor() {
        if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
            this.token = localStorage.getItem(LOCAL_STORAGE_KEY);
        }

        if (localStorage.getItem(CART_KEY)) {
            this.cart = localStorage.getItem(CART_KEY);
        }
    }

    isLoggedIn() {
        return !!this.token;
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem(LOCAL_STORAGE_KEY, this.token);
    }

    removeToken() {
        this.token = null;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    async authenticate (url, credential) {
        try {
            console.log(url);
            const response = await API.post(url, credential);
            this.setToken(response.data.data);

            console.log(response.data.data);
            const user = await store.dispatch(
              action.getRecord(`${process.env.REACT_APP_API_URL}/users`, response.token, {action: 'GET_USER', urlAction: '/me'})
             )

            return Promise.resolve(user);
        } catch(e) {
            return Promise.reject(e);
        } finally {
            store.dispatch(action.hideLoader());
        }
    }

    setCartData(product) {
        let productArr = [];

        if (this.cart) {
            productArr = JSON.parse(this.cart);
        }

        if (!productArr.find(item => item.uid === product.uid)) {
            productArr.push(product);
        }

        localStorage.setItem(CART_KEY, JSON.stringify(productArr));
        this.cart = localStorage.getItem(CART_KEY);

        return this.cart;
    }

    removeCartItem(product) {
        let productArr = [];

        if (this.cart) {
            productArr = JSON.parse(this.cart);
        }
        
        let updatedProducts = productArr.filter(item => {
            return item.uid !== product.uid
        });

        localStorage.setItem(CART_KEY, JSON.stringify(updatedProducts));
        this.cart = localStorage.getItem(CART_KEY);

        return this.cart;
    }

    getCartData () {
        if (localStorage.getItem(CART_KEY)) {
            return JSON.parse(localStorage.getItem(CART_KEY));
        }
    }

    logout() {
        this.removeToken();
    }
}

export const session = new Session();
