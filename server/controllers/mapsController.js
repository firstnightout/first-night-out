const axios = require('axios');
const nearbyBaseURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const textSearchURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
const placeDetailsURL = 'https://maps.googleapis.com/maps/api/place/details/json'
function searchForLocation(req, res, next) {
    const {query, location, radius, minPrice, maxPrice, type} = req.body;
    const key = process.env.REACT_APP_GCLOUD_PLACES_API;
    //QUERY AND KEY ARE REQUIRED
    if(!(query && key)) {
        res.status(412).json({error: "INVALID_REQUEST"})
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
            if(response.data.status === "ZERO_RESULTS")
                res.status(404).json({error: "No results were found"});
            else
                res.status(200).json(response.data);
        })
    }
}

function findStuffNearLocation(req, res, next) {
    const {location, radius, keyword, minPrice, maxPrice, name, openNow, type} = req.body;
    const key = process.env.REACT_APP_GCLOUD_PLACES_API;
    //LOCATION, RADIUS, AND KEY ARE ALL REQUIRED
    if(!(location && radius && key)) {
        console.log('failed')
        res.status(412).json({error: "INVALID_REQUEST"});
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
            if(response.data.status === "ZERO_RESULTS")
                res.status(404).json({error: "No results were found"});
            else 
                res.status(200).json(response.data);
        })
    }
}

function getPlaceDetails(req, res, next) {
    const {placeid, fields} = req.body;
    const key = process.env.REACT_APP_GCLOUD_PLACES_API;
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

module.exports = {
    findStuffNearLocation,
    searchForLocation,
    getPlaceDetails
}

/*
{
	"place1": {
		"geometry": {
                "location": {
                    "lat": 32.7766642,
                    "lng": -96.79698789999999
                },
                "viewport": {
                    "northeast": {
                        "lat": 33.0237921,
                        "lng": -96.4637379
                    },
                    "southwest": {
                        "lat": 32.617537,
                        "lng": -96.999347
                    }
                }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
            "id": "fa589a36153613fc17b0ebaebbea7c1e31ca62f0",
            "name": "Dallas",
            "photos": [
                {
                    "height": 1456,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/114431248933890479809/photos\">Tracy Blair</a>"
                    ],
                    "photo_reference": "CmRaAAAAe_UdHEFuCrkPjYLeaeL0nyylvKyjv9zzqFu6i3msCqCd3jD3TUIazh4duwf5v63wyVdJ96AEDvPOa22PsB0_BwaKaTFdr47iR0NJQ5TdwnINsoyn-fUgTJHYzVn12vSzEhCxCo67vekXrhGcuLoOwncMGhQ8xWHac7d0suBj9JjRsfxRRbsfgg",
                    "width": 2592
                }
            ],
            "place_id": "ChIJS5dFe_cZTIYRj2dH9qSb7Lk",
            "reference": "ChIJS5dFe_cZTIYRj2dH9qSb7Lk",
            "scope": "GOOGLE",
            "types": [
                "locality",
                "political"
            ],
            "vicinity": "Dallas"
	},
	"place2": {
            "geometry": {
                "location": {
                    "lat": 32.78057659999999,
                    "lng": -96.7983196
                },
                "viewport": {
                    "northeast": {
                        "lat": 32.78206258029149,
                        "lng": -96.79700871970849
                    },
                    "southwest": {
                        "lat": 32.7793646197085,
                        "lng": -96.79970668029151
                    }
                }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
            "id": "e49ea6daf51fabc1f72c6a7dd3495f2dec0c62e5",
            "name": "The Joule",
            "opening_hours": {
                "open_now": true
            },
            "photos": [
                {
                    "height": 3024,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/116557909496529797972/photos\">Adam Carvalho</a>"
                    ],
                    "photo_reference": "CmRaAAAAwkn8xBoRWa7ZwtuIpoIjBgVchCYW5vDhVDPfIETC3p_mAYqTeldAsoBKNQwSkmSKMS2hGUhj0KUWZYWgtwkbmcSzRVJl8RXw-b3jBbNkUtYBEJ5WrM0CKUvSWv_yONxJEhC8EorzpvPJyMRMqHeR0d3kGhRzPSV9v5vUk4EFG9foHfgSzTK6DQ",
                    "width": 4032
                }
            ],
            "place_id": "ChIJn8aFxxiZToYR1tuZ71sZKeI",
            "plus_code": {
                "compound_code": "Q6J2+6M Dallas, Texas, United States",
                "global_code": "8645Q6J2+6M"
            },
            "rating": 4.6,
            "reference": "ChIJn8aFxxiZToYR1tuZ71sZKeI",
            "scope": "GOOGLE",
            "types": [
                "lodging",
                "point_of_interest",
                "establishment"
            ],
            "user_ratings_total": 805,
            "vicinity": "1530 Main Street, Dallas"
        },
    "place3": {
            "geometry": {
                "location": {
                    "lat": 32.7801851,
                    "lng": -96.79908569999999
                },
                "viewport": {
                    "northeast": {
                        "lat": 32.7813896802915,
                        "lng": -96.79769561970849
                    },
                    "southwest": {
                        "lat": 32.7786917197085,
                        "lng": -96.8003935802915
                    }
                }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
            "id": "de8124f7f230c5c4c6c818d83e9190661b915b36",
            "name": "Magnolia Dallas Downtown",
            "opening_hours": {
                "open_now": true
            },
            "photos": [
                {
                    "height": 768,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/113100922380614624502/photos\">Magnolia Dallas Downtown</a>"
                    ],
                    "photo_reference": "CmRaAAAAfyPa0Apa3h8UEudMLUzECRQAr9MZ08O356UVbI2Oh1TThlJjUypu-vObXeBYxBI-8hv_pEfq3LLWi9ogsuNe5PJ8HOYeddIw728JcYFtUc75KMDiujGgaUQe0TP4bTxpEhDh1t44MwLwqS7-bUqKNv64GhTsiSE6_BMu8YXiBAExF_BLweMyoA",
                    "width": 513
                }
            ],
            "place_id": "ChIJEceT6RiZToYRamCabf48B6k",
            "plus_code": {
                "compound_code": "Q6J2+39 Dallas, Texas, United States",
                "global_code": "8645Q6J2+39"
            },
            "rating": 4.3,
            "reference": "ChIJEceT6RiZToYRamCabf48B6k",
            "scope": "GOOGLE",
            "types": [
                "lodging",
                "point_of_interest",
                "establishment"
            ],
            "user_ratings_total": 1172,
            "vicinity": "1401 Commerce Street, Dallas"
        }
    
}
*/