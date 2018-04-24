import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Redirect } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';

import Layout from '../hoc/Layout/Layout';
import Auth from './Auth/Auth';
import FadeSlider from './Slider/FadeSlider/FadeSlider';
import TranslateSlider from './Slider/TranslateSlider/TranslateSlider';
import HomePage from './pages/HomePage';
import Toolbar from './Navigation/Toolbar/Toolbar';
import AlertMessage from '../components/UI/AlertMessage/AlertMessage';

import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';

import { flattenMessages } from '../utils/flattenMessages';
import messages from '../messages'
import { setAuthOptions, authOptions } from "../ducks/auth";
import { resetAlertMessage } from "../ducks/alert";

import './Root.scss';

class Root extends Component {
    componentDidMount () {
        const { pathname } = this.props.location;
        if(pathname.includes('reset_password')) this.props.setAuthOptions(authOptions.openResetPassword);
        else if(pathname.includes('confirmation')) this.props.setAuthOptions(authOptions.openConfirmation);
    }

    render() {
        const { location, lang, isAuthenticated, signOut, typeMessage, message, resetAlertMessage } = this.props;

        console.log(this.props);
        return (
            <IntlProvider locale={lang} messages={flattenMessages(messages[lang])}>
                <div>
                    <CSSTransitionGroup transitionName='AlertMessage' transitionEnterTimeout={700} transitionLeaveTimeout={400}>
                        {typeMessage && <AlertMessage
                            typeMessage={typeMessage}
                            message={message}
                            closeAlert={resetAlertMessage} />}
                    </CSSTransitionGroup>
                    <Layout >
                        {/*<h1>Root page</h1>*/}
                        {/*<Link to="/" >Home</Link>*/}
                        {/*<Link to="/test" >Test</Link>*/}

                        <FadeSlider />
                        <Auth />
                        {/*<Route location={location} component={Auth}/>*/}

                        <UserRoute location={location} path="/test" component={HomePage} />
                        <div className="container">
                            <TranslateSlider />
                        </div>
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
        lang: state.locale.lang,
        typeMessage: state.alert.typeMessage,
        message: state.alert.message
    }
};

export default connect(mapStateToProps, { setAuthOptions, resetAlertMessage })(Root);