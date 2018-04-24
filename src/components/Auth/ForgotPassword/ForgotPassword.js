import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { confirmEmail, resetAuthOptions } from '../../../ducks/auth';
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';
import { setAlertMessage } from "../../../ducks/alert";

class ForgotPassword extends Component {
    static propTypes = {
        confirmEmail: PropTypes.func.isRequired
    };

    handleSubmit =  ({ email }) => this.props.confirmEmail(email, this.onSuccess);

    onSuccess = () => {
        this.props.resetAuthOptions();
        this.props.setAlertMessage({
            typeMessage: "Success",
            message: "forgotPasswordSuccess"
        });
    };


    render() {
        return (
            <ForgotPasswordForm onSubmit={this.handleSubmit} />
        );
    }
}

export default connect(null, { confirmEmail, resetAuthOptions, setAlertMessage })(ForgotPassword);