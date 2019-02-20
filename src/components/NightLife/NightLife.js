import React, {useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './nightLife.css'
import axios from 'axios';
import MiniPlace from '../MiniPlace/MiniPlace';
import Nav from '../Nav/Nav';

const NightLife = (props) => {
    const[selection, setSelection] = useState(['bar'])
    const [places, setPlaces] = useState(null)

    useEffect(() => {
        let formatAdd = props.user.address.split(' ').join('+') + `,+${props.user.city}+,${props.user.state}`
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GCLOUD_GEOCODING_API}&address=${formatAdd}`).then(location => {
            axios.post(`/api/places/near`, { location: `${location.data.results[0].geometry.location.lat},${location.data.results[0].geometry.location.lng}`, radius: 5000, type: selection[0] })
            .then(response => {
                setPlaces(null);
                let newPlaces = response.data.results.map(val => {
                    console.log( val.place_id);
                    return <MiniPlace place_id={val.place_id} photo={ val.photos[0].photo_reference }/>
                })
                setPlaces(newPlaces);
            }).catch(err => setPlaces(null))
        })
    }, selection)

    const handleChange = (e) => {
        setSelection([e.target.value]);
    }

    

    return (
        <>
        <Nav />
        <button onClick={() => props.history.goBack()}>Back</button>
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