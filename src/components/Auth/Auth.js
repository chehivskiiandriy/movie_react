import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group'

import SignInForm from './SignInForm/SignInForm';
import SignUpForm from './SignUpForm/SignUpForm';
import { moduleName as authReducer, signIn, signUp, signOut, resetAuthOptions } from '../../ducks/auth';
import Confirmation from "./Confirmation/Confirmation";
import ResetPassword from "./ResetPassword/ResetPassword";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import GuestRoute from '../routes/GuestRoute';
import Modal from '../UI/Modal/Modal';

import './Auth.scss';

class Auth extends Component {
    static propTypes = {
        signIn: PropTypes.func.isRequired,
        signUp: PropTypes.func.isRequired,
        signOut: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired
    };

    handleSignIn = value => this.props.signIn(value);

    handleSignUp = value => this.props.signUp(value);

    handleCloseModal = () => this.props.resetAuthOptions();

    render () {
        const {  authSettings, location } = this.props;

        return (
            <div className="Auth">
                <CSSTransitionGroup transitionName='ModalWindow' transitionEnterTimeout={400} transitionLeaveTimeout={250}>
                    {
                        authSettings.openSignUp &&
                        <Modal modalClosed={this.handleCloseModal}>
                            <SignUpForm onSubmit={this.handleSignUp} />
                        </Modal>
                        // <Route render={() => <SignUpForm onSubmit={this.handleSignUp}/>}/>
                    }
                    {
                        authSettings.openSignIn &&
                        <Modal modalClosed={this.handleCloseModal}>
                            <SignInForm onSubmit={this.handleSignIn} />
                        </Modal>
                        // <Route render={() => <SignInForm onSubmit={this.handleSignIn}/>}/>
                    }
                    {
                        authSettings.openConfirmation &&
                        //<Modal modalClosed={this.handleCloseModal}>
                            <Route location={location} path="/confirmation/:token" component={Confirmation} />
                        // </Modal>
                    }
                    {
                        authSettings.openForgotPassword &&
                        <Modal modalClosed={this.handleCloseModal}>
                            <ForgotPassword />

                            {/*<GuestRoute location={location} path="/forgot_password" component={ForgotPasswordPage}/>*/}
                        </Modal>
                    }
                    {
                        authSettings.openResetPassword &&
                        <Modal modalClosed={this.handleCloseModal}>
                            <GuestRoute location={location} path="/reset_password/:token" component={ResetPassword}/>
                        </Modal>
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state[authReducer].user.token,
        authSettings: state[authReducer].authSettings
    }
};

export default connect(mapStateToProps, { signIn, signUp, signOut, resetAuthOptions })(Auth);