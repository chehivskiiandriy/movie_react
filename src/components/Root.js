import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Redirect } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import Layout from '../hoc/Layout/Layout';
import Auth from './Auth/Auth';
import HomePage from './pages/HomePage';
import Toolbar from './Navigation/Toolbar/Toolbar';

import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';

import { flattenMessages } from '../utils/flattenMessages';
import messages from '../messages'
import { setAuthOptions, authOptions } from "../ducks/auth";

class Root extends Component {
    componentDidMount () {
        console.log('|||||||||||',this.props);
        const { pathname } = this.props.location;
        if(pathname.includes('reset_password')) this.props.setAuthOptions(authOptions.openResetPassword);
        else if(pathname.includes('confirmation')) this.props.setAuthOptions(authOptions.openConfirmation);
    }

    render() {
        const { location, lang, isAuthenticated, signOut } = this.props;

        return (
            <IntlProvider locale={lang} messages={flattenMessages(messages[lang])}>
                <div>
                    <Layout >
                        <h1>Root page</h1>
                        <Link to="/" >Home</Link>
                        <Link to="/test" >Test</Link>


                        <Auth />
                        {/*<Route location={location} component={Auth}/>*/}

                        <UserRoute location={location} path="/test" component={HomePage} />

                    </Layout>
                </div>
            </IntlProvider>
        )
    }
}

Root.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    lang: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return {
        lang: state.locale.lang
    }
};

export default connect(mapStateToProps, { setAuthOptions })(Root);