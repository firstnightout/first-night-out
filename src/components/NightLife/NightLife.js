import React, {useState, useEffect } from 'react'
import {connect} from 'react-redux'
// import {} from '../../ducks/reducer'
import './nightLife.css'
import axios from 'axios';
import MiniPlace from '../MiniPlace/MiniPlace';
import Nav from '../Nav/Nav';

const NightLife = (props) => {
    const[selection, setSelection] = useState(['bar'])
    const [places, setPlaces] = useState(null)

    useEffect(() => {
        // let formatAdd = props.user.address.split(' ').join('+') + `,+${props.user.city}+,${props.user.state}`
        axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ').then(location => {
            axios.post(`/api/places/near`, { location: `${location.data.location.lat},${location.data.location.lng}`, radius: 5000, type: selection[0] })
            .then(response => {
                setPlaces(null);
                let newPlaces = response.data.results.map(val => {
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
        {/* <button onClick={() => props.history.goBack()}>Back</button> */}
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