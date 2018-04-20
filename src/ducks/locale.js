import { all, takeLatest, put, call } from 'redux-saga/effects';

/**
 * Constants
 * */
export const moduleName = 'locale';
export const SET_LOCALE_REQUEST = `${moduleName}/SET_LOCALE_REQUEST`;
export const SET_LOCALE_SUCCESS = `${moduleName}/SET_LOCALE_SUCCESS`;

/**
 * Reducer
 * */

const initialState = {
    lang: ''
};

export default function reducer(state = initialState, action = {}) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOCALE_SUCCESS:
            return {
                ...state,
                lang: payload.lang
            };
        default:
            return state;
    }
}

/**
 * Action Creators
 * */

export function setLocale(lang) {
    return {
        type: SET_LOCALE_REQUEST,
        payload: { lang }
    }
}

export function setLocaleSuccess(lang) {
    return {
        type: SET_LOCALE_SUCCESS,
        payload: { lang }
    }
}

/**
 * Functions
 * */

function setLocaleLang(lang) {
    localStorage.movieLang = lang;
}

/**
 * Sagas
 * */

export const setLocaleSaga = function * (action) {
    const { payload } = action;
    try {
        yield call(setLocaleLang, payload.lang);

        yield put(setLocaleSuccess(payload.lang))
    } catch (_) {

    }
};

export const saga = function * () {
    yield all([
        takeLatest(SET_LOCALE_REQUEST, setLocaleSaga)
    ])
};
