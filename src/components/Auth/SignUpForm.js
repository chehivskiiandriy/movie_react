import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import isEmail from "validator/lib/isEmail";

import RenderField from "../shared/RenderField";
import {authErrors} from "../../ducks/auth";
import { passwordPattern } from '../shared/constants';
import Spinner from '../UI/Spinner/Spinner';

const SignUpForm = ({ handleSubmit, pristine, submitting, loading, error }) => {
    // if(loading) return <Spinner />;

    return(
        <div>
            <h2>SignUp</h2>
            {error && error.global}
            <form onSubmit={handleSubmit}>
                <Field name="username" component={RenderField} type="input" label="Username"/>
                <Field name="email" component={RenderField} type="email" label="Email"/>
                <Field name="password" component={RenderField} type="password" label="Password"/>
                <Field name="confirmPassword" component={RenderField} type="password" label="Confirm password"/>
                <button type="submit" disabled={pristine || submitting}>
                    Submit
                </button>
            </form>
        </div>
    );
};

SignUpForm.propTypes = {
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

const validate = ({email, password, confirmPassword, username }) => {
    const errors = {};

    if(!username) errors.username = 'Username is required';
    else if(username.length < 3) errors.username = 'Username must be at least 3 characters long';

    if(!email) errors.email = 'Email is required';
    else if (!isEmail(email)) errors.email = 'Invalid email address';

    if(!password) errors.password = 'Password is required';
    else if(!passwordPattern.test(password)) errors.password = 'Password must be at least 6 characters long and ' +
        'include 1 uppercase letter, 1 lowercase letter, 1 number';

    if(!confirmPassword) errors.confirmPassword = 'Confirm password is required';
    else if(confirmPassword !== password) errors.confirmPassword = 'Passwords doesn\'t match';

    return errors;
};

const mapStateToProps = state => {
    return {
        // loading: state.auth.loading,
        error: state.auth.error && (state.auth.error.type === authErrors.signUpError) ? state.auth.error : null
    }
};

export default reduxForm({
    form: 'signUp',
    validate
})(connect(mapStateToProps)(SignUpForm));