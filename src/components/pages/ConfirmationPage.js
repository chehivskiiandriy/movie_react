import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { confirm } from '../../ducks/auth';
import Spinner from '../UI/Spinner/Spinner';

class ConfirmationPage extends Component {
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

    onSuccess = () => this.setState({ loading: false, success: true });

    onFail = () => this.setState({ loading: false, success: false});

    render() {
        const { loading, success } = this.state;

        return (
            <div>
                {loading && <Spinner />}

                {!loading && success && <div>
                    <Link to="/">Go to home</Link>
                    <span>Thank you. Your account has been verified.</span>
                </div>}

                {!loading && !success && <div>
                    <span>Oops...</span>
                </div>}
            </div>
        );
    }
}

export default connect(null, { confirm })(ConfirmationPage);