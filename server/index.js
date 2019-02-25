const path = require('path')
require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const session = require("express-session");

const 
{ findStuffNearLocation, searchForLocation, getPlaceDetails, autoCompletePlace,
    getPlacesPhotos
} = require('./controllers/mapsController')

const 
{ register, login, signout, createRoute, getRoutesByUserID, 
    getRoutesBasedOnCity, setPreferences, getUsers,
    getRoute, setProfLink, getProfLink, getCity, getVotes, getUser
} = require('./controllers/firebaseControllers');

const app = express();
app.use(json());
app.use( express.static( `${__dirname}/../build` ) )

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
app.post('/api/vote', getVotes)
app.get('/api/routes/user/:id', getRoutesByUserID);
app.get('/api/routes/city/:city', getRoutesBasedOnCity)
app.get('/api/routes/:id', getRoute);
app.get('/api/users/:id', getUsers);
app.get('/api/session', getUser)
app.post('/api/autocomplete', autoCompletePlace)
app.post('/auth/set/profile', setProfLink)
app.get('/auth/profile/:id', getProfLink)
app.post('/api/photos/places', getPlacesPhotos)
// app.get('/api/seed', seed)
app.get('/api/getcity/:city', getCity);

const PORT = process.env.SERVER_PORT || 5050;
// app.get('/api/seed', seed)

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));