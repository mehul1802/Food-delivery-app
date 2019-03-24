import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

class SignInDialog extends Component {
	constructor(props) {
    super(props);
  }
 
  render() {
    const { isOpen, handleSignInDialog, className } = this.props;
    const closeBtn = <button className="close" onClick={handleSignInDialog}>&times;</button>;
    return (
       <Modal
         isOpen={isOpen}
         toggle={handleSignInDialog}
         className={className}
         backdrop="true"
         style={{ maxWidth: '570px' }}
        >
          <ModalHeader toggle={handleSignInDialog} close={closeBtn} />
          <ModalBody>
            <h1 className="signin-title">Sign in with your Grubhub account</h1>
            <div>
               <Input type="text" placeholder="email address" className="mt-4"/>
               <Input type="text" placeholder="Password" className="mt-3" />
            </div>
            <Button color="primary w-100 mt-5" onClick={handleSignInDialog}>Sign In</Button>
          </ModalBody>
        </Modal>
    );
  }
}

export default SignInDialog;
