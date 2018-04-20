import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from "react-router-dom";
import decode from 'jwt-decode';
import { addLocaleData } from 'react-intl';
import uk from 'react-intl/locale-data/uk';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

import history from './history';
import store from './redux';
import Root from './components/Root';

import { signedIn } from "./ducks/auth";
import { setLocaleSuccess, setLocale } from "./ducks/locale";
import { defaultLanguage } from "./shared/constants";

addLocaleData([...en, ...uk, ...ru]);

const languages = ['en', 'uk', 'ru'];

if(localStorage.userJWT) {
    const payload = decode(localStorage.userJWT);
    const user = {
        token: localStorage.userJWT,
        username: payload.username,
        email: payload.email,
        confirmed: payload.confirmed
    };
    store.dispatch(signedIn(user));
}

if(localStorage.movieLang) {
    store.dispatch(setLocaleSuccess(localStorage.movieLang))
} else {
    let lang = (navigator.languages && navigator.languages[0])
        || navigator.language
        || navigator.userLanguage
        || defaultLanguage;

    if(!languages.includes(lang)) {
        lang = lang.split(/[-_]/)[0];
        if(!languages.includes(lang)) {
            if(languages.includes(defaultLanguage)) {
                lang = defaultLanguage
            } else {
                lang = languages[0];
            }
        }
    }
    store.dispatch(setLocale(lang));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route component={Root}/>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
