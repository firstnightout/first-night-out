require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const {} = require('./controllers/firebaseControllers');

const app = express();


app.use(json());

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));