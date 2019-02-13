import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MiniRoute from './../MiniRoute/MiniRoute'

const Home = (props) => {
    //REMEMBER TO HIDE API KEY LATER
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    useEffect(() => {
        //Change the prompt to the address of the user on session and this will
        //Get the nearby places for the user
        let address = '500 S Ervay St, Dallas, TX';
        let temp = address.split(' ').join('+');
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${temp}&key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ`).then(async response => {
            let {lat, lng} = response.data.results[0].geometry.location
            const location = `${lat},${lng}`;
            axios.post('/api/places/near', {location, radius: 500}).then(response2 => {
                setNearbyPlaces(response2.data.results);
            });
        })
    }, []);
    return(
        <div>
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
        </div>
    )
}

export default Home;