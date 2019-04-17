import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import _ from 'lodash';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Input, Button
} from 'reactstrap';

import { session, ApiRequest } from '../services';
import { showLogin, hideLogin } from '../actions/dialog-actions';
import { getUser } from '../actions/user-actions';

import SignInDialog from './app-components/dialog/SignInDialog';
import logo from '../assets/images/logo_trans.png';
import arrowDown from '../assets/images/arrow-down.svg';
import cart from '../assets/images/cart.svg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  async componentDidMount() {
    if (session.isLoggedIn()) {
      const user = await ApiRequest.getRecords(`${process.env.REACT_APP_API_URL}/users/me`);
      this.props.getUser(user.data);
    }
  }

  handleSignInDialog = () => {
    if (this.props.showSignIn) {
      this.props.hideLogin();
    } else {
      this.props.showLogin();
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = () => {
    session.logout();
    this.toggle();
  }

  render() {
    const { user, showSignIn, location } = this.props;
    let isHome = location.pathname === '/';
    return (
      <div className="header-section">
        <Navbar color="white" expand="md">
          <Link to="/"><NavbarBrand><img src={logo} alt="logo" /></NavbarBrand></Link>
          {isHome && <Nav className="w-25" navbar>
            <NavItem className="w-100">
              <Input type="email" name="email" id="exampleEmail" placeholder="pizza, sushi and chinese" />
            </NavItem>
          </Nav>}
          <Nav className="ml-auto nav-right d-flex align-items-center" navbar>
            {!session.isLoggedIn() ?
              <NavItem>
                <Button outline color="primary" className="rounded signin-btn" onClick={this.handleSignInDialog}>Sign in</Button>
              </NavItem>
              :
              <NavItem>
                <Dropdown isOpen={this.state.isOpen} size="sm" toggle={this.toggle}>
                  <DropdownToggle className="bg-white border-0 text-secondary">
                    <span className="text-capitalize mr-3 font-tiny">Hi, {user.name}</span>
                    <img src={arrowDown}
                      style={{ width: 10, height: 10, transform: `${this.state.isOpen ? 'rotate(-180deg)' : 'unset'}` }} />
                  </DropdownToggle>
                  <DropdownMenu className="p-2">
                    <DropdownItem className="font-small cursor-pointer" onClick={this.logout}>Sign out</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            }

            {isHome && <NavItem className="w-24 cart-icon">
              <img src={cart} alt="cart" />
            </NavItem>}
          </Nav>

        </Navbar>
        <SignInDialog
          isOpen={showSignIn}
          handleSignInDialog={this.handleSignInDialog}
          className="signin-wrapper"
        />
      </div>
    );
  }
}

const mapStateToHeaderProps = (state) => {
  return { user: state.authentication.user, showSignIn: state.dialog.showSignIn };
};

const mapDispatchToHeaderProps = {
  showLogin,
  hideLogin,
  getUser,
};

export default withRouter(connect(
  mapStateToHeaderProps,
  mapDispatchToHeaderProps
)(Header));
