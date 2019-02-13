require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const session = require("express-session");
const { register, login, signout } = require('./controllers/firebaseControllers');
const {findStuffNearLocation, searchForLocation} = require('./controllers/mapsController')
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


const PORT = process.env.SERVER_PORT || 4000;
// app.get('/api/seed', seed)

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));