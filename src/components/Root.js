import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Redirect } from 'react-router-dom';

import Layout from '../hoc/Layout/Layout';
import Auth from './Auth/Auth';
import HomePage from './pages/HomePage';
import ConfirmationPage from './pages/ConfirmationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';

const Root = ({ location }) => (
    <div>
        <Layout>
            <h1>Root page</h1>
            <Link to="/" >Home</Link>
            <Link to="/test" >Test</Link>
            <Link to="/auth" >Auth</Link>

            <Route location={location} path="/confirmation/:token" component={ConfirmationPage} />
            <Route location={location} path="/auth" component={Auth}/>
            <GuestRoute location={location} path="/forgot_password" component={ForgotPasswordPage}/>
            <GuestRoute location={location} path="/reset_password/:token" component={ResetPasswordPage}/>

            <UserRoute location={location} path="/test" component={HomePage} />

        </Layout>
    </div>
);

Root.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default Root;