import React from 'react';
import './AccountSettings.css'
import {Link} from 'react-router-dom'
import Nav from '../Nav/Nav';

const AccountSettings = props => {
    return(
        <>  
            <Nav />
            <div className='preferences-back-button'>
                <Link to='/account'><button>Back</button></Link>
            </div>
            <div className='account-settings'>
                <span className='preference'><input type='checkbox' />Non-Alcoholic Filtering</span>
                <span className='preference'><input type='checkbox' />Family Friendly Filtering<br /></span><br />
                <span className=''>Change Profile Picture</span>
                <span className='change-hometown'><input className='hometown-input' placeholder='Change Hometown' /></span>
                <span className='change-profile-pic'><input type='file' /></span><br />
                <span className='save-preferences'><Link to='/account'><button>Save Changes</button></Link></span>
            </div>
        </>
    )
}

export default AccountSettings;