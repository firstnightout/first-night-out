import React, { useState } from 'react';
import './MiniRoute.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {not_found} from '../../images/not_found.png'
const MiniRoute = (props) => {
    const [username, setUsername] = useState(null);
    const [redirectToggle, setRedirectToggle] = useState(false);
    const doubleDigitStyle = {}
    //     color: 'white',
    //     position:'absolute',
    //     left: '42px',
    //     marginTop: '17vw',
    //     fontSize: '12px'
    
    axios.get(`/api/users/${props.user_id}`)
    .then( response => {
        setUsername(response.data.username);
    })
    let render = <>
            {props.place1.photos ? <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place1.photos[0].photo_reference}&maxheight=100&key=${process.env.REACT_APP_GCLOUD_PLACES_API}`}
            className={`mini-route-image-1`}
            alt=''
            onClick={() => setRedirectToggle(true)}
            /> : <img src={'https://previews.123rf.com/images/tristanbm/tristanbm1402/tristanbm140200009/26016173-portrait-of-a-nice-woman-having-a-doubting-gesture-isolated-on-white.jpg'} alt='' className='mini-route-image-1' />}
            { props.place2.photos ? <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place2.photos[0].photo_reference}&maxheight=100&key=${process.env.REACT_APP_GCLOUD_PLACES_API}`}
            className={`mini-route-image-2`}
            alt=''
            onClick={() => setRedirectToggle(true)}
            /> : <img src={'https://previews.123rf.com/images/tristanbm/tristanbm1402/tristanbm140200009/26016173-portrait-of-a-nice-woman-having-a-doubting-gesture-isolated-on-white.jpg'} alt='' className='mini-route-image-2' />}
            {props.place3.photos ? <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place3.photos[0].photo_reference}&maxheight=100&key=${process.env.REACT_APP_GCLOUD_PLACES_API}`}
            className={`mini-route-image-3`}
            alt=''
            onClick={() => setRedirectToggle(true)}
            /> : <img src={'https://previews.123rf.com/images/tristanbm/tristanbm1402/tristanbm140200009/26016173-portrait-of-a-nice-woman-having-a-doubting-gesture-isolated-on-white.jpg'} alt='' className='mini-route-image-3' />}
        </>
        
    if(redirectToggle) {
        return <Redirect to={`/route/${props.routeID}`} />
    }

    return(

        <div className='mini-route' onClick={() => setRedirectToggle(true)}>
        <h1 className='mini-route-text mini-route-username' onClick={() => setRedirectToggle(true)}>{username}</h1>
        {/* <h3 className='mini-route-text mini-route-likes'>{props.likes} Likes</h3> */}
            {render}
            <i className="fas fa-heart"></i>
            <div className="likes-circle"></div>
            <div className="likes" style={+props.likes >= 10 ? doubleDigitStyle : null}>{props.likes <= 99 ? props.likes: props.likes}</div>
        </div>
        
    )
}

export default MiniRoute