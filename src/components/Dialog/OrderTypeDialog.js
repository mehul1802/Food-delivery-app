import React, { Component } from 'react';

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
        style={{ maxWidth: '360px' }}
        className="order-type-dialog"
      >
        <ModalHeader className="px-8">
          Your order setting
        </ModalHeader>
        <ModalBody>
           <Nav tabs className="border-0 my-8">
            <NavItem>
              <NavLink
                className={`font-weight-bold ${classnames({ active: this.state.orderType === '1' })}`}
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
        </ModalBody>
        <ModalFooter>
          <Button color="primary w-100 rounded" onClick={this.hadleOrderType}>Update</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default OrderTypeDialog;