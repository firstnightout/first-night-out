import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import MiniPlace from '../MiniPlace/MiniPlace'
// import {} from '../../ducks/reducer'
import './food.css'
import Nav from '../Nav/Nav';

const Food = (props) => {
    const[selection, setSelection] = useState(['restaurant'])
    const[place, setPlaces] = useState(null)

    const handleChange = (e) => {
        setSelection([e.target.value]);
    }
    useEffect(() => {
        let formatAdd = props.user.address.split(' ').join('+') + `,+${props.user.city}+,${props.user.state}`
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GCLOUD_GEOCODING_API}&address=${formatAdd}`).then(location => {
            axios.post('/api/places/near', { location: `${location.data.results[0].geometry.location.lat},${location.data.results[0].geometry.location.lng}`, radius: 5000, type: selection[0]})
            .then(response => {
                setPlaces(null)
                setPlaces(response.data.results.map(val => {
                    return val.photos ? <MiniPlace key={val.place_id} place_id={val.place_id} photo={ val.photos[0].photo_reference }/> : <MiniPlace key={val.place_id} place_id={val.place_id}/>
                }))
            }).catch(err => setPlaces(null))
        })
        }, selection)

    return (
        <>
            <Nav />
            <button onClick={() => props.history.goBack()}>Back</button>
            <div className='foodWrapper'>
                <select className='foodDropDown' name='selected' onChange={handleChange}>
                    <option value='restaurant'>Restaurant</option>
                    <option value='bakery'>Bakery</option>
                    <option value='cafe'>Cafe</option>
                    <option value='meal_delivery'>Meal Delivery</option>
                    <option value='meal_takeaway'>Meal Takeaway</option>
                </select>
            </div>

            {place}

        </>
    )
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(Food)