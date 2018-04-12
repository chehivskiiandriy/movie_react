import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from "react-router-dom";
import decode from 'jwt-decode';

import history from './history';
import store from './redux';
import Root from './components/Root';

import { signedIn } from "./ducks/auth";

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
