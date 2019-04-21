import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import hash from 'object-hash';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

import { addToCart } from '../../../actions/cart-actions';


import { ApiRequest } from '../../../services/api-request';
import { session } from '../../../services';
import { formatPrice, strToLowercase } from '../../../utils/common';

import closeIcon from '../../../assets/images/close-icon.svg';

const initialState = {
  product: {
    quantity: 1,
    bag_price: 0,
    comment: '',
    modifierTotal: 0,
    tax_price: 0,
    modifier_groups: [],
    modifiers: []
  }
}

class MenuItemOptionsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    try {
      let response = await ApiRequest.getRecords(`${process.env.REACT_APP_API_URL}/menu/${this.props.productId}`);
      let product = response.data;
      product.modifiers = [];
      product.modifier_groups.map(modifierGroup => {
        modifierGroup = modifierGroup.items.map(modifier => {
          modifier = Object.assign(modifier, { key: strToLowercase(modifier.name), selected: false });
          product.modifiers.push(modifier);
        })
      });
      let unitTax = (parseFloat(product.vat_value) / 100) * parseFloat(product.unit_price);
      this.setState({
        product: {
          ...this.state.product,
          ...product,
          bag_price: product.unit_price,
          tax_price: unitTax,
          selected_main_modifier: product.main_modifiers[0]
        }
      }, () => {
        if (this.state.product.selected_main_modifier) {
          this.chooseMainIngredient(this.state.product.selected_main_modifier);
        }
      });

      let params = new URLSearchParams(this.props.location.search);
      if (!_.isEmpty(params.get("uid"))) {
        let cartItemId = params.get("uid");
        let product = this.props.products.find(item => item.uid === cartItemId);
        // this.setState({
        //   product: {
        //     ...this.state.product,
        //     modifiers: product.modifiers.map(modifier => Object.assign(modifier, { key: strToLowercase(modifier.name), selected: false })),
        //     main_modifier: product.main_modifier,
        //     quantity: product.quantity
        //   }
        // });
        console.log({
          product: {
            ...this.state.product,
            modifiers: product.modifiers.map(modifier => Object.assign(modifier, { key: strToLowercase(modifier.name), selected: false })),
            selected_main_modifier: product.main_modifier,
            quantity: product.quantity
          }
        })
        console.log(product);
      }

    } catch (e) {
      console.log(e);
    }
  }

  handleChangeQuantity = (option) => {
    let quantity;

    switch (option) {
      case 'plus':
        quantity = (this.state.product.quantity < this.state.product.stock) ? this.state.product.quantity + 1 : this.state.product.stock;
        break;
      case 'minus':
        quantity = (this.state.product.quantity > 1) ? this.state.product.quantity - 1 : 1;
        break;
      default:
        quantity = this.state.product.quantity;
        break;
    }

    this.setState({
      product: {
        ...this.state.product,
        quantity: quantity
      }
    }, () => { this.calculateBasePrice(); });
  };

  chooseMainIngredient = (item) => {
    this.setState({
      product: {
        ...this.state.product,
        selected_main_modifier: item,
        unit_price: item.price
      }
    }, () => {
      this.calculateBasePrice();
    });
  }

  handleChangeQuantityTyped = e => {
    this.setState({
      product: {
        ...this.state.product,
        quantity: parseInt(e.target.value)
      }
    }, () => { this.calculateBasePrice(); })
  };

  calculateBasePrice = () => {
    let unitPrice = 0;
    let modifierPrice = 0;
    let taxPrice = 0;
    let bagPrice = 0;
    unitPrice = parseFloat(this.state.product.unit_price * this.state.product.quantity);
    modifierPrice = parseFloat(this.state.product.modifierTotal * this.state.product.quantity);
    bagPrice = unitPrice + modifierPrice;
    taxPrice = (parseFloat(this.state.product.vat_value) / 100) * parseFloat(bagPrice);

    this.setState({
      product: {
        ...this.state.product,
        bag_price: bagPrice,
        tax_price: taxPrice
      }
    });
  }

  selectedModifier = () => {
    const selectedModifiers = this.state.product.modifiers
      .filter(modifier => modifier.selected)
      .reduce((list, modifier) => {
        list.push({
          id: modifier.id,
          name: modifier.name,
          price: modifier.price,
        });
        return list;
      }, []);

    this.setState({
      product: {
        ...this.state.product,
        selected_modifiers: selectedModifiers,
      }
    }, () => {
      const modifiersPrice = this.state.product.selected_modifiers
        .reduce((modifiersPrice, modifier) => {
          modifiersPrice.push(modifier.price);
          return modifiersPrice;
        }, []);

      let modifierTotal = Number(modifiersPrice.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      ).toFixed(2));

      this.setState({
        product: {
          ...this.state.product,
          modifierTotal
        }
      }, () => { this.calculateBasePrice() })
    });
  }

  addToCart = () => {
    const { product_id, product_name, cat_id, quantity, unit_price, vat_value, is_weight, modifierTotal, bag_price, tax_price, selected_modifiers, selected_main_modifier } = this.state.product;
    let obj = {
      product_id: product_id,
      product_name: product_name,
      cat_id: cat_id,
      quantity: quantity,
      unit_price: unit_price,
      vat_value: vat_value,
      is_weight: is_weight,
      modifiers_total: modifierTotal,
      tax_amount: tax_price,
      total_price: bag_price,
      modifiers: selected_modifiers || [],
      main_modifier: selected_main_modifier || {}
    };
    let product = {
      uid: hash(obj),
      ...obj
    }
    this.props.addToCart(product);
    session.setCartData(product);
    this.props.handleMenuItemOptionsDialog();
  }

  toggleOption = (e) => {
    const name = e.target.name;
    const obj = this.state.product.modifiers.map(item => {
      if (item.key === name) {
        item.selected = !item.selected
      }
      return item;
    })

    this.setState({
      product: {
        ...this.state.product,
        modifiers: obj,
      }
    }, () => { this.selectedModifier() });
  }

  render() {
    const { isOpen, handleMenuItemOptionsDialog, className } = this.props;
    const closeBtn = <button className="close" onClick={handleMenuItemOptionsDialog}>&times;</button>;

    return (
      <Modal
        isOpen={isOpen}
        toggle={handleMenuItemOptionsDialog}
        className={className}
        backdrop
        style={{ maxWidth: '750px' }}
      >
        <ModalBody>
          <div className="item-header" style={{ background: `url("https://res.cloudinary.com/grubhub/image/upload/w_768,h_300,f_auto,q_auto,dpr_auto,g_auto,c_fill/usoaalkbgoxdczx6qfhh")` }}>
            <div className="position-absolute close-icon" onClick={handleMenuItemOptionsDialog}>
              <img src={closeIcon} style={{ width: 20 }} />
            </div>
            <div className="item-info">
              <h4 className="item-title">{this.state.product.product_name}</h4>
              <span>{formatPrice(this.state.product.unit_price)}</span>
            </div>
          </div>
          <div className="item-options">
            <p className="m-0 desc light">This is a soup version of the classic, spicy New Orleans dish made with white meat chicken and Andouille sausage. Calories: Small 160, Medium 240, Large 320, Quart 640. Dairy-free. Gluten-free.</p>
            <div className="quantity-wrapper mb-5">
              <span>Quantity</span>
              <div className="quantity">
                <span onClick={() => this.handleChangeQuantity('minus')}>-</span>
                <Input
                  type="number"
                  min="1"
                  className="p-0 text-center"
                  onChange={val => this.handleChangeQuantityTyped(val)}
                  value={this.state.product.quantity} />
                <span onClick={() => this.handleChangeQuantity('plus')}>+</span>
              </div>
            </div>
            {!_.isEmpty(this.state.product.main_modifiers) && <div className="py-2 px-3 bg-light item-choice mb-4">
              <div className="font-dark">
                <div className="font-medium medium"> Choose size</div>
                <div className="font-regular light mb-2"> Requied - Choose 1</div>
                <FormGroup tag="div" className="row m-0">
                  {this.state.product.main_modifiers.map(main_modifier =>
                    <FormGroup check className="col-6 col-md-4 py-2 mb-2">
                      <Label check>
                        <Input type="radio" name="radio1" checked={this.state.product.selected_main_modifier['id'] === main_modifier.id} onChange={() => this.chooseMainIngredient(main_modifier)} />{' '}
                        <span className="text-dark align-middle">{main_modifier.name} - {formatPrice(main_modifier.price)}</span>
                      </Label>
                    </FormGroup>
                  )}
                </FormGroup>
              </div>
            </div>}

            <div className="mb-4">
              <div className="font-dark">
                <div className="font-medium medium">Complete your meal</div>
                <div className="font-regular text-muted light mb-2">Optional. Here are some popular add-ons.</div>
              </div>

              {this.state.product.modifier_groups.map(modifiers => <div className="d-flex flex-column font-tiny py-2" key={modifiers.name}>
                <div className="font-regular text-dark">{`* ${modifiers.name}`}</div>
                <FormGroup tag="div" className="row" check>
                  {modifiers.items.map(modifier => <Label check className="help-cntr pt-2 col-md-4 col-4">
                    <Input
                      name={modifier.key}
                      type="checkbox"
                      checked={this.state.product.modifiers.find(item => item.key === modifier.key).selected}
                      onChange={this.toggleOption}
                    />
                    <span>{modifier.name} - {formatPrice(modifier.price)}</span>
                  </Label>)}
                </FormGroup>
              </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="justify-content-start">
          <Button color="primary w-40 rounded" onClick={this.addToCart}>Add to bag {formatPrice(this.state.product.bag_price)}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToMenuItemOptionsProps = (state) => {
  return { products: state.cart.products };
};

const mapDispatchToMenuItemOptionsProps = {
  addToCart
};

export default withRouter(connect(
  mapStateToMenuItemOptionsProps,
  mapDispatchToMenuItemOptionsProps
)(MenuItemOptionsDialog));