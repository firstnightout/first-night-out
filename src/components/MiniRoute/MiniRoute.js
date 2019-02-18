import React, { useState } from 'react';
import './MiniRoute.css';
import axios from 'axios';
const MiniRoute = (props) => {
    const [username, setUsername] = useState(null);
    //WILL NEED MEDIA QUERIES TO DEAL WITH ABSOLUTE POSITIONING
    let places = [
        {
            image: 'https://www.denverarchitects.org/wp-content/uploads/2018/01/RestaurantArchitects_Denver_1-Izakaya-Den.jpg',
            name: "Good Restaurant",
            rating: 3
        },
        {
            image: "https://cdn.cnn.com/cnnnext/dam/assets/161221152712-new-restaurants-2017-attitude-at-avani-riverside-bangkok.jpg",
            name: "Fantastic Restaurant",
            rating: 4
        },
        {
            image: "https://cdn0.wideopeneats.com/wp-content/uploads/2018/06/mcdonalds-950x535.jpg",
            name: "Best Restaurant",
            rating: 5
        }
    ]
    // let renderArr = places.map((val, i) => <img className={`mini-route-image-${i+1}`} src={val.image} />);
    console.log(props)
    axios.get(`/api/users/${props.user_id}`)
    .then( response => {
        // console.log(response)
        setUsername(response.data.username);
    })
    let render = <>

            {props.place1.photos && <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place1.photos[0].photo_reference}&maxheight=100&key=AIzaSyB3hkAtDj8ZZK9ptagSp_YqQouPEMcuaCo`}
            className={`mini-route-image-1`}
            /> }
            { props.place2.photos && <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place2.photos[0].photo_reference}&maxheight=100&key=AIzaSyB3hkAtDj8ZZK9ptagSp_YqQouPEMcuaCo`}
            className={`mini-route-image-2`}
            /> }
            {props.place3.photos && <img 
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.place3.photos[0].photo_reference}&maxheight=100&key=AIzaSyB3hkAtDj8ZZK9ptagSp_YqQouPEMcuaCo`}
            className={`mini-route-image-3`}
            /> }
        </>
    return(
        <div className='mini-route'>
        <h1 className='mini-route-text mini-route-username'>{username}</h1>
        <h3 className='mini-route-text mini-route-likes'>{props.likes} Likes</h3>
            {render}
        </div>
    )
}

export default MiniRoute