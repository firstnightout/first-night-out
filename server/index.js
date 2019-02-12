require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const {} = require('./controllers/firebaseControllers');
const {findStuffNearLocation, searchForLocation} = require('./controllers/mapsController')
const session = require("express-session");
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

const PORT = process.env.SERVER_PORT || 4000;

// app.get('/api/seed', seed)

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
