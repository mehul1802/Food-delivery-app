import React, { Component } from 'react';
import CartDrawer from '../CartDrawer';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, CustomInput } from 'reactstrap';

class Checkout extends Component {
	constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div>
        <div className="resturent-menu-listing checkout-wrapper p-4">
           <div className="mb-4">
              <h2 className="font-large text-dark font-weight-bold">You've entered a new address</h2>
              <h2 className="font-large text-dark font-weight-bold">Does everything below look correct?</h2>
           </div>
           <div>
              <h2 className="font-medium text-dark font-weight-bold">Contact</h2>
              <div className="w-50">
                <Input type="text" placeholder="First Name" className="mt-2"/>
                <Input type="text" placeholder="Last Name" className="mt-4"/>
                <Input type="text" placeholder="email address" className="mt-4"/>
                <Input type="text" placeholder="Phone Number" className="mt-4"/>
                <p className="mt-4 font-light light font-tiny">
                  By providing your phone number, you consent to receive text messages from Grubhub related to your order. Standard message rates may apply. See our Terms of Use for more information.
                </p>
                <Input name="special-instruction" type="textarea" rows={3} placeholder="Dressing on the side?No pickels" />
              </div>
              <div className="mt-4">
                <h2 className="font-medium text-dark font-weight-bold">Address</h2>
                <div className="row mt-2">
                  <div className="col-4">
                     <Input type="text" placeholder="Address" name="address" />
                  </div>
                  <div className="col-4">
                     <Input type="text" placeholder="App, Suit, floor etc" name="second-line-address" />
                  </div>
                  <div className="col-4">
                     <Input type="text" placeholder="Cross street" name="street" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-4">
                     <Input type="text" placeholder="city" name="city" />
                  </div>
                  <div className="col-4">
                     <Input type="text" placeholder="state" name="state" />
                  </div>
                  <div className="col-4">
                     <Input type="text" placeholder="Zip Code" name="zip-code"/>
                  </div>
                </div>
                <Input name="delivery-instruction" className="mt-4" type="textarea" rows={3} placeholder="delivery instruction" />
                <div className ="mt-5">
                  <CustomInput type="checkbox" className="font-weight-normal" id="exampleCustomCheckbox" label="Save address" />
                </div>
              </div>
              <Button color="primary" className="text-lowercase rounded btn btn-primary w-100 mt-4">Continue to payment method</Button>
              
           </div>
          <CartDrawer />
        </div>
      </div>
    );
  }
}

export default Checkout;
