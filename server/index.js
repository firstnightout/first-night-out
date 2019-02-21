require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const session = require("express-session");
// const bcrypt = require('bcryptjs');
const { findStuffNearLocation, searchForLocation, getPlaceDetails, autoCompletePlace } = require('./controllers/mapsController')
const 
{ register, login, signout, createRoute, getRoutesByUserID, 
    getRoutesBasedOnCity, setPreferences, getUsers,
    getRoute, setProfLink, getProfLink
} = require('./controllers/firebaseControllers');


const app = express();
app.use(json());

// SESSION:
app.use(
    session({
        name: 'First Night Out',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
})
);

//ENDPOINTS: 
app.post('/api/auth/login', login);
app.post('/api/auth/register', register);
app.delete('/api/auth/signout', signout);
app.post('/api/auth/preferences/:id', setPreferences);
app.post('/api/places/near', findStuffNearLocation);
app.post('/api/places/search', searchForLocation);
app.post('/api/places/details', getPlaceDetails);
app.post('/api/create/route', createRoute)
app.get('/api/routes/user/:id', getRoutesByUserID);
app.get('/api/routes/city/:city', getRoutesBasedOnCity)
app.get('/api/routes/:id', getRoute);
app.get('/api/users/:id', getUsers);
app.post('/api/autocomplete', autoCompletePlace)
app.post('/auth/set/profile', setProfLink)
app.get('/auth/profile/:id', getProfLink)
// app.get('/api/seed', seed)

const PORT = process.env.SERVER_PORT || 5050;
// app.get('/api/seed', seed)

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));