/**
 * Constants
 * */
export const moduleName = 'alert';
export const SET_ALERT_MESSAGE = `${moduleName}/SET_ALERT_MESSAGE`;
export const RESET_ALERT_MESSAGE = `${moduleName}/RESET_ALERT_MESSAGE`;

/**
 * Reducer
 * */

const initialState = {
    typeMessage: '',
    message: ''
};

export default function reducer(state = initialState, action = {}) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT_MESSAGE:
            return {
                ...payload
            };
        case RESET_ALERT_MESSAGE:
            return {
                ...initialState
            };
        default:
            return state;
    }
}

/**
 * Action Creators
 * */

export function setAlertMessage(data) {
    return {
        type: SET_ALERT_MESSAGE,
        payload: data
    }
}

export function resetAlertMessage(data) {
    return {
        type: RESET_ALERT_MESSAGE,
        payload: data
    }
}


