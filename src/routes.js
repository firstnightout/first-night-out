import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Food from './components/Food/Food';
import Shopping from './components/Shopping/Shopping';
import Entertainment from './components/Entertainment/Entertainment';
import NightLife from './components/NightLife/NightLife';
import Spa from './components/Spa/Spa';
import FamilyFun from './components/FamilyFun/FamilyFun';

export default (
    <Switch>
        <Route exact path="/" component={ Login }/>
        <Route path="/auth/register" component={ Register }/>
        <Route path="/home" component={Home} />
        <Route path="/food" component={ Food }/>
        <Route path="/shopping" component={ Shopping }/>
        <Route path="/entertainment" component={ Entertainment }/>
        <Route path="/night-life" component={ NightLife }/>
        <Route path="/spa" component={ Spa }/>
        <Route path="/family-fun" component={ FamilyFun }/>
        {/* <Route /> */}
    </Switch>
)