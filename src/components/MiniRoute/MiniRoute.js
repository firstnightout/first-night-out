import React, { useState } from 'react';
import './MiniRoute.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
const MiniRoute = (props) => {
    const [username, setUsername] = useState(null);
    const [redirectToggle, setRedirectToggle] = useState(false);
    //WILL NEED MEDIA QUERIES TO DEAL WITH ABSOLUTE POSITIONING
    console.log(props.routeID)
    axios.get(`/api/users/${props.user_id}`)
    .then( response => {
        setUsername(response.data.username);
    })
    let render = <>

            {props.place1.photos && <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place1.photos[0].photo_reference}&maxheight=100&key=${process.env.REACT_APP_GCLOUD_PLACES_API}`}
            className={`mini-route-image-1`}
            onClick={() => setRedirectToggle(true)}
            /> }
            { props.place2.photos && <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place2.photos[0].photo_reference}&maxheight=100&key=${process.env.REACT_APP_GCLOUD_PLACES_API}`}
            className={`mini-route-image-2`}
            onClick={() => setRedirectToggle(true)}
            /> }
            {props.place3.photos && <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place3.photos[0].photo_reference}&maxheight=100&key=${process.env.REACT_APP_GCLOUD_PLACES_API}`}
            className={`mini-route-image-3`}
            onClick={() => setRedirectToggle(true)}
            /> }
        </>
        
    if(redirectToggle) {
        return <Redirect to={`/route/${props.routeID}`} />
    }
    return(
        <div className='mini-route'>
        <h1 className='mini-route-text mini-route-username'>{username}</h1>
        <h3 className='mini-route-text mini-route-likes'>{props.likes} Likes</h3>
            {render}
        </div>
        
    )
}

export default MiniRoute