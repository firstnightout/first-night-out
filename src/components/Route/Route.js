import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './route.css'

const Route = (props) => {

    return(
        <div className='routeMain'>
            <div className='routeScreen'>
                <span className='myRoute'>My Route</span>
                <Link to='/map' className='mapRoute'><span className='goCont'>GO</span></Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Route)