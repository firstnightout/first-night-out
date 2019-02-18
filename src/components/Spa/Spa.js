import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
// import {} from '../../ducks/reducer'
import './spa.css'
import MiniPlace from '../MiniPlace/MiniPlace'

const Spa = (props) => {
    const[selection, setSelection] = useState(['spa'])
    const [places, setPlaces] = useState(null)

    useEffect(() => {
        axios.post('/api/places/near', { location: '32.777599, -96.795403', radius: 5000, type: selection[0]})
        .then(response => {
            console.log(response)
            setPlaces(null)
            setPlaces(response.data.results.map(val => {
                return val.photos ? <MiniPlace key={val.place_id} place_id={val.place_id} photo={val.photos[0].photo_reference}/> : <MiniPlace key={val.place_id} place_id={val.place_id}/>
            }))

        })
    }, selection)

    const handleChange = (e) => {
        setSelection([e.target.value]);
    }
    return (
        <>
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