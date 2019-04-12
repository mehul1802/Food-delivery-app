import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Button } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import { StripeProvider, Elements } from 'react-stripe-elements';
import _ from 'lodash';

import { stripePayment, session, ApiRequest } from '../services';
import Stripe from './app-components/Stripe';
import { formatPrice } from '../utils/common';

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

  componentDidMount() {   
    document.body.classList.add('checkout-body');   
  }

  componentWillUnmount() {    
   document.body.classList.remove('checkout-body');    
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
      const orderObj = Object.assign(this.props.order, param)
      await ApiRequest.triggerApi(`${process.env.REACT_APP_API_URL}/order`, orderObj);
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
      this.createOrder({ stripe_customer_id: id });
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
    const { products, subtotal_amount, tax_amount, order_amount } = this.props.order;
    return (
      <div className="row checkout-wrapper">
        <div className="col-12 col-md-8">
          <Card className="mt-4">
            <CardBody className="order-items p-0">
              {products.map(product => (
                <div className="order-item py-3 px-4 d-flex justify-content-between">
                  <div>
                    <div className="text-primary">{product.product_name}</div>
                    <div className="font-tiny d-flex mt-1">
                      <div className="text-light-gray">Quantity: <span className="text-dark">{product.quantity}</span></div>
                      <div className="ml-2 text-light-gray">Price: <span className="text-dark">{formatPrice(product.unit_price)}</span></div>
                    </div>
                  </div>
                  <div>
                    {formatPrice(product.total_price)}
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
          <Card className="mt-4">
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
        <div className="col-12 col-md-4">
          <Card className="mt-4">
            <CardBody>
              <div>subtotal {formatPrice(subtotal_amount)}</div>
              <div>Vat {formatPrice(tax_amount)}</div>
              <div>Total {formatPrice(order_amount)}</div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToCheckoutProps = (state) => {
  return { order: state.order.order };
};

const mapDispatchTocehckoutProps = {
};

export default connect(
  mapStateToCheckoutProps,
  mapDispatchTocehckoutProps
)(Checkout);
