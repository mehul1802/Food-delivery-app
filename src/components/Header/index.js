import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Input, Button} from 'reactstrap';
 import logo from '../../assets/images/logo.svg';
 import cart from '../../assets/images/cart.svg';


class Header extends Component {
	constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="header-section">
       <Navbar color="white" white expand="md">
          <NavbarBrand href="/"><img src={logo} alt="logo"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="w-25" navbar>
              <NavItem className="w-100">
                <Input type="email" name="email" id="exampleEmail" placeholder="pizza, sushi and chinese" />
              </NavItem>
            </Nav>
            <Nav className="ml-auto nav-right d-flex align-items-center" navbar>
              <NavItem>
                <Button outline color="primary" className="rounded signin-btn">Sign in</Button>
              </NavItem>
              <NavItem className="w-24 cart-icon">
               <img src={cart} alt="cart" />
              </NavItem>
            </Nav>
          </Collapse>
         </Navbar>
      </div>
    );
  }
}

export default Header;
