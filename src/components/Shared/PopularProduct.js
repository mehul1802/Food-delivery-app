import React, { Component } from 'react';


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
            <h5 className="card-title mb-2">{product.name}</h5>
            <p className="m-0">{product.price}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PopularProduct;
