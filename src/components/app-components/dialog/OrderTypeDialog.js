import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import { ORDERTYPES } from '../../../utils/enum';

const initialState = {
  orderType: 1,
}

class OrderTypeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  toggle(orderType) {
    this.setState({ orderType: orderType });
  }

  hadleOrderType = () => {
    this.props.addOrderType(this.state.orderType);
  }

  render() {
    const { isOpen, toggleOrderTypeModel } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggleOrderTypeModel}
        backdrop
        style={{ maxWidth: '360px' }}
        className="order-type-dialog"
      >
        <ModalHeader className="px-8">
          Your order setting
        </ModalHeader>
        <ModalBody>
           <Nav tabs className="border-0 my-8">
            {ORDERTYPES.map(ordertype => (
              <NavItem>
                <NavLink
                  className={`font-weight-bold ${classnames({ active: this.state.orderType == ordertype.value })}`}
                  onClick={() => { this.toggle(ordertype.value); }}
                >
                  {ordertype.name}
                </NavLink>
              </NavItem>
            ))}
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