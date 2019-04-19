import API from './api';
import { store } from '../store';

const LOCAL_STORAGE_KEY = 'authentication';
const CART_KEY = 'cart';
const ORDER_TYPE = 'order_type';
const ORDER = 'order';

class Session {
    constructor() {
        if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
            this.token = localStorage.getItem(LOCAL_STORAGE_KEY);
        }

        if (localStorage.getItem(CART_KEY)) {
            this.cart = localStorage.getItem(CART_KEY);
        }

        if (localStorage.getItem(ORDER_TYPE)) {
            this.orderType = localStorage.getItem(ORDER_TYPE);
        }

        if (localStorage.getItem(ORDER)) {
            this.order = localStorage.getItem(ORDER);
        }
    }

    isLoggedIn() {
        return !!this.token;
    }

    setToken(data) {
        this.token = data.token;
        localStorage.setItem(LOCAL_STORAGE_KEY, this.token);
    }

    removeToken() {
        this.token = null;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    async authenticate(url, credential) {
        try {
            const response = await API.post(url, credential);
            this.setToken(response.data);
            const user = await API.get(`${process.env.REACT_APP_API_URL}/users/me`);
            await store.dispatch({ type: 'GET_USER', payload: user.data })
            return Promise.resolve(user);
        } catch (e) {
            return Promise.reject(e);
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

    getCartData() {
        if (localStorage.getItem(CART_KEY)) {
            return JSON.parse(localStorage.getItem(CART_KEY));
        }
    }

    removeCartData() {
        localStorage.removeItem(CART_KEY);
    }
    
    removeOrderData() {
        localStorage.removeItem(ORDER);
    }

    setOrderType(orderType) {
        localStorage.setItem(ORDER_TYPE, orderType);
    }

    setOrder(order) {
        this.order = localStorage.setItem(ORDER, JSON.stringify(order));
    }

    getOrder() {
        if (localStorage.getItem(ORDER)) {
            return JSON.parse(localStorage.getItem(ORDER));
        }
    }

    logout() {
        this.removeToken();
    }
}

export const session = new Session();
