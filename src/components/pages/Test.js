import React, { Component } from 'react';

import { connect } from 'react-redux';
import {moduleName} from "../../ducks/auth";

import HomePage from "./HomePage";
import UserRoute from '../routes/UserRoute';

class Test extends Component {
    static propTypes = {

    }

    render () {
        return (
            <div>
                <UserRoute path="/test" component={HomePage} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        isAuthenticated: !!state[moduleName].user.token
    }
};

export default connect(mapStateToProps)(Test);