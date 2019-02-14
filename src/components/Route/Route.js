import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Route = (props) => {

    const route = props.routes.map(route => {
        return (
            <div className='routeWrapper'>
                <div>
                    <img src={route.img} key={route.id}/>
                </div>
                <div>
                    <span>{route.venueName}</span>
                    <span>{route.venueAddress}</span>
                    <span>{route.rating}</span>
                </div>
            </div>
        )
    })

    return(
        <div>
            <div className='routeScreen'>
                <p>My Route</p>
                <Link to='/map' className='mapRoute'>GO</Link>
                {route}
            </div>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Route)