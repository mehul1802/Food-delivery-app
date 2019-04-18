import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import _ from 'lodash';
import { Button } from 'reactstrap';

import { removeFromCart } from '../../actions/cart-actions';
import { addOrder } from '../../actions/order-actions';
import { showLogin } from '../../actions/dialog-actions';
import { formatPrice, formatAmount } from '../../utils/common';
import { session } from '../../services';

import emptyBag from '../../assets/images/empty-bag.svg';
import deleteIcon from '../../assets/images/delete-icon.svg';

const calculateOrderAmount = (cartItems) => {
  let subtotal_amount = 0;
  let tax_amount = 0;
  let order_amount = 0;
  cartItems.forEach(cartItem => {
    subtotal_amount = formatAmount(subtotal_amount + parseFloat(cartItem.total_price));
    tax_amount = formatAmount(tax_amount + parseFloat(cartItem.tax_amount));
    order_amount = formatAmount(subtotal_amount + tax_amount);
  });
  return { subtotal_amount, tax_amount , order_amount }
}

const initialState = {
  products: [],
  subtotal_amount: 0,
  tax_amount: 0,
  order_amount: 0
}

class CartDrawer extends Component {
  state = initialState

  static getDerivedStateFromProps(nextProps, prevState) {
    let cartData = session.getCartData();
    if (!_.isEqual(nextProps.products, prevState.products)) {
      let obj = calculateOrderAmount(nextProps.products);
      return { products: nextProps.products, ...obj };     
    } else if (!_.isEmpty(cartData)) {
      let obj = calculateOrderAmount(cartData);
      return { products: cartData, ...obj };
    }
    else return null;
  }

  handleCartSubmit = () => {
    if (session.isLoggedIn()) {
      try {
        const obj = { ...this.state, order_type: this.props.orderType };
        session.setOrder(obj);
        this.props.addOrder(obj);
  
        this.props.history.push(`/checkout/payment`);
      } catch(e) {
        console.log(e);
      }
    } else {
      this.props.showLogin();
    }
  }

  removeFromCart = (cartItem) => {
    session.removeCartItem(cartItem);
    this.props.removeFromCart(cartItem.uid);
  }

  render() {
    const { products, subtotal_amount, tax_amount, order_amount } = this.state;
    return (
      <div className="cart-drawer">
        {Object.keys(products).length > 0 ?
          (<>
            <div className="px-3 py-2 cart-title">Order Detail</div>
            <div className="cart-items-wrapper">
              {products.map(cartItem => {
                return (
                  <div className="cart-item px-3 py-2"  key={cartItem.product_id}>
                    <div className="item-info m-0 row">
                      <div className="col-1 p-0 font-small">{cartItem.quantity}</div>
                      <div className="col-7 p-0">
                        <div className="font-small text-primary">{cartItem.product_name}</div>
                        <div className="mt-1 d-flex flex-wrap">
                          {cartItem.modifiers && cartItem.modifiers.map((modifier,i) => (
                            <span className="modifier font-tiny text-light-gray pr-1">{modifier.name}{i+1 < cartItem.modifiers.length && ','}</span>
                          ))}
                        </div>
                      </div>
                      <div className="col-1 p-0 text-right">
                        <div onClick={() => this.removeFromCart(cartItem)}>
                          <img src={deleteIcon} className="cursor-pointer" style={{ width: 18, height: 18 }} />
                        </div>
                      </div>
                      <div className="col-3 p-0 text-right font-small text-break">{formatPrice(cartItem.total_price)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="py-3 px-4 bg-gray-lighter position-absolute w-100" style={{ bottom: 0 }}>
              <div className="d-flex justify-content-between font-small pb-2">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal_amount)}</span>
              </div>
              <div className="d-flex justify-content-between font-small pb-2">
                <span>Tax</span>
                <span>{formatPrice(tax_amount)}</span>
              </div>
              <div className="d-flex justify-content-between font-medium pb-2">
                <span>Total</span>
                <span>{formatPrice(order_amount)}</span>
              </div>
              <Button className="rounded bg-primary w-100 m-0" onClick={this.handleCartSubmit}>Continue Order</Button>
            </div>
          </>)
          :
          (<div className="empty-cart">
            <img src={emptyBag} style={{ height: '100px' }} />
            <div className="emptycart-text">
              <h3>Your bag is empty.</h3>
            </div>
          </div>)}
      </div>
    );
  }
}

const mapStateToCartDrawerProps = (state) => {
  return { products: state.cart.products, orderType: state.order.orderType, showSignIn: state.dialog.showSignIn };
};

const mapDispatchToCartDrawerProps = {
  removeFromCart,
  addOrder,
  showLogin
};

export default withRouter(connect(
  mapStateToCartDrawerProps,
  mapDispatchToCartDrawerProps
)(CartDrawer));
