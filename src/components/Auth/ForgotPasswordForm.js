import React from 'react';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';

import RenderField from '../shared/RenderField';
import {authErrors} from "../../ducks/auth";
import PropTypes from "prop-types";

const ForgotPasswordForm = ({ handleSubmit, pristine, submitting, error }) => (
    <div>
        <h2>Forgot Password?</h2>
        {error && error.global}
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="email" component={RenderField} type="email" label="Email"/>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
            </div>
        </form>
    </div>
);

ForgotPasswordForm.propTypes = {
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

const validate = ({ email }) => {
    const errors = {};

    if(!email) errors.email = 'Email is required';
    else if (!isEmail(email)) errors.email = 'Invalid email address';

    return errors;
};

const mapStateToProps = state => {
    return {
        error: state.auth.error && (state.auth.error.type === authErrors.confirmEmailError) ? state.auth.error : null
    }
};

export default reduxForm({
    form: 'forgotPassword',
    validate
})(connect(mapStateToProps)(ForgotPasswordForm));
