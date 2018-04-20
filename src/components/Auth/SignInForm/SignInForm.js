import React from 'react';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'validator/lib/isEmail';
import {connect} from "react-redux";

import RenderField from '../../UI/RenderField/RenderField';
import {authErrors, authOptions, setAuthOptions} from "../../../ducks/auth";
import { passwordPattern } from '../../../shared/constants';
import PropTypes from "prop-types";

import Button from '../../UI/Button/Button';
import './SignInForm.scss';

const SignInForm = ({ handleSubmit, pristine, submitting, error, invalid, modalClosed, setAuthOptions }) => (
    <div className="SignIn">
        <h2 className="Title">SignIn</h2>
        {error && error.global}
        <form onSubmit={handleSubmit}>
            <Field name="email" component={RenderField} type="email" label="Email" iconType="close-envelope"/>
            <Field name="password" component={RenderField} type="password" label="Password" iconType="lock"/>
            <div className="FormButtons">
                <button className="SubmitButton" type="submit" disabled={pristine || submitting || invalid}>
                    Submit
                </button>
                <a className="ForgotButton" onClick={() => setAuthOptions(authOptions.openForgotPassword)}>
                    ForgotPassword?
                </a>
            </div>

        </form>


        <div className="Line"/>
        <button className="SwitchAuth" onClick={() => setAuthOptions(authOptions.openSignUp)}>SignUp</button>
    </div>
);

const validate = ({email, password }) => {
    const errors = {};

    if(!email) errors.email = 'Email is required';
    else if (!isEmail(email)) errors.email = 'Invalid email address';

    if(!password) errors.password = 'Password is required';
    else if(!passwordPattern.test(password)) errors.password = 'Password must be at least 6 characters long and ' +
        'include 1 uppercase letter, 1 lowercase letter, 1 number';

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
