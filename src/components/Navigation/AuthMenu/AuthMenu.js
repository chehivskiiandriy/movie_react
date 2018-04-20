import React from 'react';
import { connect } from 'react-redux';

import { authOptions, moduleName as authReducer, setAuthOptions, signOut } from "../../../ducks/auth";
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux_/Aux_';

import './AuthMenu.scss';

const signInButtonStyle = {
    marginRight: 0,
    paddingRight: '5px'
};

const signUpButtonStyle = {
    marginLeft: 0,
    paddingLeft: '5px'
};

const AuthMenu = ({ setAuthOptions, isAuthenticated, signOut }) => {
    return (
        <div className="AuthMenu">
            {isAuthenticated
                ? <Button clicked={() => signOut()}>Sign Out</Button>
                : <Aux>
                    <Button
                        buttonStyle={signInButtonStyle}
                        clicked={() => setAuthOptions(authOptions.openSignIn)}>SignIn</Button>
                    {/*<span>or</span>*/}
                    <Button
                        buttonStyle={signUpButtonStyle}
                        clicked={() => setAuthOptions(authOptions.openSignUp)}>SignUp</Button>
                </Aux>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state[authReducer].user,
    }
};

export default connect(mapStateToProps, { setAuthOptions, signOut })(AuthMenu);