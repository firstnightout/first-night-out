import React, { useState, useEffect } from 'react';
import './AccountSettings.css'
import {Link, Redirect} from 'react-router-dom'
import Nav from '../Nav/Nav';
import { storage } from '../../firebase/index';
import axios from 'axios';
import {connect} from 'react-redux';

const AccountSettings = props => {
    //WILL PROBABLY HAVE TO CREATE A LOADING SCREEN IF WE WANT TO SEE INSTANT PICTURE UPDATES
    const [profilePic, setProfilePic] = useState(null);
    const [toggleRedir, setRedir] = useState(false);

    const handleChange = (e) => {
        setProfilePic(e.target.files[0])
    }

    useEffect(() => {
        if(toggleRedir) {
            return <Redirect to = '/account' />
        }
    }, toggleRedir);

    const handleClick = () => {
        console.log('here', toggleRedir)
        let username = props.user.username;
        console.log(1);
        const update = storage.ref(`profile-pictures/${username}`).put(profilePic);
        console.log(1);
        update.on("state_changed", () => null, (err) => console.log(err), ()=> {
        console.log(1);
            storage.ref(`profile-pictures/${username}`).getDownloadURL().then( downLoadURL => {
        console.log(1);
                axios.post(`/auth/set/profile`, { downloadURL: downLoadURL , userID: props.user.userId }).then(()=>{
                    // redirect
                    console.log('here', toggleRedir)
                    setRedir(true);
                })
            })
        })
    }
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
                <span className='change-profile-pic'><input type='file' onChange={ handleChange } /></span><br />
                <span className='save-preferences'><button onClick={handleClick} >Save Changes</button></span>
            </div>
        </>
    )
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(AccountSettings);