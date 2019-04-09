import React, { Component } from 'react';
import CartDrawer from '../CartDrawer';
import { StripeProvider, Elements } from 'react-stripe-elements';

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

  setStripeData = (e) => {
    const { elementType, complete } = e;
    this.setState({ [elementType]: complete });
  }

  async triggerPayment(userId = 0, customerId = null) {
    try {
      let url = '', obj = {};

      if (!_.isEmpty(customerId)) {
        url = `/${customerId}/sources`;
      } else {
        obj.description = `New Traveler creation - ${userId}`;
      }

      // Create stripe Token
      const response = await this.state.stripe.createToken({ name: this.state.cardName });
      obj.source = response.token.id;

      // Create customer
      const customer = await stripePayment.createCustomer(obj, url);
      let id = customer.data.id

      // Create new booking after adding card in stripe
      this.props.createBooking(customerId ? { card_id: id } : { stripe_customer_id: id });
    } catch (e) {
      // showError(this.props.notification, e);
    }
  }

  placeOrder = () => {
    try {
      if (this.validator.allValid()) {
        this.triggerPayment(session.userId, this.props.customerId);
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
    return (
     <div>Checkout page</div>
    );
  }
}

export default Checkout;
