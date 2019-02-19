import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import MiniPlace from '../MiniPlace/MiniPlace';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import {resetPlaces} from '../../ducks/reducer'
import Nav from '../Nav/Nav';
const RouteReview = (props) => {
    const [routes, setRoutes] = useState(null);
    const [isPublic, setPublic] = useState(true);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        console.log(props)
        setRoutes(props.places.map(val => {
            return <MiniPlace place_id={val.id} photo={val.photo} />
        }))
    }, []);

    const handleChange = e => {
        setPublic(e.target.value);
    }

    const handleClick = () => {
        axios.post('/api/places/details', {placeid: props.places[0].id}).then(place1 => {
            let city = null;
            let addressParts = place1.data.result.address_components
            for(let i = 0; i < addressParts.length; i++) {
                if(addressParts[i].types.includes('locality')) {
                    if(addressParts[i].short_name) {
                        city = addressParts[i].short_name
                    } else {
                        city = addressParts[i].long_name
                    }
                    break;
                }
            }
            axios.post('/api/places/details', {placeid: props.places[1].id}).then(place2 => {
                axios.post('/api/places/details', {placeid: props.places[2].id}).then(place3 => {
                    console.log(place1, '\n', place2, '\n', place3);
                    axios.post('/api/create/route', {
                        place1: place1.data.result,
                        place2: place2.data.result,
                        place3: place3.data.result,
                        userID: 4, //FIX THIS TO BE THE USER ON SESSION
                        creationDate: moment().format('l'),
                        isPublic,
                        city //FIX THIS TO PRIORITIZE THE CITY THAT WAS SEARCHED
                    }).then(() => {
                        props.resetPlaces();
                        setRedirect(true);
                    }) 
                })
            })
        })
    }
    if(redirect) {
        return <Redirect to='/' />
    }
    return (
        <div>
        <Nav />
            {routes}
            <select onChange={handleChange}>
                <option value={true}>Public</option>
                <option value={false}>Private</option>
            </select>
            <br />
            <button onClick={handleClick}>Create Route</button>
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {resetPlaces})(RouteReview)