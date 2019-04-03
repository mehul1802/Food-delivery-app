import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

import { ApiRequest } from '../../services/api-request';
import { formatPrice, strToLowercase } from '../../utils/common';
import closeIcon from '../../assets/images/close-icon.png';

const initialState = {
  product: {
    quantity: 1,
    bag_price: 0,
    comment: '',
    modifierTotal: 0,
  }
}

class MenuItemOptionsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    try {
      let response = await ApiRequest.getRecords(`${process.env.REACT_APP_API_URL}/product/${this.props.productId}`);
      let product = response.data;
      product.modifiers.map(modifier => {
        modifier = Object.assign(modifier, {key: strToLowercase(modifier.name), selected: false })
      });
    
      this.setState({ product: {
        ...this.state.product,
        ...product,
        bag_price: product.unit_price,
      } });
     
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

    this.setState({ product: {
      ...this.state.product,
      quantity: quantity
    }} , () => { this.calculateBasePrice();});
  };

  handleChangeQuantityTyped = val =>  {
    this.setState({ product: {
    ...this.state.product,
    quantity: val.target.value
  }})};
  
  calculateBasePrice = () => {
    let unitPrice;
    let modifierPrice;
    unitPrice = parseFloat(this.state.product.unit_price*this.state.product.quantity);
    modifierPrice = parseFloat(this.state.product.modifierTotal*this.state.product.quantity);
    
    this.setState({ product: {
      ...this.state.product,
      bag_price: unitPrice + modifierPrice
    }});
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

      this.setState({ product: {
        ...this.state.product,
        selected_Modifiers : selectedModifiers,
      }}, () => {
        const modifiersPrice = this.state.product.selected_Modifiers
          .reduce((modifiersPrice, modifier) => {
            modifiersPrice.push(modifier.price);
            return modifiersPrice;
          }, []);

            let modifierTotal = modifiersPrice.reduce(
              ( accumulator, currentValue ) => accumulator + currentValue,
              0
            );
           
           this.setState({ product: {
            ...this.state.product,
            modifierTotal
           }}, () => {this.calculateBasePrice()})
        });
  }

  addToCart = () => {
    console.log(this.state.product);
  }

  toggleOption = (e) => {
    const name = e.target.name;
    const obj = this.state.product.modifiers.map(item => {
      if (item.key === name) {
        item.selected = !item.selected
      }
      return item;
    })

    this.setState({ product: {
      ...this.state.product,
      modifiers : obj,
    }}, () => { this.selectedModifier()});
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
            <div className="item-header" style={{ background: `url("https://res.cloudinary.com/grubhub/image/upload/w_768,h_300,f_auto,q_auto,dpr_auto,g_auto,c_fill/usoaalkbgoxdczx6qfhh")` }}x> 
              <div className="position-absolute close-icon" onClick={handleMenuItemOptionsDialog}><img src={closeIcon} /></div>
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
              {this.state.product.modifiers &&
                <div className="mb-4">
                  <div className="font-dark">
                    <div className="font-medium medium">Complete your meal</div>
                    <div className="font-regular text-muted light mb-2">Optional. Here are some popular add-ons.</div>
                  </div>
                  <FormGroup tag="div" check className="row m-0 font-tiny d-flex">
                    {this.state.product.modifiers.map(modifier =>  <div className="col-6 col-md-4 py-2 mb-2" key={modifier.key}>
                      <Label check className="help-cntr">
                        <Input
                          name={modifier.key}
                          type="checkbox"
                          checked={this.state.product.modifiers.find(item => item.key === modifier.key).selected}
                          onChange={this.toggleOption}
                        />
                          <span>{modifier.name} - {formatPrice(modifier.price)}</span>
                      </Label>
                    </div>)}
                  </FormGroup>
                </div>
              }
              <div>
                <div className="font-medium medium">Special instruction</div>
                <Input name="special-instruction" type="textarea" rows={3} placeholder="Dressing on the side?No pickels" />
              </div>
            </div>

            <Button color="primary w-50 my-2 mx-4" onClick={this.addToCart}>Add to bag {formatPrice(this.state.product.bag_price)}</Button>
          </ModalBody>
        </Modal>
    );
  }
}

export default MenuItemOptionsDialog;
