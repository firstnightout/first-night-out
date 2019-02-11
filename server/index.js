require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
// const bcrypt = require('bcryptjs');
const PORT = 3005;
const { register, login } = require('./controllers/firebaseControllers');

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









app.listen(PORT, () => console.log(`Listenting on port ${PORT}...`));



