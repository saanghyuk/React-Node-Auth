import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import reducers from './reducers';
import Signin from './components/auth/signin'
import Header from './components/header';
//import Signout from './components/auth/signout'
import Signup from './components/auth/signup'
import Feature from './components/feature'
import RequireAuth from './components/auth/require_auth'
//import App from './components/app';
import {AUTH_USER} from "./actions/types";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store=createStoreWithMiddleware(reducers);
//export const history = createHistory();
const token = localStorage.getItem('token');
//If we have a token, consider the user to be singed in
if(token){
    //we need to update application state
    store.dispatch({type: AUTH_USER})
    //이것도 다 reducer로 보내짐
}


ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Signin} />
                        {/*<Route path="/signout" component={Signout} />*/}
                        <Route path="/signup" component={Signup} />
                        <Route path="/feature" component={RequireAuth(Feature)} />

                    </Switch>
                </div>
            </BrowserRouter>
    </Provider>
    , document.querySelector('.container'));

