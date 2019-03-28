import React, { Component } from 'react';
import CartDrawer from '../CartDrawer';

class Checkout extends Component {
	constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div>
        <div className="resturent-checkout-wrapper p-4">
           <div className="mb-4">
              <h2 className="font-large large">You've entered a new address</h2>
              <h2 className="font-large large">Does everything below look correct?</h2>
           </div>
           <div>
              <h2 className="font-large large">Contact</h2>
           </div>
          <CartDrawer />
        </div>
      </div>
    );
  }
}

export default Checkout;
