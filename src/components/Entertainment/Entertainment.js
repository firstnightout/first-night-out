import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './entertainment.css'
import axios from 'axios';
import MiniPlace from "../MiniPlace/MiniPlace";
import Nav from '../Nav/Nav';







const Entertainment = (props) => {
    const[selection, setSelection] = useState(['movie_theater']);
    const [places, setPlaces] = useState(null);

    useEffect(()=> {
        console.log(selection[0]);

        axios.post('/api/places/near', { location: '32.777599, -96.795403', radius: 5000, type: selection[0] })
        .then( response => {
            setPlaces(null);
            console.log(response.data)
            setPlaces(response.data.results.map( val => {
                return val.photos ? <MiniPlace place_id={val.place_id} photo={ val.photos[0].photo_reference }/> : <MiniPlace place_id={val.place_id}/>
            }));
        })
    }, selection)

    const handleChange = (e) => {
        setSelection([e.target.value]);
    }

return (
    <>
        <Nav />
        <button onClick={() => props.history.goBack()}>Back</button>
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