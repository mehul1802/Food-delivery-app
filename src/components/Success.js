import React, { Component } from 'react';

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
                <div className="sucess-wapper mt-5 mb-5">
                    <h1 className="pb-2">Thank you for your order.</h1>
                </div>
            </div>
        );
    }
}

export default Success;
