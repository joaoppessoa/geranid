import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
       return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Signin} />
                    <Route path="/sign-in" component={Signin} />
                    <Route path="/sign-up" component={Signup} />
                    <Route path="/home" component={Home} />
                </Switch>
            </BrowserRouter>
        );
    } 
}
 
export default Routes;