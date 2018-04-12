import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import RenderField from '../shared/RenderField';
import { authErrors } from "../../ducks/auth";
import { passwordPattern } from '../shared/constants';
import PropTypes from "prop-types";

const ResetPasswordForm = ({ handleSubmit, pristine, submitting, error }) => (
    <div>
        <h2>Reset Password?</h2>
        {error && error.global}
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="password" component={RenderField} type="password" label="Password"/>
                <Field name="confirmPassword" component={RenderField} type="password" label="Confirm password"/>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
            </div>
        </form>
    </div>
);

const validate = ({ password, confirmPassword }) => {
    const errors = {};

    if(!password) errors.password = 'Password is required';
    else if(!passwordPattern.test(password)) errors.password = 'Password must be at least 6 characters long and ' +
        'include 1 uppercase letter, 1 lowercase letter, 1 number';

    if(!confirmPassword) errors.confirmPassword = 'Confirm password is required';
    else if(confirmPassword !== password) errors.confirmPassword = 'Passwords doesn\'t match';

    return errors;
};

ResetPasswordForm.propTypes = {
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
        error: state.auth.error && (state.auth.error.type === authErrors.resetPasswordError) ? state.auth.error : null
    }
};

export default reduxForm({
    form: 'resetPassword',
    validate
})(connect(mapStateToProps)(ResetPasswordForm));
