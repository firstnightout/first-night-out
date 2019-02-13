import React from 'react';
import './MiniRoute.css';
const MiniRoute = (props) => {
    //WILL NEED MEDIA QUERIES TO DEAL WITH ABSOLUTE POSITIONING
    let places = [
        {
            image: 'https://www.denverarchitects.org/wp-content/uploads/2018/01/RestaurantArchitects_Denver_1-Izakaya-Den.jpg',
            name: "Good Restaurant",
            rating: 3
        },
        {
            image: "https://cdn.cnn.com/cnnnext/dam/assets/161221152712-new-restaurants-2017-attitude-at-avani-riverside-bangkok.jpg",
            name: "Fantastic Restaurant",
            rating: 4
        },
        {
            image: "https://cdn0.wideopeneats.com/wp-content/uploads/2018/06/mcdonalds-950x535.jpg",
            name: "Best Restaurant",
            rating: 5
        }
    ]
    let renderArr = places.map((element, i) => <img className={`mini-route-image-${i+1}`} src={element.image} />);
    return(
        <div className='mini-route'>
        <h1 className='mini-route-text mini-route-username'>Username</h1>
        <h3 className='mini-route-text mini-route-likes'>5 Likes</h3>
            {renderArr}
        </div>
    )
}

export default MiniRoute