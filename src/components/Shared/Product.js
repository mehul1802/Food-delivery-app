import React, { Component } from 'react';
import { currencyFormat } from '../../utils/common';

class Product extends Component {
	constructor(props) {
    super(props);
  }
 
  render() {
    const { product, onClick } = this.props;
    return (
      <div className="card product-card" onClick={onClick}>
        <div className="card-body p-2 d-flex justify-content-between align-items-center">
          <div className="product-basic">
            <h4 className="font-regular card-title m-0 text-primary">{product.ProductName}</h4>
            {/* <p className="card-text">{product.desc}</p> */}
          </div>
          <div>
            {/* <img src={product.image}  className="product-img" alt="Card image cap" /> */}
            <div className="menuitem-price">{currencyFormat(product.UnitPrice)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
