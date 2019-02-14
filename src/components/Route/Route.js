import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Route = (props) => {

    return(
        <div className='routeMain'>
            <div className='routeScreen'>
                <p>My Route</p>
                <Link to='/map' className='mapRoute'>GO</Link>
                
            </div>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Route)