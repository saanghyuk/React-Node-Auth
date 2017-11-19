import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import 'normalize.css/normalize.css';
import './styles/styles.scss';;
import reducers from './reducers';
import Signin from './components/auth/signin'
import Header from './components/header';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

//export const history = createHistory();

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/signin" component={Signin} />
                    </Switch>
                </div>
            </BrowserRouter>
    </Provider>
    , document.querySelector('.container'));

