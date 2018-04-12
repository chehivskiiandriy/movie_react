import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { validateToken, resetPassword } from '../../ducks/auth';
import ResetPasswordForm from '../Auth/ResetPasswordForm';
import Spinner from '../UI/Spinner/Spinner';

class ResetPasswordPage extends Component {
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

    onFail = () => this.setState({ loading: false, success: false});

    render() {
        const { loading, success } = this.state;
        // const { token } = this.props.match.params.token;

        return (
            <div>
                {loading && <Spinner />}
                {!loading && success && <ResetPasswordForm onSubmit={this.handleSubmit} />}
                {!loading && !success && <p>Invalid Token</p>}
            </div>
        );
    }
}

export default connect(null, { validateToken, resetPassword })(ResetPasswordPage);
