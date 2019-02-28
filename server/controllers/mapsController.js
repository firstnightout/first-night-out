const axios = require('axios');
const util = require('util')
const nearbyBaseURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const textSearchURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
const placeDetailsURL = 'https://maps.googleapis.com/maps/api/place/details/json'
const autoCompleteURL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
function searchForLocation(req, res, next) {
    const {query, location, radius, minPrice, maxPrice, type} = req.body;
    const key = "AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ"
    // process.env.REACT_APP_GCLOUD_PLACES_API;
    //QUERY AND KEY ARE REQUIRED
    if(!(query && key)) {
        res.status(412).json({error: "INVALID_REQUEST"})
        return {error: "INVALID_REQUEST"}
    } else {
        let newQuery = query.split(' ').join('+');
        let request = `${textSearchURL}?query=${query}&key=${key}`;
        if(location)
            request+=`&location=${location}`
        if(radius)
            request+=`&radius=${radius}`;
        if(minPrice)
            request+=`&minprice=${minPrice}`;
        if(maxPrice)
            request+=`&maxprice=${maxPrice}`;
        if(type)
            request+=`&type=${type}`;

        axios.get(request).then(response => {
            if(response.data.status === "ZERO_RESULTS") {
                res.status(404).json({error: "No results were found"});
                return {error: "No results were found"};
            }
            else {
                res.status(200).json(response.data);
                return response.data
            }
        })
    }
}

function findStuffNearLocation(req, res, next) {
    const {location, radius, keyword, minPrice, maxPrice, name, openNow, type} = req.body;
    const key = "AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ"
    // process.env.REACT_APP_GCLOUD_PLACES_API;
    //LOCATION, RADIUS, AND KEY ARE ALL REQUIRED
    if(!(location && radius && key)) {
        res.status(412).json({error: "INVALID_REQUEST"});
        return {error: "INVALID_REQUEST"}
    } else {
        let request = `${nearbyBaseURL}?location=${location}&radius=${radius}&key=${key}`
        if(keyword)
            request+=`&keyword=${keyword}`;
        if(minPrice)
            request+=`&minprice=${minPrice}`;
        if(maxPrice)
            request+=`&maxprice=${maxPrice}`;
        if(name)
            request+=`&name=${name}`;
        if(openNow)
            request+=`&opennow=${openNow}`;
        if(type)
            request+=`&type=${type}`;

        axios.get(request).then(response => {
            if(response.data.status === "ZERO_RESULTS") {
                res.status(404).json({error: "No results were found"});
                return request
            }
            else {
                res.status(200).json(response.data);
                return request
            }
        })
    }
}

function getPlaceDetails(req, res, next) {
    const {placeid, fields} = req.body;
    const key = "AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ"
    // process.env.REACT_APP_GCLOUD_PLACES_API;
    //PLACEID IS REQUIRED
    if(!(key && placeid)) {
        res.status(412).json({error: "INVALID_REQUEST"});
    } else {
        let request = `${placeDetailsURL}?placeid=${placeid}&key=${key}`;
        if(fields) {
            request+=`&fields=${fields}`;
        }
        axios.get(request).then(response => {
            if(response.data.status === 'OK') {
                res.status(200).json(response.data);
            } else {
                res.status(404).json({error: "No results were found"})
            }
        })
    }
}

function autoCompletePlace(req, res) {
    const {input, sessiontoken} = req.body;
    if(!(input && sessiontoken)) {
        res.status(412).json({error: 'INVALID_REQUEST'});
    } else { //AIzaSyB3hkAtDj8ZZK9ptagSp_YqQouPEMcuaCo
        axios.get(`${autoCompleteURL}?key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ&input=${input}&sessiontoken=${sessiontoken}`).then(response => {
            res.json(response.data)
        })
        // res.status(200).send(response);
    }

}

async function getPlacesPhotos(req, res) {
    const {predictions} = req.body;
    const key = "AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ"
    // process.env.REACT_APP_GCLOUD_PLACES_API;
    let place1Details = predictions.length >= 1 ? await axios.get(`${placeDetailsURL}?placeid=${predictions[0].place_id}&key=${key}`) : {};
    let place2Details = predictions.length >= 2 ? await axios.get(`${placeDetailsURL}?placeid=${predictions[1].place_id}&key=${key}`) : {}
    let place3Details = predictions.length >= 3 ? await axios.get(`${placeDetailsURL}?placeid=${predictions[2].place_id}&key=${key}`) : {}
    let place4Details = predictions.length >= 4 ? await axios.get(`${placeDetailsURL}?placeid=${predictions[3].place_id}&key=${key}`) : {}
    let place5Details = predictions.length >= 5 ? await axios.get(`${placeDetailsURL}?placeid=${predictions[4].place_id}&key=${key}`) : {};
    let responseArr = [
        place1Details.data,
        place2Details.data,
        place3Details.data,
        place4Details.data,
        place5Details.data
    ]
    res.status(200).json(responseArr);
}

module.exports = {
    findStuffNearLocation,
    searchForLocation,
    getPlaceDetails,
    autoCompletePlace,
    getPlacesPhotos
}