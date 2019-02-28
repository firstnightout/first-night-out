import React, {useEffect, useState} from 'react';
import './Account.css'
import {Link} from 'react-router-dom'
import Nav from '../Nav/Nav';
import axios from 'axios';
import {connect} from 'react-redux';
import MiniRoute from '../MiniRoute/MiniRoute'
const Account = (props) => {
    const [profPicLink, setLink] = useState(null)
    const [userRoutes, setUserRoutes] = useState([]);
    //WE MAKE A REQUEST TO THE BACK END SENDING THE LOGGED IN USERS ID TO GET THEIR PROFILE PICTURE AS WELL AS ROUTES THEY HAVE POSTED
    useEffect(() => {
        axios.get('/auth/profile/' + props.user.userId).then(response => {
            setLink(response.data.profilePicture) //SET THE PROFILE PICTURE TO RENDER
            //WE SORT THE ROUTES THAT WERE SENT BACK BASED ON NUMBER OF LIKES
            setUserRoutes(response.data.routes.sort((a,b) => b.likes - a.likes).map(route => {
                //FOR EACH OF THE ROUTES THAT WERE SENT BACK WE RENDER A MINIROUTE COMPONENT
                return <MiniRoute likes={route.likes} user_id={route.userID} place1={route.place1} place2={route.place2} place3={route.place3} routeID={route.routeID}/>
            }))
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
                {userRoutes}
                <br />
            </div>
        </>
    )
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(Account);