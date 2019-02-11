require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const {} = require('./controllers/firebaseControllers');
const {findStuffNearLocation, searchForLocation} = require('./controllers/mapsController')

const app = express();


app.use(json());

const PORT = process.env.SERVER_PORT || 4000;

// app.get('/api/seed', seed)
app.post('/api/places/near', findStuffNearLocation)
app.post('/api/places/search', searchForLocation)

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));