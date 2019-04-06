import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import _ from 'lodash';

import { removeFromCart } from '../../actions/cart-actions';
import { formatPrice } from '../../utils/common';
import { session } from '../../services/session';

import emptyBag from '../../assets/images/empty-bag.svg';
import deleteIcon from '../../assets/images/delete-icon.svg';

const initialState = {
  products: []
}

class CartDrawer extends Component {
  state = initialState

  static getDerivedStateFromProps(nextProps, prevState) {
    let cartData = session.getCartData();
    if (!_.isEqual(nextProps.products, prevState.products)) {
      return { products: nextProps.products };     
    } else if (!_.isEmpty(cartData)) {
      return { products: cartData }
    }
    else return null;
  }

  removeFromCart = (cartItem) => {
    session.setCartData(cartItem)
    this.props.removeFromCart(cartItem.uid);
  }

  render() {
    const { products } = this.state;
    let subTotal = 0;
    let vatPrice = 0;
    let total = 0;
    return (
      <div className="cart-drawer">
        {Object.keys(products).length > 0 ?
          (<>
            <div className="px-3 py-2 cart-title">Order Detail</div>
            <div className="cart-items-wrapper">
              {products.map(cartItem => {
                subTotal = subTotal + parseFloat(cartItem.total_price);
                vatPrice = vatPrice + parseFloat(cartItem.tax_amount);
                total = subTotal + vatPrice;
                return (
                  <div className="cart-item px-3 py-2"  key={cartItem.product_id}>
                    <div className="item-info m-0 row">
                      <div className="col-1 p-0 font-small">{cartItem.quantity}</div>
                      <div className="col-7 p-0">
                        <div className="font-small text-primary">{cartItem.product_name}</div>
                        <div className="mt-1">
                          {cartItem.modifiers && cartItem.modifiers.map(modifier => (
                            <span className="font-tiny text-light-gray">{modifier.name}</span>
                          ))}
                        </div>
                      </div>
                      <div className="col-1 p-0 text-right">
                        <div onClick={() => this.removeFromCart(cartItem)}>
                          <img src={deleteIcon} style={{ width: 18, height: 18 }} />
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
                <span>{formatPrice(subTotal)}</span>
              </div>
              <div className="d-flex justify-content-between font-small pb-2">
                <span>Vat</span>
                <span>{formatPrice(vatPrice)}</span>
              </div>
              <div className="d-flex justify-content-between font-medium pb-2">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button className="rounded bg-primary w-100 m-0">Continue Order</Button>
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
  return { products: state.cart.products };
};

const mapDispatchToCartDrawerProps = {
  removeFromCart
};

export default connect(
  mapStateToCartDrawerProps,
  mapDispatchToCartDrawerProps
)(CartDrawer);
