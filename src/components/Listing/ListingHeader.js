import React, { Component } from 'react';
import pizzaBrand from '../../assets/images/pizza-brand.jpg';

class ListingHeader extends Component {
	constructor(props) {
    super(props);
  }
 
  render() {
    return (
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
    );
  }
}

export default ListingHeader;
