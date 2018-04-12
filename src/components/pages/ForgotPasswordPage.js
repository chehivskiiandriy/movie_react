import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { confirmEmail } from '../../ducks/auth';
import ForgotPasswordForm from '../Auth/ForgotPasswordForm';

class ForgotPasswordPage extends Component {
    static propTypes = {
        confirmEmail: PropTypes.func.isRequired
    };

    state = {
        success: false
    };

    handleSubmit =  ({ email }) => this.props.confirmEmail(email, this.onSuccess);

    onSuccess = () => this.setState({ success: true});

    render() {
        return (
            <div>
                {this.state.success ? <div>Email has been sent.</div>
                    : <ForgotPasswordForm onSubmit={this.handleSubmit} />}
            </div>
        );
    }
}

export default connect(null, { confirmEmail })(ForgotPasswordPage);