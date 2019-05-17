import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import routes from '../routes';

class AppComponent extends Component {
  
  render() {
    const {loading} = this.props;
    return (
      <div className="rest-layout">
        <Header />
        <div className="page-layout">
          {routes}
        </div>
        <Footer />

        {loading && <React.Fragment>
          <div className="overlay">
            <img className="overlay-loader" src="http://www.jocelynandchrismusic.com/wp-content/themes/aqura/assets/img/loader.gif" />
          </div>
        </React.Fragment>}
      </div>
    );
  }
}

const mapStateToAppProps = (state) => {
  return { loading: state.api.loading };
};

export const App = connect(
  mapStateToAppProps,
  {}
)(AppComponent)
