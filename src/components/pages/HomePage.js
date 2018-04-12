import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {moduleName} from "../../ducks/auth";

class HomePage extends Component {
    static propTypes = {
        isConfirmed: PropTypes.bool.isRequired
    }

    render () {
        console.log(this.props);

        return (
            <div>
                <h2>Test page</h2>
                {this.props.isConfirmed
                    ? <p>Welcome!</p>
                    : <p>Please verify your account</p>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // isAuthenticated: !!state[moduleName].user,
        isConfirmed: !!state[moduleName].user.confirmed
    }
};

export default connect(mapStateToProps)(HomePage);