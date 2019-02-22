import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
// import {} from '../../ducks/reducer'
import './spa.css'
import MiniPlace from '../MiniPlace/MiniPlace'
import Nav from '../Nav/Nav';

const Spa = (props) => {
    const[selection, setSelection] = useState(['spa'])
    const [places, setPlaces] = useState(null)

    useEffect(() => {
        let formatAdd = props.user.address.split(' ').join('+') + `,+${props.user.city}+,${props.user.state}`
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GCLOUD_GEOCODING_API}&address=${formatAdd}`).then(location => {
        console.log(props);
            axios.post('/api/places/near', { location: `${location.data.results[0].geometry.location.lat},${location.data.results[0].geometry.location.lng}`, radius: 5000, type: selection[0]})
            .then(response => {
                console.log(response)
                setPlaces(null)
                setPlaces(response.data.results.map(val => {
                    return val.photos ? <MiniPlace key={val.place_id} place_id={val.place_id} photo={val.photos[0].photo_reference}/> : <MiniPlace key={val.place_id} place_id={val.place_id}/>
                }))
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
            <div className='spaWrapper'>
                <select className='spaDropDown' name='selected' onChange={handleChange}>
                    <option value="spa">spa</option>
                    <option value='beauty_salon'>Beauty Salon</option>
                </select>
            </div>

            {places}

        </>
    )
 }

const mapStateToProps = state => state

export default connect(mapStateToProps)(Spa)