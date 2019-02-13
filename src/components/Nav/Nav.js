import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './nav.css'

const Nav = () => {

    return (
        <div>
            <div>
                <i className="fas fa-bars"></i>
                <span>{props.users[0].username}</span>
            </div>
            <div>
                <img src={props.users[0].profilePic} className='navUserImg'/>
            </div>
        </div>
    )
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(Nav)