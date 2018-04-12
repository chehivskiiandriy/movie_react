import React from 'react';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'validator/lib/isEmail';
import {connect} from "react-redux";

import RenderField from '../shared/RenderField';
import {authErrors} from "../../ducks/auth";
import { passwordPattern } from '../shared/constants';
import PropTypes from "prop-types";

const SignInForm = ({ handleSubmit, pristine, submitting, error }) => (
    <div>
        <h2>SignIn</h2>
        {error && error.global}
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="email" component={RenderField} type="email" label="Email"/>
                <Field name="password" component={RenderField} type="password" label="Password"/>
                <button type="submit" disabled={pristine || submitting}>
                    Submit
                </button>
            </div>
        </form>
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
})(connect(mapStateToProps)(SignInForm));
