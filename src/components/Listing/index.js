import React, { Component } from 'react';
import ListingHeader from './ListingHeader';
import PopularProduct from '../Shared/PopularProduct';
import Product from '../Shared/Product';
import defaultProducts from '../../utils/products.json';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import MenuItemOptionsDialog from '../Dialog/MenuItemOptionsDialog';

import arrowIcon from '../../assets/images/cart.svg';
import discBanner from '../../assets/images/discount-banner.jpg';
import arrowDown from '../../assets/images/arrow-down.svg';
import popularIcon from '../../assets/images/popular-icon.svg';


class Listing extends Component {
	constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      menuItemOptionsModal: false,
    };
  }

   handleMenuItemOptionsDialog = () => {
    this.setState(prevState => ({
      menuItemOptionsModal: !prevState.menuItemOptionsModal
    }));
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  }
 
  render() {
    return (
      <div>
        <ListingHeader />
        <div className="restaurant-product-listing">
          <div className="res-banner-section d-flex">
            <img src={discBanner} />
            <div className="bg-blue banner-offer-text d-flex">
              <div style={{ flexBasis: '70%', marginRight: '20px' }}>
                <h4>Get $10 off your first app order!</h4>
                <p className="m-0">Download the Grubhub app to get $10 off your first delivery order.</p>
              </div>
              <a href="#" className="hot-deal-offer">Hot Deal</a>
            </div>
          </div>
          <div className="popular-product-section mt30">
            <div className="d-flex align-items-center">
              <h3 className="font-weight-bold font-large product-cat-title">Most Popular</h3>
              <img src={popularIcon} width="24" />
            </div>
            <div className="row">
              {this.props.products &&
                this.props.products.map(product => (
                  <div className="col-md-6 p-2">
                    <PopularProduct
                     product={product}
                     handleMenuItemOptionsDialog={this.handleMenuItemOptionsDialog}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="restaurant-menu-section mt30">
           <div className="restaurant-menu-header d-flex justify-content-between align-items-center" onClick={this.toggle}>
              <h3 className="font-weight-bold font-large product-cat-title">Drinks</h3>
              <img className="w-10" src={arrowDown} style={{ transform: `${this.state.collapse ? 'rotate(-180deg)' : 'unset'}`}}/>
           </div>
           <Collapse isOpen={this.state.collapse}>
              <div className="row">
              {this.props.products &&
                this.props.products.map(product => (
                  <div className="col-md-6 p-2">
                    <Product product={product} />
                  </div>
                ))
              }
              </div>
           </Collapse>
          </div>
        </div>
        <MenuItemOptionsDialog
           isOpen={this.state.menuItemOptionsModal}
           handleMenuItemOptionsDialog={this.handleMenuItemOptionsDialog}
           className="menuitem-options-wrapper"
          />
      </div>
    );
  }
}

Listing.defaultProps = {
  products: defaultProducts,
};


export default Listing;
