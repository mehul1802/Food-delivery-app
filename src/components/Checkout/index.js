import React, { Component } from 'react';
import CartDrawer from '../CartDrawer';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

class Checkout extends Component {
	constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div>
        <div className="resturent-menu-listing checkout-wrapper p-4">
           <div className="mb-4">
              <h2 className="font-large large">You've entered a new address</h2>
              <h2 className="font-large large">Does everything below look correct?</h2>
           </div>
           <div>
              <h2 className="font-large large">Contact</h2>
              <div className="w-50">
                <Input type="text" placeholder="First Name" className="mt-2"/>
                <Input type="text" placeholder="Last Name" className="mt-4"/>
                <Input type="text" placeholder="email address" className="mt-4"/>
                <Input type="text" placeholder="Phone Number" className="mt-4"/>
                <p className="mt-4 font-light light">
                  By providing your phone number, you consent to receive text messages from Grubhub related to your order. Standard message rates may apply. See our Terms of Use for more information.
                </p>
              </div>
              
           </div>
          <CartDrawer />
        </div>
      </div>
    );
  }
}

export default Checkout;
