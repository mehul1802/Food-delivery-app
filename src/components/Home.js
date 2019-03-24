import React, { Component } from 'react';
import Listing from './Listing';
import CartDrawer from './CartDrawer';

class Home extends Component {
	constructor(props) {
    super(props);
  }
 
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
