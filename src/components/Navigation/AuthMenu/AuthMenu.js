import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

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

const AuthMenu = ({ setAuthOptions, isAuthenticated, signOut, lang }) => {
    return (
        <div className="AuthMenu">
            {isAuthenticated
                ? <Button clicked={() => signOut()}>
                    <FormattedMessage id="auth.signOut"/>
                </Button>
                : <Aux>
                    <Button
                        buttonStyle={signInButtonStyle}
                        clicked={() => setAuthOptions(authOptions.openSignIn)}>
                        <FormattedMessage id="auth.signIn"/>
                    </Button>
                    {/*<span>|</span>*/}
                    <Button
                        buttonStyle={signUpButtonStyle}
                        clicked={() => setAuthOptions(authOptions.openSignUp)}>
                        <FormattedMessage id="auth.signUp"/>
                    </Button>
                </Aux>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state[authReducer].user.token,
        locale: state.locale.lang
    }
};

export default connect(mapStateToProps, { setAuthOptions, signOut })(AuthMenu);