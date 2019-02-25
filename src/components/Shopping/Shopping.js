import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
// import {} from '../../ducks/reducer'
import './shopping.css'
import axios from 'axios';
import MiniPlace from "../MiniPlace/MiniPlace";
import Nav from '../Nav/Nav';


const Shopping = (props) => {
    const[selection, setSelection] = useState(['book_store']);
    const [places, setPlaces] = useState(null);
    // const [pageToken, setPageToken] = useState(null);

    useEffect(()=> {
        let formatAdd = props.user.address.split(' ').join('+') + `,+${props.user.city}+,${props.user.state}`
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GCLOUD_GEOCODING_API}&address=${formatAdd}`).then(location => {
            axios.post('/api/places/near', { location: `${location.data.results[0].geometry.location.lat},${location.data.results[0].geometry.location.lng}`, radius: 5000, type: selection[0] })
            .then( response => {
                console.log(response);
                setPlaces(null)
                // setPageToken(response.data.next_page_token)
                setPlaces(response.data.results.map( val => {
                    return val.photos ?  <MiniPlace key={val.place_id} place_id={val.place_id} photo={ val.photos[0].photo_reference }/> : <MiniPlace key={val.place_id} place_id={val.place_id}/> 
                }));
            }).catch(err => setPlaces(null))
        })
    }, selection)

    const handleChange = (e) => {
        setSelection([e.target.value]);
    }

    // const loadMoreResults = () => {
    //     axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=' + pageToken + '&key=AIzaSyB3hkAtDj8ZZK9ptagSp_YqQouPEMcuaCo').then(response => {
    //         console.log(response);
    //     })
    // }

    return (
        <>
            <Nav />
            <button onClick={() => props.history.goBack()}>Back</button>
            <div className='shoppingWrapper'>
                <select className='shoppingDropDown' name='selected' onChange={handleChange}>
                    <option value='book_store'>Book Store</option>
                    <option value='clothing_store'>Clothing Store</option>
                    <option value='shopping_mall'>Shopping Mall</option>
                    <option value='shoe_store'>Shoe Store</option>
                    <option value='store'>Store</option>
                </select>
            </div>
            { places }
            {/* <button onClick={loadMoreResults}>Load More Results</button> */}
        </>
    )
 }


const mapStateToProps = state => state

export default connect(mapStateToProps)(Shopping)