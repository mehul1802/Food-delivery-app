import React, { Component } from 'react';
import { ApiRequest } from '../services';
import { Card, CardBody } from 'reactstrap';
import { formatPrice } from '../utils/common';


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
    return (
      <div className="container">
        <div className="orderlist-wrapper my-5">
          <h1 className="pb-2">My orders</h1>
              {this.state.orders && this.state.orders.map(order => (
                <Card className="mb-4">
                  <CardBody className="p-0">
                      <div className="d-flex justify-content-between">
                        <div className="order-id p-2 font-tiny">{order.date}</div>
                        <div className="order-date p-2 font-tiny">{order.date}</div>
                      </div>
                      <div className="py-4">
                        {order.order_items && order.order_items.map(item => (
                          <div className="d-flex product-list py-2">
                            <div className="w-25">
                              <img className="w-100" src="https://www.yourmomhatesthis.com/images/2016/12/Pizza-Free-PNG-Image.png" />
                            </div>
                            <div className="w-75 p-2 d-flex justify-content-between">
                              <div>
                                <h2>{item.name}</h2>
                                <div className="font-small text-light-gray">
                                  quantity: {item.quantity} * Unit price: {formatPrice(item.unit_price)}
                                </div>
                                <div className="pt-1 d-flex flex-wrap">
                                  {item.modifiers && item.modifiers.map((modifier, i) => (
                                    <span className="text-light-gray font-tiny pr-1">{modifier}{i+1 < item.modifiers.length && ','}</span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                {formatPrice(item.total_price)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                  </CardBody>
                </Card>
              ))}
           
        </div>
      </div>
    );
  }
}

export default OrderList;