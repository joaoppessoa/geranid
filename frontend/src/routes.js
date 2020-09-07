import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home'

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
       return (
            <BrowserRouter>
                <Switch>
                    <Route path="/home" component={Home} />
                </Switch>
            </BrowserRouter>
        );
    } 
}
 
export default Routes;