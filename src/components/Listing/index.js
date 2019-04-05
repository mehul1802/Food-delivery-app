import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ListingHeader from './ListingHeader';
import Product from '../Shared/Product';
import defaultProducts from '../../utils/products.json';
import { Collapse } from 'reactstrap';
import MenuItemOptionsDialog from '../Dialog/MenuItemOptionsDialog';
import OrderTypeDialog from '../Dialog/OrderTypeDialog';
import { addOrderType } from '../../actions/order-actions';

import { ApiRequest } from '../../services/api-request';

import discBanner from '../../assets/images/discount-banner.jpg';
import arrowDown from '../../assets/images/arrow-down.svg';


const initialState = {
  menuItemOptionsModal: false,
  menuList: [],
};

class Listing extends Component {

  state = initialState

  async componentDidMount() {
    try {
      let response = await ApiRequest.getRecords(`${process.env.REACT_APP_API_URL}/menu`);
      let menuList = response.data;
      this.setState({ menuList });
    } catch (e) {
      console.log(e);
    }
  }

  addOrderType = (orderType) => {
    this.props.addOrderType(orderType);
    this.setState({ orderTypeModal: false });
  }

  handleOrderType = (productId) => {
    if(this.props.orderType) {
      this.productOptionModal(productId);
    } else {
      this.setState({ orderTypeModal: true });
    }
    
  }

  productOptionModal = (productId) => {
    this.setState({ menuItemOptionsModal: true, productId: productId });
    // this.props.history.push(`/product/${productId}`);
  }

  handleMenuItemOptionsDialog = () => {
    this.setState({ menuItemOptionsModal: false });
  }

  toggle = (categoryName) => {

    const menuList = this.state.menuList.map(item => {
      let cetegoryObj = _.cloneDeep(item);
      if (item.category_name === categoryName) {
        // Avoid mutating state directly
        return { ...cetegoryObj, collapse: !cetegoryObj.collapse };
      } else {
        return cetegoryObj;
      }
    });

    this.setState({
      menuList
    });
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
          {/* <div className="popular-product-section mt30">
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
          </div> */}
          {this.state.menuList.map(item => <div className="restaurant-menu-section mt30" key={item.category_name}>
            <div className="restaurant-menu-header d-flex justify-content-between align-items-center" onClick={() => this.toggle(item.category_name)}>
              <h3 className="font-weight-bold font-large product-cat-title">{item.category_name}</h3>
              <img className="w-10" src={arrowDown} style={{ transform: `${item.collapse ? 'rotate(-180deg)' : 'unset'}` }} />
            </div>
            <Collapse isOpen={!item.collapse}>
              <div className="row">
                {item.list_items.map(product => (
                  <div className="col-md-6 p-2" key={product.ProductID}>
                    <Product product={product} onClick={(e) => this.handleOrderType(product.ProductID)}/>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>)
          }
        </div>
        {this.state.menuItemOptionsModal &&
          <MenuItemOptionsDialog
            isOpen={this.state.menuItemOptionsModal}
            productId={this.state.productId}
            handleMenuItemOptionsDialog={this.handleMenuItemOptionsDialog}
            className="menuitem-options-wrapper"
          />
        }
        {this.state.orderTypeModal &&
          <OrderTypeDialog
            isOpen={this.state.orderTypeModal}
            addOrderType={this.addOrderType}
          />
        }
      </div>
    );
  }
}

Listing.defaultProps = {
  products: defaultProducts,
};

const mapStateToListingProps = (state) => {
   return { orderType: state.order.orderType };
};

const mapDispatchToListingProps = {
  addOrderType
};

export default withRouter(connect(
  mapStateToListingProps,
  mapDispatchToListingProps
)(Listing));
