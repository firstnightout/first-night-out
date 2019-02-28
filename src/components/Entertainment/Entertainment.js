import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
// import {} from '../../ducks/reducer'
import './entertainment.css'
import axios from 'axios';
import MiniPlace from "../MiniPlace/MiniPlace";
import Nav from '../Nav/Nav';







const Entertainment = (props) => {
    const[selection, setSelection] = useState(['movie_theater']);
    const [places, setPlaces] = useState(null);
    useEffect(()=> {
        //WE HIT THE GEOLOCATION API TO GET OUR LATITUDE AND LONGITUDE
        axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ').then(location => {
            //BASED OF OUR LOCATION WE FIND PLACES NEAR US
            axios.post('/api/places/near', { location: `${location.data.location.lat},${location.data.location.lng}`, radius: 5000, type: selection[0] })
            .then( response => {
                setPlaces(null);
                if(response.data.results.length === 0) {
                    setPlaces(null);
                } else {
                    //IF PLACES WERE FOUND, WE RENDER THEM IN MINIPLACE COMPONENTS
                    setPlaces(response.data.results.map( val => {
                        return val.photos ? <MiniPlace cameFromCategories={1} place_id={val.place_id} photo={ val.photos[0].photo_reference }/> : <MiniPlace cameFromCategories={1} place_id={val.place_id}/>
                    }));
                }
            }).catch(err => setPlaces(null))
        })
    }, selection)

const handleChange = (e) => {
    setSelection([e.target.value]);
}

return (
    <>
        <Nav />
        <div className='entertainmentWrapper'>
            <select className='entertainmentDropDown' name='selected' onChange={handleChange}>
                <option value='movie_theater'>Movie Theater</option>
                <option value='amusement_park'>Amusement Park</option>
                <option value='aquarium'>Aquarium</option>
                <option value='zoo'>Zoo</option>
            </select>
        </div>
        
        { places }
    </>
)
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Entertainment)