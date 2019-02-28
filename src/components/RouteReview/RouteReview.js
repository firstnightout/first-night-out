import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import MiniPlace from '../MiniPlace/MiniPlace';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import {resetPlaces} from '../../ducks/reducer'
import Nav from '../Nav/Nav';
import './RouteReview.css'

const RouteReview = (props) => {
    const [routes, setRoutes] = useState(null);
    const [redirect, setRedirect] = useState(false);
    //WHEN THE ROUTEREVIEW COMPONENT MOUNTS WE RENDER MINIPLACES FOR EACH STOP ON THE ROUTE
    useEffect(() => {
        setRoutes(props.places.map(val => {
            return <MiniPlace place_id={val.id} photo={val.photo} />
        }))
    }, []);
    //WHEN THEY CONFIRM THE ROUTE, WE STORE ALL THE DATA IN THE DATABASE
    const handleClick = () => {
        axios.post('/api/places/details', {placeid: props.places[0].id}).then(place1 => {
            //HERE WE LOOK AT THE FIRST PLACE, AND WE GET THE CITY OFF OF THAT TO INDEX THE ROUTE UNDER THAT CITY.
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
            //HERE WE ACTUALLY PUT THE DATA IN THE DATABASE
            axios.post('/api/places/details', {placeid: props.places[1].id}).then(place2 => {
                axios.post('/api/places/details', {placeid: props.places[2].id}).then(place3 => {
                    axios.post('/api/create/route', {
                        place1: place1.data.result,
                        place2: place2.data.result,
                        place3: place3.data.result,
                        userID: 4, //FIX THIS TO BE THE USER ON SESSION
                        creationDate: moment().format('l'),
                        isPublic: true,
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
            <br />
            <button onClick={handleClick} className='submitRouteButton'>Create Route</button>
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {resetPlaces})(RouteReview)