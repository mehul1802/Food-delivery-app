import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Button } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import { StripeProvider, Elements } from 'react-stripe-elements';
import _ from 'lodash';

import { stripePayment, session, ApiRequest } from '../services';
import Stripe from './app-components/Stripe';

const initialState = {
  stripe: null,
  showStripeError: false,
  cardName: '',
  cardNumber: null,
  cardExpiry: null,
  cardCvc: null,
  cardId: null,
};

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({
      messages: {
        card_num: 'Your card number is incomplete.'
      },
      element: message => <div className="error-message">{message}</div>
    });
  }

  state = initialState;

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  setStripeProps = (param) => {
    this.setState({
      stripe: param
    });
  }

  setStripeData = (e) => {
    const { elementType, complete } = e;
    this.setState({ [elementType]: complete });
  }

  createOrder = async (param = {}) => {
    try {
      let obj = {
      };
      console.log('sdf')
      // await ApiRequest.triggerApi(`${process.env.REACT_APP_API_URL}/order`, Object.assign(obj, param));
    } catch (e) {
      // showError(this.props.api.notification, e);
      console.log(e)
    }
  }

  async triggerPayment(userId = 0, customerId = null) {
    try {
      let url = '', obj = {};

      if (!_.isEmpty(customerId)) {
        url = `/${customerId}/sources`;
      } else {
        obj.description = `New User creation - ${userId}`;
      }

      // Create stripe Token
      const response = await this.state.stripe.createToken({ name: this.state.cardName, cardNumber: this.state.cardNumber });
      obj.source = response.token.id;

      // Create customer
      const customer = await stripePayment.createCustomer(obj, url);
      let id = customer.data.id

      // Create new booking after adding card in stripe
      this.createOrder(customerId ? { card_id: id } : { stripe_customer_id: id });
    } catch (e) {
      // showError(this.props.notification, e);
      console.log(e);
    }
  }

  placeOrder = () => {
    try {
      if (this.validator.allValid()) {
        this.triggerPayment(session.userId);
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
      }
    } catch (e) {
      // showError(this.props.notification, e);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="row">
        <div className="col-12 col-md-6 mx-auto">
          <Card>
            <CardBody>
              <div className="checkout">
                <StripeProvider apiKey={stripePayment.key}>
                  <Elements>
                    <Stripe
                      cardName={this.state.cardName}
                      setStripeProps={this.setStripeProps}
                      onChange={this.onChange}
                      validator={this.validator}
                      showStripeError={this.state.showStripeError}
                      setStripeData={this.setStripeData}
                      cardNumber={this.state.cardNumber}
                      cardExpiry={this.state.cardExpiry}
                      cardCvc={this.state.cardCvc}
                    />
                  </Elements>
                </StripeProvider>
              </div>
            </CardBody>
          </Card>
          <Button color="secondary" className="d-block mx-auto my-3" onClick={this.placeOrder}>Place order</Button>
        </div>
      </div>
    );
  }
}

const mapStateToCheckoutProps = (state) => {
  return { order: state.order };
};

const mapDispatchTocehckoutProps = {
};

export default connect(
  mapStateToCheckoutProps,
  mapDispatchTocehckoutProps
)(Checkout);
