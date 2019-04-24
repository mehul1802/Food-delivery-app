import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { withRouter } from "react-router";
import _ from 'lodash';
import { Alert, Button, Form, Card, CardBody } from 'reactstrap';

import AppInput from './form-fields/AppInput';
import { session, ApiRequest } from '../services';
import { getUser } from '../actions/user-actions';

const initialState = {
  name: '',
  phone: '',
  address: '',
  userDataFilled: false,
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!_.isEmpty(nextProps.user) && !prevState.userDataFilled) {
         return {
        name: nextProps.user.name,
        email: nextProps.user.email,
        address: nextProps.user.address,
        phone: nextProps.user.phone,
        user_id: nextProps.user.user_id,
        userDataFilled: true
      }
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  saveProfile = async event => {
    event.preventDefault();
    try {
      if (this.validator.allValid()) {

        const { name, phone, address, user_id } = this.state;
        let obj = {
          name: name,
          address: address,
          phone: phone,
          user_id: user_id,
        }
        console.log(obj);
        // const response = await session.authenticate(`${process.env.REACT_APP_API_URL}/users/login`, obj);
        // if (response.status === 200) {
        //   this.setState({  success: true, errorMessage: '' });
        // }

      } else {
        this.validator.showMessages();
        this.forceUpdate();
      }
    }
    catch (e) {
      this.handleErrors(e);
    }
  }

  displayError = () => {
    if (this.state.errorMessage) {
      return (<Alert color="danger" className="error-message py-2 mt-3">
        {this.state.errorMessage}
      </Alert>)
    } else {
      return null
    }
  }

  handleErrors = (e) => {
    const errorObj = e.response.data;
    if (errorObj.error) {
      this.setState({
        errorMessage : errorObj.error
      })
    } else {
      this.setState({
        fieldErrors : errorObj
      })
    }
  }


  render() {
    return (
      <div className="container">
        <div className="profile-section my-5">
          <Card>
            <CardBody className="p-4">
              <h1 className="mb-4">Profile</h1>
              <div className="py-3">
                <Form onSubmit={this.saveProfile}>
                  <div className="d-flex mb-5">
                    <div className="user-avatar d-flex justify-content-center align-items-center">
                      <p className="user-letter m-0">{this.state.name[0]}</p>
                    </div>
                    <div className="ml-4">
                      <div className="font-large">{this.state.name}</div>
                      <div>{this.state.email}</div>
                    </div>
                  </div>
                  <AppInput label="Name" name="name" type="text" value={this.state.name} onChange={this.onChange} validator={this.validator} validation="required|name" />
                  <AppInput label="Phone" name="phone" type="text" value={this.state.phone} onChange={this.onChange} validator={this.validator} validation="required|phone" />
                  <AppInput label="Address" name="address" type="text" value={this.state.address} onChange={this.onChange} validator={this.validator} validation="required|address" />
                  <Button color="primary w-20 rounded mt-4">Save</Button>
                  {this.displayError()}
                  {this.state.success && <Alert color="success">User update successfully</Alert>}
                </Form>
              </div>
            </CardBody>
          </Card>
      </div>
    </div>
    );
  }
}

const mapStateToUserProfileProps = (state) => {
  return { user: state.authentication.user };
};

const mapDispatchToUserProfileProps = {
  getUser,
};

export default withRouter(connect(
  mapStateToUserProfileProps,
  mapDispatchToUserProfileProps
)(UserProfile));
