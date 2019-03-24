import React, { Component } from 'react';
import emptyBag from '../../assets/images/empty-bag.svg';

class CartDrawer extends Component {
	constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div className="cart-drawer">
        <div className="empty-cart">
          <img src={emptyBag} style={{ height: '100px' }}/>
          <div className="emptycart-text">
           <h3>Your bag is empty.</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default CartDrawer;
