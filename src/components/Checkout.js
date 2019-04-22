import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardBody, Button } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import { StripeProvider, Elements } from 'react-stripe-elements';
import _ from 'lodash';

import { removeOrder } from '../actions/order-actions';
import { resetCart } from '../actions/cart-actions';
import { stripePayment, session, ApiRequest } from '../services';
import Stripe from './app-components/Stripe';
import AppInput from './form-fields/AppInput';
import { formatPrice } from '../utils/common';

const initialState = {
  stripe: null,
  showStripeError: false,
  comment: '',
  cardName: '',
  cardNumber: null,
  cardExpiry: null,
  cardCvc: null,
  cardId: null,
  redirectToSuccess : false,
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
      const orderObj = Object.assign(this.props.order, param, {comment: this.state.comment});
      const response = await ApiRequest.triggerApi(`${process.env.REACT_APP_API_URL}/order`, orderObj);
      if (response.status === 200) {
        this.setState({
          redirectToSuccess: true
        });
        this.props.removeOrder();
        this.props.resetCart();
        session.removeCartData();
        session.removeOrderData();
      }
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
      this.setState({ showStripeError: true });
      if (this.validator.allValid()) {
        const { user: { stripe_customer_id } } = this.props;
        this.triggerPayment(session.userId, stripe_customer_id);
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
    if (this.state.redirectToSuccess) {
      return (
          <Redirect to="/checkout/success" />
      );
    }

    if (_.isEmpty(this.props.order)) {
      return (
          <Redirect to="/" />
      );
    }

    const { products, subtotal_amount, tax_amount, order_amount } = this.props.order;
    return (
      <div className="container">
        <div className="checkout-wrapper mt-5 mb-5">
          <h1 className="pb-2">Confirm and pay</h1>
          <div className="row mt-4">
            <div className="col-12 col-md-8">
              <Card>
                <CardBody className="order-items p-0">
                  {products.map(product => (
                    <div className="order-item py-3 px-4 d-flex justify-content-between">
                      <div style={{ width: 'calc(100% - 100px)' }}>
                        <div className="text-primary">{product.product_name}</div>
                        <div className="font-tiny d-flex mt-1">
                          <div className="text-light-grey">Quantity: <span className="text-dark">{product.quantity}</span></div>
                          <div className="ml-2 text-light-grey">Price: <span className="text-dark">{formatPrice(product.unit_price)}</span></div>
                        </div>
                        {product.modifiers.length > 0 &&
                          <div className="pt-2 d-flex flex-wrap">
                            {product.modifiers.map((modifier,i) => (
                              <span className="text-light-grey font-tiny pr-1">{modifier.name}{i+1 < product.modifiers.length && ','}</span>
                            ))}
                          </div>
                        }
                      </div>
                      <div>
                        {formatPrice(product.total_price)}
                      </div>
                    </div>
                  ))}
                </CardBody>
              </Card>
              <div className="dotted-border my-4" />
              <AppInput
                name="comment"
                label="Add delivery instructions"
                type="textarea"
                rows={4}
                value={this.state.comment}
                onChange={this.onChange}
                placeholder="Delivery instructions (e.g. Check in with doorman.)"
              />
            </div>
            <div className="col-12 col-md-4">
              <Card>
                <CardBody className="p-3 bg-white">
                  <div className="d-flex justify-content-between font-regular pb-2">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal_amount)}</span>
                  </div>
                  <div className="d-flex justify-content-between font-regular pb-2">
                    <span>Tax</span>
                    <span>{formatPrice(tax_amount)}</span>
                  </div>
                  <div className="d-flex justify-content-between font-large">
                    <span>Total</span>
                    <span>{formatPrice(order_amount)}</span>
                  </div>
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
                  <Button color="secondary" className="rounded d-block w-100 mt-2 btn btn-secondary p-0" onClick={this.placeOrder}>Place order</Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToCheckoutProps = (state) => {
  return { order: state.order.order, user: state.authentication.user };
};

const mapDispatchTocehckoutProps = {
  removeOrder,
  resetCart,
};

export default connect(
  mapStateToCheckoutProps,
  mapDispatchTocehckoutProps
)(Checkout);
