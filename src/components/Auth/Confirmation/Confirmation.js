import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { confirm, resetAuthOptions } from '../../../ducks/auth';
import Spinner from '../../UI/Spinner/Spinner';
import { setAlertMessage } from "../../../ducks/alert";

class Confirmation extends Component {
    static propTypes = {
        confirm: PropTypes.func.isRequired,
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
        const { token } = this.props.match.params;
        this.props.confirm(token, this.onSuccess, this.onFail);
    }

    onSuccess = () => {
        this.setState({ loading: false });
        this.props.resetAuthOptions();
        this.props.setAlertMessage({
            typeMessage: "Success",
            message: "confirmationSuccess"
        });
    };

    onFail = () => {
        this.setState({ loading: false });
        this.props.resetAuthOptions();
        this.props.setAlertMessage({
            typeMessage: "Fail",
            message: "confirmationFail"
        });
    };

    render() {
        const { loading } = this.state;

        return (
            <div className="Confirmation">
                {loading && <Spinner />}
            </div>
        );
    }
}

export default connect(null, { confirm, resetAuthOptions, setAlertMessage })(Confirmation);