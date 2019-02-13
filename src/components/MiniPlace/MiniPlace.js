import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './MiniPlace.css'

const MiniPlace = (props) => {
    const [ref, setRef] = useState(0);
    const testPlace = {
            "geometry": {
                "location": {
                    "lat": -33.8688197,
                    "lng": 151.2092955
                },
                "viewport": {
                    "northeast": {
                        "lat": -33.5781409,
                        "lng": 151.3430209
                    },
                    "southwest": {
                        "lat": -34.118347,
                        "lng": 150.5209286
                    }
                }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
            "id": "044785c67d3ee62545861361f8173af6c02f4fae",
            "name": "Sydney",
            "photos": [
                {
                    "height": 1536,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/115027288387975928704/photos\">Alan Chen</a>"
                    ],
                    "photo_reference": "CmRaAAAA5I_hH61SoJV-mweVz4FpiHs4Fi3YFcRukL9By9IPiKXAxLERo1fV_d5rO5835ylVNTPnaRffru1q0yfPqNLGoORsXvfo-UQHjmYFvNidVGsUpuHJtIEyl9AKXkNiuGfmEhBXQQFVTtSR7yqXl8eFk37xGhQXxkXEag-2kvZP7vrvFmWvBEiB6Q",
                    "width": 2300
                }
            ], //end my missouri
            "place_id": "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
            "reference": "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
            "scope": "GOOGLE",
            "types": [
                "colloquial_area",
                "locality",
                "political"
            ],
            "vicinity": "Sydney"
        }
        // useEffect(() => {
        //     axios.get(`/api/places/photo/${testPlace.photos[0].photo_reference}`).then(response => {
        //         setRef(response.data);
        //     })
        // }, [])
    return(
        <div className='mini-place'>
            <img className='mini-place-photo' src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${testPlace.photos[0].photo_reference}&maxheight=100&key=AIzaSyB3hkAtDj8ZZK9ptagSp_YqQouPEMcuaCo`} />
            <div className='mini-place-info'>
                <h1>{testPlace.name}</h1>
            </div>
        </div>
    );
}
export default MiniPlace;