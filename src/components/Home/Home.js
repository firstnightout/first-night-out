import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MiniRoute from '../MiniRoute/MiniRoute'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './Home.css'
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';


const Home = (props) => {
    //REMEMBER TO HIDE API KEY LATER
    const [nearbyRoutes, setNearbyRoutes] = useState([]);
    //COMMENTED TO SAVE API REQUESTS
    useEffect(() => {
        axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ').then(currLocation => {
            const {lat, lng} = currLocation.data.location;
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ`).then(currPlace => {
                let cityNameIndex = currPlace.data.results[0].address_components.findIndex(val => val.types.includes('locality') || val.types.includes('sublocality'));
                let city = currPlace.data.results[0].address_components[cityNameIndex].long_name
                axios.get('/api/routes/city/' + city)
                .then( response => {
                    let routes = response.data.sort((a, b) => b.likes - a.likes).map( route =>  <MiniRoute likes={route.likes} user_id={route.userID} place1={route.place1} place2={route.place2} place3={route.place3} routeID={route.routeID}/>)
                    setNearbyRoutes(routes);
                })
            })
        })
    }, []);
    
    return(
        <>
        <Nav />
        <div className='home'>
            <Carousel
            animationSpeed={2000}
            autoPlay={5000}
            stopAutoPlayOnHover
            centered
            infinite>
                <img className='carousel-img' alt='' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/restaurant-picture-1.jpg?alt=media&token=140b8892-a6e0-4b55-9b79-ac1585e98cb9`} />
                <img className='carousel-img' alt='' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/bar-1.jpg?alt=media&token=337920c8-9353-4914-b56d-b8259c5e3020`} />
                <img className='carousel-img' alt='' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/zoo-1.jpg?alt=media&token=af6666a2-a219-4ae2-9da2-9225200f0d48`} />
                <img className='carousel-img' alt='' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/restaurant-2.jpg?alt=media&token=d12a1d52-1a26-4a82-b988-8ca54d90e9b4`} />
                {/* <img className='carousel-img' alt='' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/bar-2.jpg?alt=media&token=bc638ff9-9f76-4158-b303-6e13411da981`} /> */}
                <img className='carousel-img' alt='' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/spa-1.jpg?alt=media&token=95c951ea-b4c1-403f-abbd-fe2d469d341d`} />
            </Carousel>
            {nearbyRoutes}
        </div>
        </>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Home);