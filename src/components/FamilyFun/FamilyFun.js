import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
// import {} from '../../ducks/reducer'
import './familyFun.css'
import MiniPlace from '../MiniPlace/MiniPlace';
import axios from 'axios';
import Nav from '../Nav/Nav';

const FamilyFun = (props) => {
    const [selection, setSelection] = useState(['art_gallery'])
    const [place, setPlaces] = useState(null)

    const handleChange = (e) => {
        setSelection([e.target.value]);
    }
    useEffect(() => {
        //WE HIT THE GEOLOCATION API TO GET OUR LATITUDE AND LONGITUDE. BASED OF OUR LOCATION WE FIND PLACES NEAR US. IF PLACES WERE FOUND, WE RENDER THEM IN MINIPLACE COMPONENTS
        axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ').then(location => {
            axios.post('/api/places/near', { location: `${location.data.location.lat},${location.data.location.lng}`, radius: 5000, type: selection[0]})
            .then(response => {
                setPlaces(null)
                setPlaces(response.data.results.map(val => {
                    return val.photos ? <MiniPlace cameFromCategories={1} key={val.place_id} place_id={val.place_id} photo={ val.photos[0].photo_reference }/> : <MiniPlace cameFromCategories={1} key={val.place_id} place_id={val.place_id}/>
                }))
            }).catch(err => setPlaces(null))
        })
        }, selection)

    return (
        <>
            <Nav />
            <div className='familyFunWrapper'>
                <select className='familyFunDropDown' name='selection' onChange={handleChange}>
                    <option value='art_gallery'>Art Gallery</option>
                    <option value='bowling_alley'>Bowling Alley</option>
                    <option value='library'>Library</option>
                    <option value='museum'>Museum</option>
                    <option value='park'>Park</option>
                </select>
            </div>
        
            {place}
        </>
    )
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(FamilyFun)