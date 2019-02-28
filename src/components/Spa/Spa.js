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
        // let formatAdd = props.user.address.split(' ').join('+') + `,+${props.user.city}+,${props.user.state}`
        axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ').then(location => {
            axios.post('/api/places/near', { location: `${location.data.location.lat},${location.data.location.lng}`, radius: 5000, type: selection[0]})
            .then(response => {
                setPlaces(null)
                setPlaces(response.data.results.map(val => {
                    return val.photos ? <MiniPlace cameFromCategories={1} key={val.place_id} place_id={val.place_id} photo={val.photos[0].photo_reference}/> : <MiniPlace cameFromCategories={1} key={val.place_id} place_id={val.place_id}/>
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
            {/* <button onClick={() => props.history.goBack()}>Back</button> */}
            <div className='spaWrapper'>
                <select className='spaDropDown' name='selected' onChange={handleChange}>
                    <option value="spa">Spa</option>
                    <option value='beauty_salon'>Beauty Salon</option>
                </select>
            </div>
            {places}
        </>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Spa)