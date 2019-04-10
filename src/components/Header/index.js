import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import API from '../../services/api';
import { store } from '../../store';
import { session, ApiRequest } from '../../services';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Input, Button} from 'reactstrap';
import SignInDialog from '../Dialog/SignInDialog';
import logo from '../../assets/images/logo.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import cart from '../../assets/images/cart.svg';


class Header extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      signInModal: false,
    };
  }

  async componentDidMount() {
    if(session.isLoggedIn()) {
      const user = await API.get(`${process.env.REACT_APP_API_URL}/users/me`);
      store.dispatch({ type: 'GET_USER', payload: user.data })
    }
  }

  handleSignInDialog = () => {
    this.setState(prevState => ({
      signInModal: !prevState.signInModal
    }));
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
    const { user } = this.props;
    return (
      <div className="header-section">
       <Navbar color="white" expand="md">
          <NavbarBrand href="/"><img src={logo} alt="logo"/></NavbarBrand>
          
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
                      style={{ width: 10, height: 10, transform: `${this.state.isOpen ? 'rotate(-180deg)' : 'unset'}`}} />
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
           isOpen={this.state.signInModal}
           handleSignInDialog={this.handleSignInDialog}
           className="signin-wrapper"
          />
      </div>
    );
  }
}

const mapStateToHeaderProps = (state) => {
  return { user: state.authentication.user };
};

const mapDispatchToHeaderProps = {
  
};

export default connect(
  mapStateToHeaderProps,
  mapDispatchToHeaderProps
)(Header);
