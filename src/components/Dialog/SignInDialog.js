import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import AppInput from '../form-fields/AppInput';
import { session, ApiRequest } from '../../services';
import { showError } from '../../helpers';

const loginInitalState = {
  accEmail: '',
  accPassword: '',
};

const registerInitalState = {
  name: '',
  phone: '',
  email: '',
  address: '',
  password: '',
};

const initiateValidation = () => {
  return new SimpleReactValidator({
    element: message => <div className="text-left error-message">{message}</div>
  });
};

class SignInDialog extends Component {
  constructor(props) {
    super(props);
    this.validator = initiateValidation();
  }

  state = {
    ...loginInitalState,
    ...registerInitalState,
    showSignUp: false,
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleLogin = async event => {
    event.preventDefault();
    try {
      if (this.validator.allValid()) {
        this.closeSingInDialog();
        let credential = { email: this.state.accEmail, password: this.state.accPassword };
        const response = await session.authenticate(`${process.env.REACT_APP_API_URL}/users/login`, credential);

      } else {
        this.validator.showMessages();
        this.forceUpdate();
      }
    }
    catch (event) {
      showError(this.props.notification, event);
    }
  }

  handleSignUp = async event => {
    event.preventDefault();
    try {
      if (this.validator.allValid()) {
        const { name, email, password, address, phone } = this.state;
        let obj = {
          email: email,
          name: name,
          address: address,
          phone: phone,
          password: password,
        }
        const response = await ApiRequest.triggerApi(`${process.env.REACT_APP_API_URL}/users/register`, obj);
        if (response.status === 200) {
          this.setState({ success: true });
          this.setState({ ...registerInitalState });
        }
      } else {
        this.validator.showMessages();
        this.forceUpdate();
      }
    }
    catch (event) {
      showError(this.props.notification, event);
    }
  }

  showSignUp = () => {
    this.setState({ showSignUp: !this.state.showSignUp });
    this.validator = initiateValidation();
  }

  closeSingInDialog = () => {
    this.setState({ showSignUp: false });
    this.props.handleSignInDialog();
    this.validator = initiateValidation();
  }

  render() {
    const { isOpen, handleSignInDialog, className } = this.props;
    const closeBtn = <button className="close" onClick={this.closeSingInDialog}>&times;</button>;
    return (
      <Modal
        isOpen={isOpen}
        toggle={this.closeSingInDialog}
        className={className}
        backdrop
        style={{ maxWidth: '570px' }}
      >
        <ModalHeader toggle={handleSignInDialog} close={closeBtn}>
          {!this.state.showSignUp ? 'Sign in with your account' : 'Register'}
        </ModalHeader>
        <ModalBody className="mt-2">
          {!this.state.showSignUp &&
            <React.Fragment>
              <Form onSubmit={this.handleLogin}>
                <div>
                  <AppInput label="Email" name="accEmail" type="email" value={this.state.accEmail} onChange={this.onChange} validator={this.validator} validation="required|email" />
                  <AppInput label="Password" name="accPassword" type="password" value={this.state.accPassword} onChange={this.onChange} validator={this.validator} validation="required|password" />
                </div>
                <Button color="primary w-100 mt-3">Sign In</Button>
                {this.props.errorMessage &&
                  <Alert color="danger" className="error-message py-2 mt-3">
                    {this.props.errorMessage}
                  </Alert>}
                <div className="font-small mt-2 mb-2 text-center">
                  Already have an account?
                  <span className="text-secondary ml-1 cursor-pointer" onClick={this.showSignUp}>Create an account</span>
                </div>
              </Form>
            </React.Fragment>
          }
          {this.state.showSignUp &&
            <React.Fragment>
              {this.state.success && <p>Thank you for registration</p>}
              <Form onSubmit={this.handleSignUp}>
                <AppInput label="Name" name="name" type="text" value={this.state.name} onChange={this.onChange} validator={this.validator} validation="required|alpha_space|min:3|max:30" />
                <AppInput label="Phone" name="phone" type="text" value={this.state.phone} onChange={this.onChange} validator={this.validator} validation="required|phone" />
                <AppInput label="Email" name="email" type="email" value={this.state.email} onChange={this.onChange} validator={this.validator} validation="required|email" />
                <AppInput label="Address" name="address" type="text" value={this.state.address} onChange={this.onChange} validator={this.validator} validation="required|address" />
                <AppInput label="Password" name="password" type="password" value={this.state.password} onChange={this.onChange} validator={this.validator} validation="required|password" />
                <Button color="primary w-100 mt-3">Create Account</Button>
              </Form>

              <div className="font-small mt-2 mb-2 text-center">
                Already have an account?
                <span className="text-secondary ml-1 cursor-pointer" onClick={this.showSignUp}>Sign in</span>
              </div>
            </React.Fragment>
          }
        </ModalBody>
      </Modal>
    );
  }
}

export default SignInDialog;
