import React, {useEffect, useState} from 'react';
// import SmilingMan from '../../images/smiling_man.png'
import './Account.css'
// import MiniRoute from '../MiniRoute/MiniRoute'
import {Link} from 'react-router-dom'
import Nav from '../Nav/Nav';
import axios from 'axios';
import {connect} from 'react-redux';
const Account = (props) => {
    const [profPicLink, setLink] = useState(null)
    const [userRoutes, setUserRoutes] = useState([]);
    useEffect(() => {
        axios.get('/auth/profile/' + props.user.userId).then(response => {
            setLink(response.data)
        }).catch(err => console.log(err))
    }, [])
    return (
        <>
            <Nav />
            <div className='account'>
                <div className='prof-pic-container'>
                    <img className='profile-picture' alt='' src={profPicLink} />
                </div>
            </div>
            <div className='center-button'>
                <Link to='/account/settings'><button className='profile-settings-button'>Change Picture</button></Link>
            </div>
            <br />
            <div className='gray-background'>
                <div className='my-routes-text'>
                    <h3>My Routes</h3>
                </div>

                <br />
            </div>
        </>
    )
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(Account);