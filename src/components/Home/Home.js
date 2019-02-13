import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MiniPlace from './../MiniPlace/MiniPlace'
import MiniRoute from '../MiniRoute/MiniRoute'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './Home.css'

const Home = (props) => {
    //REMEMBER TO HIDE API KEY LATER
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    useEffect(() => {
        //Change the prompt to the address of the user on session and this will
        //Get the nearby places for the user
        let address = '500 S Ervay St, Dallas, TX';
        let temp = address.split(' ').join('+');
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${temp}&key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ`).then(response => {
            let {lat, lng} = response.data.results[0].geometry.location
            const location = `${lat},${lng}`;
            axios.post('/api/places/near', {location, radius: 500, type: 'restaurant'}).then(response2 => {
                console.log(response2.data.results);
                let renderArr = response2.data.results.map((val, i, arr) => {
                    console.log(val.photos);
                    if(val.photos) {
                        return <MiniPlace place_id={val.place_id} photo={val.photos[0].photo_reference} />
                    }
                    else {
                        return <MiniPlace place_id={val.place_id} />
                    }
                    //
                })
                setNearbyPlaces(renderArr);
            });
        })
    }, []);
    return(
        <div className='home'>
            <Carousel
            animationSpeed={2000}
            autoPlay={5000}
            stopAutoPlayOnHover
            centered
            infinite>
                <img className='carousel-img' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/restaurant-picture-1.jpg?alt=media&token=140b8892-a6e0-4b55-9b79-ac1585e98cb9`} />
                <img className='carousel-img' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/bar-1.jpg?alt=media&token=337920c8-9353-4914-b56d-b8259c5e3020`} />
                <img className='carousel-img' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/zoo-1.jpg?alt=media&token=af6666a2-a219-4ae2-9da2-9225200f0d48`} />
                <img className='carousel-img' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/restaurant-2.jpg?alt=media&token=d12a1d52-1a26-4a82-b988-8ca54d90e9b4`} />
                <img className='carousel-img' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/bar-2.jpg?alt=media&token=bc638ff9-9f76-4158-b303-6e13411da981`} />
                <img className='carousel-img' src={`https://firebasestorage.googleapis.com/v0/b/first-night-out.appspot.com/o/spa-1.jpg?alt=media&token=95c951ea-b4c1-403f-abbd-fe2d469d341d`} />
            </Carousel>
            {/* {nearbyPlaces} */}
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
            <MiniRoute />
        </div>
    )
}

export default Home;