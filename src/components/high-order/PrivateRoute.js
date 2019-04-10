/* eslint-disable no-shadow */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { session } from '../../services';

const PrivateRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            return (
                session.isLoggedIn() ? (
                    React.createElement(component, props)
                ) : (
                    <Redirect to={{
                        pathname: '/',
                    }} />
                )
            )
        }} />
    );
};

export default PrivateRoute;
