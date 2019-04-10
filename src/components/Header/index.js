import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

import { store } from '../../store';
import { session, ApiRequest } from '../../services';
import { showLogin, hideLogin } from '../../actions/dialog-actions';

import SignInDialog from '../Dialog/SignInDialog';
import logo from '../../assets/images/logo.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import cart from '../../assets/images/cart.svg';

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
      store.dispatch({ type: 'GET_USER', payload: user.data })
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
    const { user, showSignIn } = this.props;
    return (
      <div className="header-section">
        <Navbar color="white" expand="md">
          <Link to="/"><NavbarBrand><img src={logo} alt="logo" /></NavbarBrand></Link>
          <Nav className="w-25" navbar>
            <NavItem className="w-100">
              <Input type="email" name="email" id="exampleEmail" placeholder="pizza, sushi and chinese" />
            </NavItem>
          </Nav>
          <Nav className="ml-auto nav-right d-flex align-items-center" navbar>
            {!session.isLoggedIn() ?
              <NavItem>
                <Button outline color="primary" className="rounded signin-btn" onClick={this.handleSignInDialog}>Sign in</Button>
              </NavItem>
              :
              <NavItem className="px-3">
                <Dropdown isOpen={this.state.isOpen} size="sm" toggle={this.toggle}>
                  <DropdownToggle className="bg-white border-0 text-secondary">
                    <span className="text-capitalize mr-3 font-tiny">Hi, {user.name}</span>
                    <img src={arrowDown}
                      style={{ width: 10, height: 10, transform: `${this.state.isOpen ? 'rotate(-180deg)' : 'unset'}` }} />
                  </DropdownToggle>
                  <DropdownMenu className="p-2">
                    <div className="font-small cursor-pointer" onClick={this.logout}>Sign out</div>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            }

            <NavItem className="w-24 cart-icon">
              <img src={cart} alt="cart" />
            </NavItem>
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
  hideLogin
};

export default connect(
  mapStateToHeaderProps,
  mapDispatchToHeaderProps
)(Header);
