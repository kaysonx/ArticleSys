import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './ui/App';
import LogIn from './auth/LogIn';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <Route path='/login' component={LogIn}></Route>
        </Route>
    </Router>
);
