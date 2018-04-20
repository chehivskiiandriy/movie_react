import { all } from 'redux-saga/effects';

import { saga as authSaga } from '../ducks/auth';
import { saga as localeSaga } from '../ducks/locale';

export default function * rootSaga() {
    yield all([
        authSaga(),
        localeSaga()
    ])
}