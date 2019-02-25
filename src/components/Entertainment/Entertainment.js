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
    console.log()
    // setLatLong(`${location.data.results[0].geometry.location.lat},${location.data.results[0].geometry.location.lng}`)
    useEffect(()=> {
        let formatAdd = props.user.address.split(' ').join('+') + `,+${props.user.city}+,${props.user.state}`
        console.log(formatAdd);
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GCLOUD_GEOCODING_API}&address=${formatAdd}`).then(location => {
            axios.post('/api/places/near', { location: `${location.data.results[0].geometry.location.lat},${location.data.results[0].geometry.location.lng}`, radius: 5000, type: selection[0] })
            .then( response => {
                console.log(response)
                setPlaces(null);
                console.log(response.data.results)
                if(response.data.results.length === 0) {
                    setPlaces(null);
                } else {
                    setPlaces(response.data.results.map( val => {
                        return val.photos ? <MiniPlace place_id={val.place_id} photo={ val.photos[0].photo_reference }/> : <MiniPlace place_id={val.place_id}/>
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
        {/* <button onClick={() => props.history.goBack()}>Back</button> */}
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