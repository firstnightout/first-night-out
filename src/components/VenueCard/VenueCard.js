import React from 'react';
import './venue.css';

const VenueCard = () => {

    //<i class="fas fa-star"></i>    full star
    //<i class="fas fa-star-half-alt"></i>  half star

    let stars = [1,1,1,1,1]
    let rating = stars.map( star => <i className="fas fa-star"></i>);
    return (
        <div className="venue-container">
            <div className="content-container">
                <img 
                    src="https://s3.us-east-2.amazonaws.com/first-night-out/placeholder_img.png"
                    alt="placeholder"
                    className="img-dimentions"
                />
            </div>

            <div className="info-container">
                <h1>Resturant Name</h1>
                <p>{ rating }</p>
                <p>$$$$</p>
                <p><span>Hours: </span><span className="open">open</span></p>
                <p><span>Phone: </span>(841) 552-6987</p>

                <button className="add-btn">Add to route</button>
            </div>
        </div>
    )
}

export default VenueCard;