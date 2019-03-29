import React, { Component } from 'react';
import { Button } from 'reactstrap';
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
        <div className="p-4 border-top position-absolute w-100" style={{ bottom: 0 }}>
         <Button className="disabled rounded bg-primary w-100 m-0 text-lowercase">Add $12.51 to proceed</Button>
        </div>
      </div>
    );
  }
}

export default CartDrawer;
