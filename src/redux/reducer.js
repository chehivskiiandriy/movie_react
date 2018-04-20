import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import {reducer as form} from 'redux-form'

import authReducer, { moduleName as authModule } from "../ducks/auth";
import localeReducer, { moduleName as localeModule } from "../ducks/locale";

export default combineReducers({
    router, form,
    [authModule]: authReducer,
    [localeModule]: localeReducer
})