import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import _ from 'lodash';
import { Button, Form } from 'reactstrap';

import AppInput from './form-fields/AppInput';
import { session, ApiRequest } from '../services';
import { getUser } from '../actions/user-actions';

const initialState = {
  user: ''
}

const initiateValidation = () => {
  return new SimpleReactValidator({
    element: message => <div className="text-left error-message">{message}</div>
  });
};


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.validator = initiateValidation();
  }

  state = initialState;

  static getDerivedStateFromProps(nextProps) {
    this.setState({ user: nextProps.user})
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name] : value,
      }
    }))
  }

  saveProfile = async event => {
    event.preventDefault();
    console.log(this.state);
    // try {
    //   if (this.validator.allValid()) {

    //     let credential = { email: this.state.accEmail, password: this.state.accPassword };
    //     const response = await session.authenticate(`${process.env.REACT_APP_API_URL}/users/login`, credential);
    //     if (response.status === 200) {
    //       this.closeSingInDialog();
    //     }

    //   } else {
    //     this.validator.showMessages();
    //     this.forceUpdate();
    //   }
    // }
    // catch (e) {
    //   this.handleErrors(e);
    // }
  }


  render() {
    
    const { user } = this.state;
    return (
      <div className="container">
        <div className="profile-section mt-5 mb-5">
          <h1 className="pb-3">Profile</h1>
          <div className="my-3">
          <Form onSubmit={this.saveProfile}>
            <AppInput label="Email" name="email" type="email" value={user.email} onChange={this.onChange} validator={this.validator} validation="required|email" />
            <AppInput label="Name" name="name" type="text" value={user.name} onChange={this.onChange} validator={this.validator} validation="required|name" />
            <AppInput label="Phone" name="phone" type="text" value={user.phone} onChange={this.onChange} validator={this.validator} validation="required|phone" />
            <AppInput label="Address" name="Address" type="text" value={user.address} onChange={this.onChange} validator={this.validator} validation="required|address" />
            <Button color="primary w-20 rounded mt-3">Save</Button>
          </Form>
          </div>
      </div>
    </div>
    );
  }
}

const mapStateToUserProfileProps = (state) => {
  return { user: state.authentication.user };
};

const mapDispatchToUserProfileProps = {
  
};

export default withRouter(connect(
  mapStateToUserProfileProps,
  mapDispatchToUserProfileProps
)(UserProfile));
