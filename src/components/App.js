import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import routes from '../routes';

class App extends Component {
  render() {
    return (
      <div className="rest-layout">
        <Header />
        <div className="page-layout">
          {routes}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
