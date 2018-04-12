import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { moduleName, signIn, signUp, signOut } from '../../ducks/auth';

class Auth extends Component {
    static propTypes = {
        signIn: PropTypes.func.isRequired,
        signUp: PropTypes.func.isRequired,
        signOut: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired
    };

    handleSignIn = value => this.props.signIn(value);

    handleSignUp = value => this.props.signUp(value);

    render () {
        console.log(this.props);

        let auth = (
            <div>
                <Link to="/auth/signup" >Sign Up</Link>
                <Link to="/auth/signin" >Sign In</Link>

                <Link to="/forgot_password">Forgot Password?</Link>

                <Route path="/auth/signup" render={() => <SignUpForm onSubmit = {this.handleSignUp} />} />
                <Route path="/auth/signin" render={() => <SignInForm onSubmit = {this.handleSignIn} />} />
            </div>
        );

        if(this.props.isAuthenticated) auth = <button onClick={() => this.props.signOut()}>Sign Out</button>;

        return (
            <div>
                {auth}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state[moduleName].user
    }
};

export default connect(mapStateToProps, { signIn, signUp, signOut })(Auth);