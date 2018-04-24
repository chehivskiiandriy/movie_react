import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import isEmail from "validator/lib/isEmail";
import { FormattedMessage } from 'react-intl';

import RenderField from "../../UI/RenderField/RenderField";
import {authErrors} from "../../../ducks/auth";
import { passwordPattern } from '../../../shared/constants';
import Spinner from '../../UI/Spinner/Spinner';

import { authOptions, setAuthOptions} from "../../../ducks/auth";

import './SignUpForm.scss';

const SignUpForm = ({ handleSubmit, pristine, submitting, reset, invalid,  loading, error, setAuthOptions }) => {

    return(
        <div className="SignUp">
            <h2 className="Title">
                <FormattedMessage id="auth.signUp"/>
            </h2>

            {error && <div className="GlobalError">
                <FormattedMessage id={`error.global.${error.global}`}/>
                </div>}
            <form onSubmit={handleSubmit}>
                <Field name="username" component={RenderField} type="input" label="Username" iconType="user"/>
                <Field name="email" component={RenderField} type="email" label="Email" iconType="close-envelope"/>
                <Field name="password" component={RenderField} type="password" label="Password" iconType="lock"/>
                <Field name="confirmPassword" component={RenderField} type="password" label="Confirm password" iconType="lock"/>
                <div className="SubmitButtons">
                    <button type="submit" disabled={pristine || submitting || invalid}>
                        {loading
                            ? <Spinner />
                            : <FormattedMessage id="auth.signUp"/>
                        }
                    </button>
                    <button type="submit" disabled={pristine || submitting} onClick={reset}>
                        <FormattedMessage id="form.clear"/>
                    </button>
                </div>
            </form>

            <div className="Line"/>
            <button className="SwitchAuth" onClick={() => setAuthOptions(authOptions.openSignIn)}>
                <FormattedMessage id="auth.signIn"/>
            </button>
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
    else if(!passwordPattern.test(password)) errors.password = 'Password must be at least 6 \ncharacters long and ' +
        'include 1 uppercase\nletter, 1 lowercase letter, 1 number';

    if(!confirmPassword) errors.confirmPassword = 'Confirm password is required';
    else if(confirmPassword !== password) errors.confirmPassword = 'Passwords doesn\'t match';

    return errors;
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error && (state.auth.error.type === authErrors.signUpError) ? state.auth.error : null
    }
};

export default reduxForm({
    form: 'signUp',
    validate
})(connect(mapStateToProps, { setAuthOptions })(SignUpForm));