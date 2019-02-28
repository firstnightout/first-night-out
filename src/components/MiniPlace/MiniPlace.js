import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './MiniPlace.css'
import {Redirect } from 'react-router-dom';

//REQUIRES PLACE_ID PROP AND PHOTO PROP
const MiniPlace = (props) => {
    const [ref, setRef] = useState(0);
    const [name, setName] = useState(0);
    const [redirectToggle, setRedirectToggle] = useState(false);
    const [starsArr, setStarsArr] = useState([]);

    useEffect(() => {
        //USING THE PLACEID WE MAKE A CALL TO GET INFO ON THE PLACE TO RENDER
        axios.post(`/api/places/details`, {
            placeid: props.place_id,
        }).then(response => {
            setRef(response.data.result);
            let tempArr = [];
            //WE ROUND THE RATING AND RENDER THAT MANY STARS
            for(let i = 0; i < Math.round(response.data.result.rating); i++) {
                tempArr.push(<i className="fas fa-star"></i>);
            }
            setStarsArr(tempArr);
            //WE CUT OFF THE REST OF THE TITLE IF IT IS TOO LONG AND ADD ELLIPSIS
            if(response.data.result.name.length > 30) {
                setName(response.data.result.name.substring(0,27) + '...');
            } else {
                setName(response.data.result.name);
            }
        })
    }, [])
    //IF THEY CLICK ON A PART OF IT, WE REDIRECT THEM TO THE VENUE CARD COMPONENT TO VIEW MORE DETAILS
    if(redirectToggle !== false) {
        return <Redirect to={'/venue/details/' + redirectToggle + `/${props.cameFromCategories}`} />
    }
    return(
        <div className='mini-place'>
            <img onClick={() => setRedirectToggle(props.place_id)} className='mini-place-photo' alt="" src={props.photo ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.photo}&maxheight=1000&key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ` : `https://s3.us-east-2.amazonaws.com/first-night-out/placeholder_img.png`} />
            <div className='mini-place-info'>
                <h1>{name}</h1>
                <h3>{ref.formatted_address && ref.formatted_address.substring(0, ref.formatted_address.indexOf(',', ref.formatted_address.indexOf(',') + 1))}</h3>
                <h3>{starsArr}</h3>
            </div>
        </div>
    );
}
export default MiniPlace;