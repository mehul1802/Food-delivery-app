import React, { Component } from 'react';
import { ApiRequest } from '../services';


const initialState = {
  orders: [],
}
class OrderList extends Component {

  state = initialState;
  
  async componentDidMount() {
    try {
      let response = await ApiRequest.getRecords(`${process.env.REACT_APP_API_URL}/order`);
      let orders = response.data;
      this.setState({ orders });
    } catch (e) {
      console.log(e);
    }
    document.body.classList.add('checkout-body');
  }

  componentWillUnmount() {    
    document.body.classList.remove('checkout-body');    
   }

  render() {
    // console.log(this.state.orders);
    return (
      <div className="container">
        <div className="mt-5 mb-5">
          <h1 className="pb-2">My orders</h1>
        </div>
      </div>
    );
  }
}

export default OrderList;