import React from 'react';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';

import RenderField from '../../UI/RenderField/RenderField';
import {authErrors, authOptions, setAuthOptions} from "../../../ducks/auth";
import PropTypes from "prop-types";

import './ForgotPasswordForm.scss';

const ForgotPasswordForm = ({ handleSubmit, pristine, submitting, error, invalid, setAuthOptions }) => (
    <div className="ForgotPassword">
        <div className="Title">
            <a className="GoBack" title="Go back" onClick={() => setAuthOptions(authOptions.openSignIn)}>
                <span className="icon icon-go-back" />
            </a>
            <h2>Forgot Password?</h2>
        </div>
        {error && error.global}
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="email" component={RenderField} type="email" label="Email" iconType="close-envelope"/>
                <button className="SubmitButton" type="submit" disabled={pristine || submitting || invalid}>
                    Submit
                </button>
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
})(connect(mapStateToProps, { setAuthOptions })(ForgotPasswordForm));
