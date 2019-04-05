import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cart-actions';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

const initialState = {
  orderType: '1',
}

class OrderTypeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  toggle(tab) {
    if (this.state.orderType !== tab) {
      this.setState({
        orderType: tab
      });
    }
  }

  hadleOrderType = () => {
    this.props.addOrderType(this.state.orderType);
  }

  render() {
    const { isOpen } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        backdrop
        style={{ maxWidth: '460px' }}
      >
        <ModalBody>
           <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.orderType === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Delivery
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.orderType === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Pickup
              </NavLink>
            </NavItem>
          </Nav>
          <Button color="primary w-50 my-2 mx-4" onClick={this.hadleOrderType}>Update</Button>
        </ModalBody>
      </Modal>
    )
  }
}

export default OrderTypeDialog;