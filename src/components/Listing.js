import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Product from './app-components/Product';
import { Collapse } from 'reactstrap';
import MenuItemOptionsDialog from './app-components/dialog/MenuItemOptionsDialog';
import OrderTypeDialog from './app-components/dialog/OrderTypeDialog';
import { addOrderType } from '../actions/order-actions';

import { ApiRequest, session } from '../services';
import { ORDERTYPES } from '../utils/enum';

import discBanner from '../assets/images/discount-banner.jpg';
import arrowDown from '../assets/images/arrow-down.svg';
import pizzaBrand from '../assets/images/pizza-brand.jpg';

const orderTypeLabel = (orderType) => {
  return ORDERTYPES.find(item => item.value == orderType);
}

const initialState = {
  menuItemOptionsModal: false,
  menuList: [],
  orderType: 1,
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

   static getDerivedStateFromProps(nextProps, prevState) {
    let orderType = session.orderType;
    if (!_.isEqual(nextProps.orderType, prevState.orderType)) {
      let obj = orderTypeLabel(nextProps.orderType);
      return { orderType: obj };     
    } else if (!_.isEmpty(orderType)) {
      let obj = orderTypeLabel(nextProps.orderType);
      return { orderType: obj };
    }
    else return null;
  }

  addOrderType = (orderType) => {
    this.props.addOrderType(orderType);
    this.setState({ orderTypeModal: false });
  }

  handleOrderType = (productId) => {
    if (this.props.orderType || (!!session.orderType)) {
      this.productOptionModal(productId);
    } else {
      this.setState({ orderTypeModal: true });
    }
  }

  changeOrderType = () => {
    this.setState({ orderTypeModal: true });
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
    const { orderType } = this.state;
    return (
      <React.Fragment>
        <div className="listing-header">
          <div className="resturant-list-header" style={{ background: 'url(https://res.cloudinary.com/grubhub-assets/image/upload/f_auto,fl_lossy,q_85/v1470779396/grubhub-discover-background-desktop.png) no-repeat', }}>
            <div></div>
          </div>
          <div className="restaurant-info">
            <h1>Andale Mexican Restaurant</h1>
            <div className="d-flex">
              <a href="#">151 N Santa Cruz Ave</a>
              <a href="tel:4083958800"> (408) 395-8800</a>
            </div>
            <div className="rating"></div>
            <div className="brand-logo"><img src={pizzaBrand} /></div>
          </div>
        </div>
        <div className="p-3 d-flex align-items-center justify-content-center order-type-section">
          <div className="mr-4">
            <div className="font-small mb-1">{orderType.name}</div>
            <div className="font-tiny text-light-gray">{orderType.desc}</div>
          </div>
          <div className="text-primary font-small ml-4 cursor-pointer" onClick={this.changeOrderType}>Change</div>
        </div>
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
          {this.state.menuList.map(item => <div className="restaurant-menu-section mt30" key={item.category_name}>
            <div className="restaurant-menu-header d-flex justify-content-between align-items-center" onClick={() => this.toggle(item.category_name)}>
              <h3 className="font-weight-bold font-large product-cat-title">{item.category_name}</h3>
              <img className="w-10" src={arrowDown} style={{ transform: `${item.collapse ? 'rotate(-180deg)' : 'unset'}` }} />
            </div>
            <Collapse isOpen={!item.collapse}>
              <div className="row">
                {item.list_items.map(product => (
                  <div className="col-md-6 p-2" key={product.ProductID}>
                    <Product product={product} onClick={(e) => this.handleOrderType(product.ProductID)} />
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
      </React.Fragment>
    );
  }
}

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
