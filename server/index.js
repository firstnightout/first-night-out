require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const session = require("express-session");
// const bcrypt = require('bcryptjs');
const { findStuffNearLocation, searchForLocation, getPlaceDetails } = require('./controllers/mapsController')
const { register, login, signout } = require('./controllers/firebaseControllers');


const app = express();
app.use(json());

// SESSION:
app.use(
    session({
        name: 'First Night Out',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
})
);

//ENDPOINTS: 
app.post('/api/auth/login', login);
app.post('/api/auth/register', register);
app.delete('/api/auth/signout', signout);
app.post('/api/places/near', findStuffNearLocation);
app.post('/api/places/search', searchForLocation);
app.post('/api/places/details', getPlaceDetails);

const PORT = process.env.SERVER_PORT || 5050;
// app.get('/api/seed', seed)

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));