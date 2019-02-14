import React from 'react';
import SmilingMan from '../../images/smiling_man.png'
import './Account.css'
import MiniRoute from '../MiniRoute/MiniRoute'
import {Link} from 'react-router-dom'

const Account = (props) => {

    return (
        <>
            <div className='account'>
                <div className='prof-pic-container'>
                    <img className='profile-picture' src={SmilingMan} />
                </div>
            </div>
            <div className='center-button'>
                <Link to='/account/settings'><button className='profile-settings-button'>Settings</button></Link>
            </div>
            <br />
            <div className='gray-background'>
                <div className='my-routes-text'>
                    <h3>My Routes</h3>
                </div>
                <MiniRoute />
                <MiniRoute />
                <MiniRoute />
                <br />
            </div>
        </>
    )
}

export default Account;