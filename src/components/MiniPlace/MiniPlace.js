import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './MiniPlace.css'

const MiniPlace = (props) => {
    const [ref, setRef] = useState(0);
    const testPlace = {
            "geometry": {
                "location": {
                    "lat": 32.7811852,
                    "lng": -96.795757
                },
                "viewport": {
                    "northeast": {
                        "lat": 32.7826196302915,
                        "lng": -96.7944340697085
                    },
                    "southwest": {
                        "lat": 32.7799216697085,
                        "lng": -96.79713203029151
                    }
                }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
            "id": "99768f3e883fc4dbb573609ed75ecaceeada5639",
            "name": "Wild Salsa",
            "opening_hours": {
                "open_now": true
            },
            "photos": [
                {
                    "height": 1440,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/112887384560088893539/photos\">Raul S.</a>"
                    ],
                    "photo_reference": "CmRaAAAAv9DGDMaMB9BPbuJBGXgtD3eipfCItP6gN6fML32G8umC9TM9nrsnXdX9tnAO-2lBbpNH-0Ye6yhYtxYY_rgMGd00ZLqSA4kHGPmVhXyLyn9J-aHb_cKNX7GenusvzM7kEhCGk2PK1eMQz7Zu6QxHFGXrGhTzK3OpwUs8FGmTow2nizJdAR_9Mg",
                    "width": 2560
                }
            ],
            "place_id": "ChIJFyXWQx-ZToYR9qFvdYlDjtA",
            "plus_code": {
                "compound_code": "Q6J3+FM Dallas, Texas, United States",
                "global_code": "8645Q6J3+FM"
            },
            "price_level": 2,
            "rating": 4.1,
            "reference": "ChIJFyXWQx-ZToYR9qFvdYlDjtA",
            "scope": "GOOGLE",
            "types": [
                "bar",
                "restaurant",
                "point_of_interest",
                "food",
                "establishment"
            ],
            "user_ratings_total": 649,
            "vicinity": "1800 Main Street, Dallas"
        }
        useEffect(() => {
            axios.post(`/api/places/details`, {
                placeid: testPlace.place_id,
            }).then(response => {
                setRef(response.data.result);
                console.log('response.data.result: ', response.data.result);
            })
        }, [])
    return(
        <div className='mini-place'>
            <img className='mini-place-photo' src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${testPlace.photos[0].photo_reference}&maxheight=100&key=AIzaSyB3hkAtDj8ZZK9ptagSp_YqQouPEMcuaCo`} />
            <div className='mini-place-info'>
                <h1>{testPlace.name}</h1>
                <h3>{ref.formatted_address ? ref.formatted_address.substring(0, ref.formatted_address.indexOf(',', ref.formatted_address.indexOf(',') + 1)) : null }</h3>
                <h3>{ref.rating}</h3>
            </div>
        </div>
    );
}
export default MiniPlace;