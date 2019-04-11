import React, { Component } from 'react';
import popularIcon from '../../assets/images/popular-icon.svg';


class PopularProduct extends Component {
	constructor(props) {
    super(props);
  }
 
  render() {
    const { product, handleMenuItemOptionsDialog } = this.props;
    return (
      <div className="card product-card" onClick={handleMenuItemOptionsDialog}>
        <div className="card-body p-0 most-popular" style={{ background: `url(${product.image})` }}>
          <div className="product-info">
            <div className="d-flex align-items-center  mb-2">
              <h5 className="card-title m-0">{product.name}</h5>
              <img src={popularIcon} width="16"className="ml-1"/>
            </div>
            <p className="m-0">{product.price}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PopularProduct;
