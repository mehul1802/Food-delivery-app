import React, { Component } from 'react';


class Product extends Component {
	constructor(props) {
    super(props);
  }
 
  render() {
    const { product } = this.props;
    console.log(product)
    return (
      <div className="card product-card">
        <div className="card-body p-0">
          <div className="product-basic">
            <h4 className="card-title">{product.name}</h4>
            <p class="card-text">{product.desc}</p>
          </div>
          <div className="product-img">
            <img className="card-img-top" src={product.image} alt="Card image cap" />
            <div className="menuitem-price">{product.price}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
