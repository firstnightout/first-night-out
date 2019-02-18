import React, {useEffect, useState} from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './venue.css';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'
import {addPlaceToRoute} from '../../ducks/reducer';
import {connect} from 'react-redux';

const VenueCard = (props) => {
    const [restaurantName, setRestaurantName] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [openStatus, setOpenStatus] = useState(null)
    const [carouselImages, setCarouselImages] = useState(null);
    const [rating, setRating] = useState(null)
    const [priceLevel, setPriceLevel] = useState(null)
    const [notFoundImg, setNotFound] = useState(null);
    const [redirectToggle, setRedirect] = useState(false); 
    //<i class="fas fa-star"></i>    full star
    //<i class="fas fa-star-half-alt"></i>  half star

    useEffect(() => {
        axios.post('/api/places/details', {placeid: props.match.params.id})
        .then(response => {
            console.log(response);
            setRestaurantName(response.data.result.name);
            setPhoneNumber(response.data.result.formatted_phone_number);
            if(response.data.result.opening_hours) {
                if(response.data.result.opening_hours.open_now) {
                    setOpenStatus(<span className="open">Open</span>)
                } else {
                    setOpenStatus(<span className="close">Closed</span>)
                }
            }
            if(response.data.result.photos) {
                setCarouselImages(response.data.result.photos.map(val => {
                    return <img className='img-dimensions' src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${val.photo_reference}&maxheight=200&key=AIzaSyB3hkAtDj8ZZK9ptagSp_YqQouPEMcuaCo`}/>
                }))
            } else {
                setNotFound(<img className='img-dimensions' src='https://s3.us-east-2.amazonaws.com/first-night-out/placeholder_img.png' />)
            }
            setRating(Math.round(response.data.result.rating))
            setPriceLevel(response.data.result.price_level)
        })
    }, []);

    // let rating = stars.map( star => <i className="fas fa-star"></i>);
    let stars = [];
    for(let i = 0; i < rating; i++) {
        stars.push(<i className="fas fa-star"></i>)
    }
    let price = '$'.repeat(priceLevel);

    const doReduxStuff = () => {
        props.addPlaceToRoute(props.match.params.id);
        setRedirect(true);
    }

    if(redirectToggle) {
        return <Redirect to='/categories' />
    }

    return (
        <div className="venue-container">
            <div className="content-container">
                <Carousel
                stopAutoPlayOnHover
                centered
                infinite>
                    {carouselImages}
                </Carousel>
                {notFoundImg}
            </div>

            <div className="info-container">
                <h1>{restaurantName}</h1>
                <p>{ stars }</p>
                <p>{price}</p>
                <p><span>Hours: </span>{openStatus}</p>
                <p><span>Phone: </span>{phoneNumber}</p>
                <button className="add-btn" onClick={doReduxStuff}>Add to route</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {addPlaceToRoute})(VenueCard);