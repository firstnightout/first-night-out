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
import Register2 from './components/Register/Register2';
import VenueCard from './components/VenueCard/VenueCard';
import Categories from './components/Categories/Categories'
import Map from './components/Map/Map'
import RouteComponent from './components/Route/Route'

import Account from './components/Account/Account';
import AccountSettings from './components/AccountSettings/AccountSettings'

export default (
    <Switch>
        <Route exact path="/" component={ Login }/>
        <Route exact path='/account' component={ Account } />
        <Route exact path='/account/settings' component={ AccountSettings } />
        <Route path="/auth/register-1" component={ Register }/>
        <Route path="/auth/register-2" component={ Register2 }/>
        <Route path="/home" component={ Home } />
        <Route path="/venue/details/:id" component={ VenueCard } />
        {/* Route creation routes */}
        <Route path="/food" component={ Food }/>
        <Route path="/shopping" component={ Shopping }/>
        <Route path="/entertainment" component={ Entertainment }/>
        <Route path="/night-life" component={ NightLife }/>
        <Route path="/spa" component={ Spa }/>
        <Route path="/family-fun" component={ FamilyFun }/>
        <Route path="/categories" component={ Categories }/>
        <Route path='/map/:id' component={ Map }/>
        <Route path='/route/:routeid' component={ RouteComponent }/>
    </Switch>
)