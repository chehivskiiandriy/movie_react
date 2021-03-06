import { takeEvery, takeLatest, take, call, put, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux'

import api from '../api';
import { setAlertMessage } from './alert';

/**
 * Constants
 * */
export const moduleName = 'auth';

export const SIGN_UP_REQUEST = `${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${moduleName}/SIGN_UP_ERROR`;

export const SIGNED_IN = `${moduleName}/SIGNED_IN`;

export const SIGN_IN_REQUEST = `${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_ERROR = `${moduleName}/SIGN_IN_ERROR`;
export const SIGN_IN_SUCCESS = `${moduleName}/SIGN_IN_SUCCESS`;

export const SIGN_OUT_REQUEST = `${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${moduleName}/SIGN_OUT_SUCCESS`;

export const CONFIRM_REQUEST = `${moduleName}/CONFIRM_REQUEST`;
export const CONFIRM_SUCCESS = `${moduleName}/CONFIRM_SUCCESS`;

export const RESET_PASSWORD_REQUEST = `${moduleName}/RESET_PASSWORD_REQUEST`;
export const RESET_PASSWORD_SUCCESS = `${moduleName}/RESET_PASSWORD_SUCCESS`;
export const RESET_PASSWORD_ERROR = `${moduleName}/RESET_PASSWORD_ERROR`;

export const CONFIRM_EMAIL_REQUEST = `${moduleName}/CONFIRM_EMAIL_REQUEST`;
export const CONFIRM_EMAIL_SUCCESS = `${moduleName}/CONFIRM_EMAIL_SUCCESS`;
export const CONFIRM_EMAIL_ERROR = `${moduleName}/CONFIRM_EMAIL_ERROR`;

export const VALIDATE_TOKEN_REQUEST = `${moduleName}/VALIDATE_TOKEN_REQUEST`;

export const SET_AUTH_OPTIONS = `${moduleName}/SET_AUTH_OPTIONS`;
export const RESET_AUTH_OPTIONS = `${moduleName}/RESET_AUTH_OPTIONS`;

export const RESEND_CONFIRMATION_MESSAGE_REQUEST = `${moduleName}/RESEND_CONFIRMATION_MESSAGE_REQUEST`;
export const RESEND_CONFIRMATION_MESSAGE_SUCCESS = `${moduleName}/RESEND_CONFIRMATION_MESSAGE_SUCCESS`;
export const RESEND_CONFIRMATION_MESSAGE_ERROR = `${moduleName}/RESEND_CONFIRMATION_MESSAGE_ERROR`;

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const authErrors = {
    signUpError: 'signUpError',
    signInError: 'signInError',
    confirmEmailError: 'confirmEmailError',
    resetPasswordError: 'resetPasswordError'
};

export const authOptions = {
    openSignIn: 'openSignIn',
    openSignUp: 'openSignUp',
    openConfirmation: 'openConfirmation',
    openForgotPassword: 'openForgotPassword',
    openResetPassword: 'openResetPassword'
};

/**
 * Reducer
 * */
export const InitialAuthOptions = {
    openSignIn: false,
    openSignUp: false,
    openConfirmation: false,
    openForgotPassword: false,
    openResetPassword: false
};

export const InitialUser = {
    username: null,
    email: null,
    confirmed: null,
    token: null
};

export const InitialStateRecord = {
    user: InitialUser,
    error: null,
    loading: false,
    authSettings: InitialAuthOptions
};

export default function reducer(state = InitialStateRecord, action = {}) {
    const { type, payload, error } = action;

    switch (type) {
        case SIGN_UP_REQUEST:
        case SIGN_IN_REQUEST:
        case CONFIRM_EMAIL_REQUEST:
        case RESET_PASSWORD_REQUEST:
        case RESEND_CONFIRMATION_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true
            };

        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
        case CONFIRM_SUCCESS:
        case SIGNED_IN:
            return {
                ...state,
                loading: false,
                user: payload.user,
                error: null
            };

        case CONFIRM_EMAIL_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
        case RESEND_CONFIRMATION_MESSAGE_SUCCESS:
        case RESEND_CONFIRMATION_MESSAGE_ERROR:
            return {
                ...state,
                loading: false
            };

        case SIGN_UP_ERROR:
        case SIGN_IN_ERROR:
        case CONFIRM_EMAIL_ERROR:
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                error: error
            };

        case SIGN_OUT_SUCCESS:
            return InitialStateRecord;

        case LOCATION_CHANGE:
            return {
                ...state,
                error: null
            };

        case SET_AUTH_OPTIONS:
            return {
                ...state,
                error: null,
                authSettings: {
                    ...InitialAuthOptions,
                    [payload.data]: true
                }
            };

        case RESET_AUTH_OPTIONS:
            return {
            ...state,
            error: null,
            authSettings: {
                ...InitialAuthOptions,
            }
        };

        default:
            return state;
    }
}


/**
 * Selectors
 * */


/**
 * Action Creators
 * */

export function signUp(user) {
    return {
        type: SIGN_UP_REQUEST,
        payload: user
    }
}

export function signUpSuccess(user) {
    return {
        type: SIGN_UP_SUCCESS,
        payload: { user }
    }
}

export function signUpError(error) {
    return {
        type: SIGN_UP_ERROR,
        error
    }
}

export function signIn(user) {
    return {
        type: SIGN_IN_REQUEST,
        payload: user
    }
}

export function signInSuccess(user) {
    return {
        type: SIGN_IN_SUCCESS,
        payload: { user }
    }
}

export function signInError(error) {
    return {
        type: SIGN_IN_ERROR,
        error
    }
}

export function signedIn(user) {
    return {
        type: SIGNED_IN,
        payload: { user }
    }
}

export function signOut() {
    return {
        type: SIGN_OUT_REQUEST
    }
}

export function confirm(token, onSuccess, onFail) {
    return {
        type: CONFIRM_REQUEST,
        payload: token,
        onSuccess,
        onFail
    }
}

export function confirmSuccess(user) {
    return {
        type: CONFIRM_SUCCESS,
        payload: { user }
    }
}

export function confirmEmail(email, onSuccess) {
    return {
        type: CONFIRM_EMAIL_REQUEST,
        payload: email,
        onSuccess
    }
}

export function confirmEmailError(error) {
    return {
        type: CONFIRM_EMAIL_ERROR,
        error
    }
}

export function resetPassword(data) {
    return {
        type: RESET_PASSWORD_REQUEST,
        payload: data
    }
}

export function resetPasswordError(error) {
    return {
        type: RESET_PASSWORD_ERROR,
        error
    }
}

export function validateToken(token, onSuccess, onFail) {
    return {
        type: VALIDATE_TOKEN_REQUEST,
        payload: token,
        onSuccess,
        onFail
    }
}

export function setAuthOptions(data) {
    return {
        type: SET_AUTH_OPTIONS,
        payload: { data }
    }
}

export function resetAuthOptions() {
    return {
        type: RESET_AUTH_OPTIONS,
    }
}

export function resendConfirmationMessage(email, onSuccess, onFail) {
    return {
        type: RESEND_CONFIRMATION_MESSAGE_REQUEST,
        payload: email,
        onSuccess,
        onFail
    }
}

/**
 * Functions
 * */

function setUserToken(token) {
    localStorage.userJWT = token;
}

function removeUserToken() {
    localStorage.removeItem('userJWT');
}

/**
 * Sagas
 * */

export const signUpSaga = function * () {
    while (true) {
        const action = yield take(SIGN_UP_REQUEST);

        try {
            const user = yield call(api.user.signUp, action.payload);

            yield call(setUserToken, user.token);

            yield put(signUpSuccess(user));

            yield put(resetAuthOptions());

            yield put(push('/test'));
        } catch (error) {
            const err = error.response.data.errors;
            err.type = authErrors.signUpError;

            yield put(signUpError(err))
        }
    }
};

export const signInSaga = function * (action) {
    const { payload } = action;
    try {
        const user = yield call(api.user.signIn, payload);

        yield call(setUserToken, user.token);

        yield put(signInSuccess(user));

        yield put(resetAuthOptions());

        yield put(push('/test'));
    } catch (error) {
        const err = error.response.data.errors;
        err.type = authErrors.signInError;

        yield put(signInError(err));
    }

};

export const signOutSaga = function * () {
    try {
        yield call(removeUserToken);
        yield put({ type: SIGN_OUT_SUCCESS })
    } catch (_) {
        console.log(_)
    }
};

export const confirmSaga = function * (action) {
    const { payload, onSuccess, onFail } = action;
    try {
        const user = yield call(api.user.confirm, payload);

        yield call(setUserToken, user.token);

        yield call(onSuccess);

        yield put(confirmSuccess(user));

        yield put(push('/'));
    } catch (_) {
        yield call(onFail);
    }

};

export const confirmEmailSaga = function * (action) {
    const { payload, onSuccess} = action;
    try {
        yield call(api.user.confirmEmail, payload);

        yield call(onSuccess);

        yield put({ type: CONFIRM_EMAIL_SUCCESS });
    } catch (error) {
        const err = error.response.data.errors;
        err.type = authErrors.confirmEmailError;

        yield put(confirmEmailError(err));
    }
};

export const validateTokenSaga = function * (action) {
    const { payload, onSuccess, onFail } = action;
    try {
        yield call(api.user.validateToken, payload);

        yield call(onSuccess);
    } catch (_) {
        yield call(onFail);
    }
};

export const resetPasswordSaga = function * (action) {
    const { payload } = action;
    try {
        yield call(api.user.resetPassword, payload);

        yield put({ type: RESET_PASSWORD_SUCCESS});

        yield put(setAlertMessage({
            typeMessage: "Success",
            message: "resetPasswordSuccess"
        }));

        yield put(setAuthOptions(authOptions.openSignIn));

    } catch (error) {
        const err = error.response.data.errors;
        err.type = authErrors.resetPasswordError;

        yield put(resetPasswordError(err))
    }
};

export const resendConfirmationMessageSaga = function * (action) {
    const { payload, onSuccess, onFail } = action;
    try {
        yield call(api.user.resendConfirmationMessage, payload);

        yield put({ type: RESEND_CONFIRMATION_MESSAGE_SUCCESS});

        yield call(onSuccess);
    } catch (error) {
        yield put({ type: RESEND_CONFIRMATION_MESSAGE_ERROR});

        yield call(onFail);
    }
};

export const saga = function * () {
    yield all([
        signUpSaga(),
        takeEvery(SIGN_IN_REQUEST, signInSaga),
        takeEvery(CONFIRM_REQUEST, confirmSaga),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga),
        takeLatest(CONFIRM_EMAIL_REQUEST, confirmEmailSaga),
        takeLatest(VALIDATE_TOKEN_REQUEST, validateTokenSaga),
        takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga),
        takeEvery(RESEND_CONFIRMATION_MESSAGE_REQUEST ,resendConfirmationMessageSaga)
    ])
};