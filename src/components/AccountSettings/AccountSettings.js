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
        let username = props.user.username;
        //GET THE FILE CURRENTLY IN STATE
        //IT UPLOADS THE PHOTO AND OVERWRITES WHAT WAS PREVIOUSLY STORED IN THE DATABASE
        const update = storage.ref(`profile-pictures/${username}`).put(profilePic);
        update.on("state_changed", () => null, (err) => console.log(err), ()=> {
            storage.ref(`profile-pictures/${username}`).getDownloadURL().then( downLoadURL => {
                axios.post(`/auth/set/profile`, { downloadURL: downLoadURL , userID: props.user.userId }).then(()=>{
                    //THEN IT REDIRECT BACK TO ACCOUNT
                    setRedir(true);
                })
            })
        })
    }
    return(
        <>  
            <Nav />
            <div className='account-settings'>
                <span className=''>Change Profile Picture</span>
                <span className='change-profile-pic'><input type='file' onChange={ handleChange } /></span><br />
                <span className='save-preferences'><button onClick={handleClick} >Save Changes</button></span>
            </div>
        </>
    )
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(AccountSettings);