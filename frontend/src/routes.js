import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';

export default function Routes() {
    return(
        <Router>
            <Switch>
                <Route path='/' exact component={Signin} />
                <Route path='/sign-in' component={Signin} />
                <Route path='/sign-up' component={Signup} />
                <Route path='/home' component={Home} />
            </Switch>
        </Router>
    );
}