import React, { Component } from 'react';
import { withRouter } from "react-router";

class Footer extends Component {
  render() {
    return (
      <div className="footer-section bg-blue" style={{ width: `${this.props.location.pathname === '/' ? 'calc(100% - 340px)' : '100%'}`}}>
        {/* <div className="footer-links">
          <div className="row">
            <div className="col-3">
              <h4>Get to know us</h4>
              <ul className="p-0">
                <li><a className="text-white" className="text-white" href="https://about.grubhub.com">About Grubhub</a></li>
                <li><a className="text-white" href="https://www.grubhub.com/mobile_home">Our apps</a></li>
                <li><a className="text-white" href="https://blog.grubhub.com">Our blog</a></li>
                <li><a className="text-white" href="https://careers.grubhub.com/">Careers</a></li>
                <li><a className="text-white" href="https://investors.grubhub.com/investors/overview/">Investor relations</a></li>
                <li><a className="text-white" href="https://media.grubhub.com/media/overview/default.aspx">News</a></li>
              </ul>
            </div>
          </div>
        </div> */}
        <div className="copyright-section d-flex justify-content-between">
          <p className="m-0">© 2019 Al Salam Pizzeria All rights reserved.</p>
          <div className="w-50 d-flex justify-content-end footer-link">
            <a className="text-white" href="/legal/terms-of-use">Terms of Use</a>
            <a className="text-white" href="/legal/privacy-policy">Privacy Policy</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);
