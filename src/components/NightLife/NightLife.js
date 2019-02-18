import React, {useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './nightLife.css'
import axios from 'axios';
import MiniPlace from '../MiniPlace/MiniPlace';

const NightLife = (props) => {
    const[selection, setSelection] = useState(['bar'])
    const [places, setPlaces] = useState(null)

    useEffect(() => {
        axios.post(`/api/places/near`, { location: '32.777599, -96.795403', radius: 5000, type: selection[0] })
        .then(response => {
            setPlaces(null);
            let newPlaces = response.data.results.map(val => {
                console.log( val.place_id);
                return <MiniPlace place_id={val.place_id} photo={ val.photos[0].photo_reference }/>
            })
            setPlaces(newPlaces);
    })}, selection)

    const handleChange = (e) => {
        setSelection([e.target.value]);
    }

    

    return (
        <>
        <div className='nightLifeWrapper'>
            <select className='nightLifeDropDown' name='selected' onChange={handleChange}>
                <option value='bar'>Bar</option>
                <option value='casino'>Casino</option>
                <option value='night_club'>Night Club</option>
            </select>
        </div>
        { places }
        </>
    )
 }
const mapStateToProps = state => state

export default connect(mapStateToProps)(NightLife)