import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { validateToken, resetPassword, resetAuthOptions } from '../../../ducks/auth';
import { setAlertMessage } from "../../../ducks/alert";
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';
import Spinner from '../../UI/Spinner/Spinner';

class ResetPassword extends Component {
    static propTypes = {
        validateToken: PropTypes.func.isRequired,
        resetPassword: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                token: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    };

    state = {
        loading: true,
        success: false
    };

    componentDidMount() {
        this.props.validateToken(this.props.match.params.token, this.onSuccess, this.onFail);
    }

    handleSubmit = ({ password, confirmPassword }) => {
        const data = {
            password,
            confirmPassword,
            token: this.props.match.params.token
        };

        this.props.resetPassword(data);
    };

    onSuccess = () => this.setState({ loading: false, success: true });

    onFail = () => {
        this.setState({ loading: false, success: false});
        this.props.resetAuthOptions();
        this.props.setAlertMessage({
            typeMessage: "Fail",
            message: "validateTokenFail"
        });
    };

    render() {
        const { loading, success } = this.state;

        return (
            <div>
                {loading && <Spinner />}
                {!loading && success && <ResetPasswordForm onSubmit={this.handleSubmit} />}
            </div>
        );
    }
}

export default connect(null, { validateToken, resetPassword, setAlertMessage, resetAuthOptions })(ResetPassword);
