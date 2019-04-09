import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import AppInput from '../form-fields/AppInput';

const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '13px',
                color: '#2b2b2b',
                letterSpacing: '0.025em',
                fontFamily: 'Arial, Source Code Pro',
                '::placeholder': {
                    color: '#BFBFBF'
                }
            },

            invalid: {
                color: '#727272',
            },
        },
    };
};

class _Stripe extends React.Component {
    state = {
        error: {
            cardNumber: null,
            cardExpiry: null,
            cardCvc: null
        }
    }

    componentDidMount () {
        // To access stripe error and param in parent component send the stripe object
        this.props.setStripeProps(this.props.stripe);
    }

    handleChange = (e) => {
        const { elementType, error } = e;

        if (e.complete || error) {
            let errorObj = Object.assign({}, this.state.error, { [elementType]: error });
            this.setState({ error: errorObj });
            this.props.setStripeData(e);
        }
    };

    render() {
        let error = {};

        if (this.props.showStripeError) {
            error  = this.state.error;
        }

        const cardError = this.props.validator.message('cardNumber', this.props.cardNumber, 'required'),
              cardErrorCls = cardError || error.cardNumber ? 'invalid' : '';

        const expiryError = this.props.validator.message('cardExpiry', this.props.cardExpiry, 'required'),
              expiryErrorCls = expiryError || error.cardExpiry ? 'invalid' : '';

        const cvvError = this.props.validator.message('cardCvc', this.props.cardCvc, 'required'),
              cvvErrorCls = cvvError || error.cardCvc ? 'invalid' : '';

        return (
            <React.Fragment>
                <AppInput label="Name on card" name="cardName" type="text" placeholder="John Doe" value={this.props.cardName} onChange={this.props.onChange} validator={this.props.validator} validation="required|alpha_space|min:3|max:30" />

                <div className={`app-input position-relative form-group mt-4 stripe-input ${cardErrorCls}`}>
                    <label className="focus">
                        Card number
                    </label>

                    <div className="card-no">
                        <fieldset aria-hidden="true">
                            <legend><span>&#8203;</span></legend>
                        </fieldset>

                        <CardNumberElement
                            onChange={this.handleChange}
                            {...createOptions(this.props.fontSize)}
                        />
                    </div>

                    {error.cardNumber && <div className="error-message">{error.cardNumber.message}</div>}

                    {/* To display required validation */}
                    {!error.cardNumber && cardError}
                </div>

                <div className="row mx-0 mt-4 justify-content-between">
                    <div className={`app-input position-relative form-group col-7 p-0 stripe-input ${expiryErrorCls}`}>
                        <label className="focus">
                            Expiry date
                        </label>

                        <div className="expiry">
                            <fieldset aria-hidden="true">
                                <legend><span>&#8203;</span></legend>
                            </fieldset>

                            <CardExpiryElement
                                onChange={this.handleChange}
                                {...createOptions(this.props.fontSize)}
                            />
                        </div>

                        {error.cardExpiry && <div className="error-message">{error.cardExpiry.message}</div>}

                        {/* To display required validation */}
                        {!error.cardExpiry && expiryError}
                    </div>


                    <div className={`app-input position-relative form-group col-4 p-0 stripe-input ${cvvErrorCls}`}>
                        <label className="focus">
                            CVV
                        </label>

                        <div className="cvv">
                            <fieldset aria-hidden="true">
                                <legend><span>&#8203;</span></legend>
                            </fieldset>

                            <CardCVCElement
                                onChange={this.handleChange}
                                placeholder="CVV"
                                {...createOptions(this.props.fontSize)}
                            />
                        </div>

                        {error.cardCvc && <div className="error-message">{error.cardCvc.message}</div>}

                        {/* To display required validation */}
                        {!error.cardCvc && cvvError}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const Stripe = injectStripe(_Stripe);
export default Stripe;

