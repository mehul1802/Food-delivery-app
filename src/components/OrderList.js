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
    const { orders } = this.state;
    return (
      <div className="container">
        <div className="orderlist-wrapper my-5">
          <h1 className="pb-2">My orders</h1>
              {orders && orders.map(order => (
                <Card className="mb-4">
                  <CardBody className="p-0">
                    <div className="d-flex justify-content-between">
                      <div className="order-id p-2 font-tiny">{order.date}</div>
                      <div className="order-date p-2 font-tiny">{order.date}</div>
                    </div>
                    <div className="py-4">
                      {order.order_items && order.order_items.map(item => (
                        <div className="d-flex product-list p-3">
                          <div className="w-25">
                            <img className="w-100" src="https://www.yourmomhatesthis.com/images/2016/12/Pizza-Free-PNG-Image.png" />
                          </div>
                          <div className="w-75 pl-3 py-2 d-flex justify-content-between">
                            <div>
                              <h2 className="text-primary font-weight-bold">{item.name}</h2>
                              <div className="font-small text-light-grey d-flex">
                                <div>quantity: <span className="text-dark">{item.quantity}</span></div>
                                <div className="ml-2">Unit price: <span className="text-dark">{formatPrice(item.unit_price)}</span></div>
                              </div>
                              <div className="pt-1 d-flex flex-wrap">
                                {item.modifiers && item.modifiers.map((modifier, i) => (
                                  <span className="text-light-grey font-tiny pr-1">{modifier}{i+1 < item.modifiers.length && ','}</span>
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