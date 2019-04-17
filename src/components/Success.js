import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

class Success extends Component {

  componentDidMount() {
    document.body.classList.add('success-body');
  }

  componentWillUnmount() {
    document.body.classList.remove('success-body');
  }

  render() {
    return (
      <div className="container">
        <Card>
            <CardBody>
              <div className="sucess-wapper">
                <div>
                  <h1 className="pb-2 text-green">Thank you, your order has been placed.</h1>
                  <p>Please check your email for order confirmation and detailed delivery information.</p>
                  <Link to="/myorder" className="text-white d-block rounded bg-primary w-25 mt-3 btn p-2">View order</Link>
                  <Link to="/" className="text-primary d-block cursor-pointer mt-3">Return to home</Link>
                </div>
              </div>
            </CardBody>
          </Card>
      </div>
    );
  }
}

export default Success;
