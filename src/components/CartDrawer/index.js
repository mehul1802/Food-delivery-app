import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { removeFromCart } from '../../actions/cart-actions';

import emptyBag from '../../assets/images/empty-bag.svg';

class CartDrawer extends Component {

  render() {
    const { products } = this.props;
    console.log(products);
    return (
      <div className="cart-drawer">
        {Object.keys(products).length > 0 ?
          (<>
            <div class="cart-items-wrapper">
              {products.map(cartItem => (
                  <div className="product-details">
                    <div>{cartItem.product_name}</div>
                    <div>{cartItem.quantity}</div>
                    <div>{cartItem.unit_price}</div>
                    <div>{cartItem.total_price}</div>
                    {cartItem.modifiers.map(modifier => (
                      <>
                        <div>{modifier.name}</div>
                        <div>{modifier.price}</div>
                      </>
                    ))}
                  </div>
              ))}
            </div>
            <div className="p-4 border-top position-absolute w-100" style={{ bottom: 0 }}>
              <Button className="disabled rounded bg-primary w-100 m-0 text-lowercase">Add $12.51 to proceed</Button>
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
