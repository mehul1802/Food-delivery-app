import API from './api';
// import { API_URL } from '../utils';

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
        localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }

    removeToken() {
        this.token = null;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    setCartData(product) {
        let productArr = [];

        if (this.cart) {
            productArr = JSON.parse(this.cart);
        }

        let updatedProducts = productArr.filter(item => {
            return item.uid !== product.uid
        });

        if (productArr.length > updatedProducts.length) {
            productArr = updatedProducts;
        } else {
            productArr.push(product);
        }

        localStorage.setItem(CART_KEY, JSON.stringify(productArr));
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
