import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';

import RenderField from '../../../UI/RenderField/RenderField';
import { authErrors } from "../../../../ducks/auth";
import { passwordPattern } from '../../../../shared/constants';

const ResetPasswordForm = ({ handleSubmit, pristine, submitting, error, invalid }) => (
    <div className="ResetPassword">
        <h2 className="Title">
            <FormattedMessage id="auth.resetPassword"/>
        </h2>
        {error && <div className="GlobalError">{error.global}</div>}
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="password" component={RenderField} type="password" label="Password" iconType="lock" />
                <Field name="confirmPassword" component={RenderField} type="password" label="Confirm password" iconType="lock" />
                <button className="SubmitButton" type="submit" disabled={pristine || submitting || invalid}>
                    <FormattedMessage id="form.submit"/>
                </button>
            </div>
        </form>
    </div>
);

const validate = ({ password, confirmPassword }) => {
    const errors = {};

    if(!password) errors.password = 'Password is required';
    else if(!passwordPattern.test(password)) errors.password = 'Password must be at least 6 \ncharacters long and ' +
        'include 1 uppercase\nletter, 1 lowercase letter, 1 number';

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
