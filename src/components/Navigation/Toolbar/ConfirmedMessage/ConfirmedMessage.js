import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './ConfirmedMessage.scss';
import { moduleName, resendConfirmationMessage } from "../../../../ducks/auth";
import { setAlertMessage } from '../../../../ducks/alert';

class ConfirmedMessage extends Component {
    onSuccess = () =>
        this.props.setAlertMessage({
            typeMessage: "Success",
            message: "confirmedMessageSuccess"
        });
    // Лист з підтвердженням надіслано на вашу електронну пошту.

    onFail = () =>
        this.props.setAlertMessage({
            typeMessage: "Fail",
            message: "confirmedMessageFail"
        });

    render () {
        const { isAuthenticated, isConfirmed, email, resendConfirmationMessage, loading } = this.props;

        return (
            <div>
                {isAuthenticated && !isConfirmed
                    ? <div className="ConfirmedMessage">
                        <div className="container">
                        <span>
                            <FormattedMessage id="confirmed.message" values={{ email: <strong>{email}</strong>}} />
                            <button
                                onClick={() => resendConfirmationMessage(email, this.onSuccess, this.onFail)}
                                disabled={loading}>
                                <strong>
                                    <FormattedMessage id="confirmed.resend" />
                                </strong></button>
                        </span>
                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state[moduleName].user.token,
        isConfirmed: !!state[moduleName].user.confirmed,
        email: state[moduleName].user.email,
        loading: state[moduleName].user.loading
    }
};

export default connect(mapStateToProps, { resendConfirmationMessage, setAlertMessage })(ConfirmedMessage);

