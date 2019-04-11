import React, { Component } from 'react';
import Listing from './Listing';
import CartDrawer from './app-components/CartDrawer';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="resturent-menu-listing">
         <Listing />
        </div>
        <CartDrawer />
      </div>
    );
  }
}

export default Home;
