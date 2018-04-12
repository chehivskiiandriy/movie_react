import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { moduleName} from "../../ducks/auth";

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />}
    />
);



GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state[moduleName].user
    }
};

export default connect(mapStateToProps)(GuestRoute);