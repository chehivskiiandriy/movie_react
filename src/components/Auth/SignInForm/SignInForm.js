import React from 'react';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'validator/lib/isEmail';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';

import RenderField from '../../UI/RenderField/RenderField';
import {authErrors, authOptions, setAuthOptions} from "../../../ducks/auth";
import { passwordPattern } from '../../../shared/constants';

import './SignInForm.scss';

const SignInForm = ({ handleSubmit, pristine, submitting, error, invalid, setAuthOptions }) => (
    <div className="SignIn">
        <h2 className="Title">
            <FormattedMessage id="auth.signIn"/>
        </h2>

        {error && <div className="GlobalError">
            <FormattedMessage id={`error.global.${error.type}`}/>
            {/*{error.global}*/}
            </div>}

        <form onSubmit={handleSubmit}>
            <Field name="email" component={RenderField} type="email" label="Email" iconType="close-envelope"/>
            <Field name="password" component={RenderField} type="password" label="Password" iconType="lock"/>
            <div className="FormButtons">
                <button className="SubmitButton" type="submit" disabled={pristine || submitting || invalid}>
                    <FormattedMessage id="auth.signIn"/>
                </button>
                <a className="ForgotButton" onClick={() => setAuthOptions(authOptions.openForgotPassword)}>
                    <FormattedMessage id="auth.forgotPassword"/>
                </a>
            </div>
        </form>

        <div className="Line"/>
        <button className="SwitchAuth" onClick={() => setAuthOptions(authOptions.openSignUp)}>
            <FormattedMessage id="auth.signUp"/>
        </button>
    </div>
);

const validate = ({email, password }) => {
    const errors = {};

    if(!email) errors.email = 'Email is required';
    else if (!isEmail(email)) errors.email = 'Invalid email address';

    if(!password) errors.password = 'Password is required';
    else if(!passwordPattern.test(password)) errors.password = 'Password must be at least 6 \ncharacters long and ' +
        'include 1 uppercase\nletter, 1 lowercase letter, 1 number';

    return errors;
};

SignInForm.propTypes = {
    error: PropTypes.oneOf([
        PropTypes.shape({
            global: PropTypes.string,
            type: PropTypes.string
        }),
        null
    ]),
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        error: state.auth.error && (state.auth.error.type === authErrors.signInError) ? state.auth.error : null
    }
};

export default reduxForm({
    form: 'signIn',
    validate
})(connect(mapStateToProps, { setAuthOptions })(SignInForm));
