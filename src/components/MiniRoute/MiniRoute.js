import React, { useState } from 'react';
import './MiniRoute.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {not_found} from '../../images/not_found.png'
const MiniRoute = (props) => {
    const [username, setUsername] = useState(null);
    const [redirectToggle, setRedirectToggle] = useState(false);
    const doubleDigitStyle = {}
    //WE MAKE A REQUEST TO GET THE USERNAME AND ADD IT TO RENDER
    axios.get(`/api/users/${props.user_id}`)
    .then( response => {
        setUsername(response.data.username);
    })
    //MINIROUTE REQUIRES 3 PLACE PARAMETERS. USING THE PHOTOS PROPERTY OFF OF THOSE WE CAN GET PREVIEW IMAGES TO RENDER
    let render = <>
            {props.place1.photos ? <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place1.photos[0].photo_reference}&maxheight=1000&maxwidth=1000&key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ`}
            className={`mini-route-image-1`}
            alt=''
            onClick={() => setRedirectToggle(true)}
            //IF NO PREVIEW IMAGES ARE FOUND WE RENDER A DEFAULT STOCK IMAGE
            /> : <img src={'https://previews.123rf.com/images/tristanbm/tristanbm1402/tristanbm140200009/26016173-portrait-of-a-nice-woman-having-a-doubting-gesture-isolated-on-white.jpg'} alt='' className='mini-route-image-1' />}
            { props.place2.photos ? <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place2.photos[0].photo_reference}&maxheight=1000&maxwidth=1000&key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ`}
            className={`mini-route-image-2`}
            alt=''
            onClick={() => setRedirectToggle(true)}
            /> : <img src={'https://previews.123rf.com/images/tristanbm/tristanbm1402/tristanbm140200009/26016173-portrait-of-a-nice-woman-having-a-doubting-gesture-isolated-on-white.jpg'} alt='' className='mini-route-image-2' />}
            {props.place3.photos ? <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place3.photos[0].photo_reference}&maxheight=1000&maxwidth=1000&key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ`}
            className={`mini-route-image-3`}
            alt=''
            onClick={() => setRedirectToggle(true)}
            /> : <img src={'https://previews.123rf.com/images/tristanbm/tristanbm1402/tristanbm140200009/26016173-portrait-of-a-nice-woman-having-a-doubting-gesture-isolated-on-white.jpg'} alt='' className='mini-route-image-3' />}
        </>
        
    if(redirectToggle) {
        return <Redirect to={`/route/${props.routeID}`} />
    }

    let likes;
    if(props.likes >= 99) {
        likes = 99;
    } else if(props.likes < 10) {
        likes = '0' + props.likes;
    } else {
        likes = props.likes;
    }

    return(

        <div className='mini-route' onClick={() => setRedirectToggle(true)}>
        <h1 className='mini-route-text mini-route-username' onClick={() => setRedirectToggle(true)}>{username}</h1>
        {/* <h3 className='mini-route-text mini-route-likes'>{props.likes} Likes</h3> */}
            {render}
            <i className="fas fa-heart"></i>
            <div className="likes-circle"></div>
            <div className="likes">{likes}</div>
        </div>
        
    )
}

export default MiniRoute