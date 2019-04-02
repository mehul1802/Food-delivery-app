import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

import { ApiRequest } from '../../services/api-request';
import { currencyFormat, strToLowercase } from '../../utils/common';
import closeIcon from '../../assets/images/close-icon.png';

const initialState = {
  product: {},
  options: {
    quantity: 1,
    bag_price: 0,
    comment: '',
    extra: [
      {
        key: 'toasted-bagel',
        name: 'Grilled Bagel',
        amount: 0,
        selected: false,
      }, {
        key: 'toasted-bagel2',
        name: 'Bagel',
        amount: 300,
        selected: false,
      }, {
        key: 'toasted-bagel3',
        name: 'Cheese',
        amount: 400,
        selected: false,
      }
    ]
  }
}

class MenuItemOptionsDialog extends Component {
	constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    try {
      let response = await ApiRequest.getRecords(`${process.env.REACT_APP_API_URL}/product/20`);
      let product = response.data;
      // this.setState({ productList });
      product.modifiers.map(modifier => {
        modifier.slug = strToLowercase(modifier.name);
        modifier.selected = 'false';
      });
      
      this.setState({ product });
     
    } catch (e) {
      console.log(e);
    }
  }

  toggleOption = (e) => {
    const name = e.target.name;
    const obj = this.state.options.extra.map(item => {
      if (item.key === name) {
        item.selected = !item.selected
      }
      return item;
    })
    this.setState({
      options: Object.assign({}, this.state.options, { extra: obj })
    });
  }
 
  render() {
    const { isOpen, handleMenuItemOptionsDialog, className } = this.props;
    const closeBtn = <button className="close" onClick={handleMenuItemOptionsDialog}>&times;</button>;
    console.log(this.state.product);
    return (
       <Modal
         isOpen={true}
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
               <span>{this.state.product.unit_price}</span>
              </div>
            </div>
            <div className="item-options">
              <p className="m-0 desc light">This is a soup version of the classic, spicy New Orleans dish made with white meat chicken and Andouille sausage. Calories: Small 160, Medium 240, Large 320, Quart 640. Dairy-free. Gluten-free.</p>
              <div className="quantity-wrapper mb-5">
                 <span>Quantity</span>
                 <div className="quantity">
                    <span>-</span>
                    <Input type="text" />
                    <span>+</span>
                 </div>
              </div>
              <div className="mb-4">
                <div className="font-dark">
                  <div className="font-medium medium">Complete your meal</div>
                  <div className="font-regular text-muted light mb-2">Optional. Here are some popular add-ons.</div>
                </div>
                <FormGroup tag="div" check className="row justify-content-center m-0 font-tiny d-flex">
                  {this.state.product.modifiers.map(modifier =>  <div className="col-6 col-md-4 py-2 mb-2">
                    <Label check className="help-cntr">
                      <Input
                        name="toasted-bagel"
                        type="checkbox"
                        checked={this.state.options.extra.find(item => item.key === 'toasted-bagel').selected}
                        onChange={this.toggleOption}
                      />
                        <span>{modifier.name}</span>
                    </Label>
                  </div>)}
                </FormGroup>
              </div>
              <div>
                <div className="font-medium medium">Special instruction</div>
                <Input name="special-instruction" type="textarea" rows={3} placeholder="Dressing on the side?No pickels" />
              </div>
            </div>

            <Button color="primary w-50 my-2 mx-4" onClick={handleMenuItemOptionsDialog}>Add to bag</Button>
          </ModalBody>
        </Modal>
    );
  }
}

export default MenuItemOptionsDialog;
