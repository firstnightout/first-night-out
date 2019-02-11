import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';


export default (
    <Switch>
        <Route exact path="/" component={ Login }/>
        <Route path="/auth/register" component={ Register }/>
        {/* <Route /> */}
    </Switch>
)