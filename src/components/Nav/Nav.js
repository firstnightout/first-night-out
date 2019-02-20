import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {resetUser} from '../../ducks/reducer'
import './nav.css';

const Nav = (props) => {

    const hideNavPaths = ['/account'];
    const [toggle, setToggle] = useState(false)
    const [toggleLinks, setToggleLinks] = useState(false)
    const [toggleOpacity, setToggleOpacity] = useState(false)

    const handleToggle = (e) => {
        setToggle(!toggle)
        if(e.target.value === 'logout') {
            props.resetUser();
            axios.delete('/api/auth/signout')
        }
        setTimeout(() => {
            setToggleLinks(!toggleLinks)
            
        }, 400);

        setTimeout(() => {
            setToggleOpacity(!toggleOpacity)
        }, 500);
    }
    return (
        <div>
            <div className='navBarMain'>
                <i className="fas fa-bars" onClick={handleToggle}></i>
                {/* <span>{props.users[0].username}</span> */}
            </div>

            {toggle ? 
                <nav className='navDropDownMenu'>
                    {toggleOpacity &&
                        <div className='opacBar' onClick={handleToggle}></div>}
                    {toggleLinks &&
                        <div className='navDropDownMenuText'>
                            <div className='navPopOutHeader'>
                                <button onClick={handleToggle} className='exitButton'>X</button>
                            </div>
                            <img src='https://s3.us-east-2.amazonaws.com/first-night-out/ham-logo.png' className='navLogo' alt='logo'/>
                            <div className='accountImgDiv'>
                                <i className="fas fa-user-alt"></i>
                                <Link to='/account' className='accountLink' onClick={handleToggle}>Account</Link>
                            </div>
                            <div className='createDiv'>
                                <i className="fas fa-plus"></i>
                                <Link to='/categories' className='createLink' onClick={handleToggle}>Create Route</Link>
                            </div>
                            <div className='searchImgDiv'>
                                <i className="fas fa-search"></i>
                                <Link to='/search' className='searchLink' onClick={handleToggle}>Search</Link>
                            </div>
                            <div className='homeImgDiv'>
                                <i className="fas fa-home"></i>
                                <Link to='/home' className='homeLink' onClick={handleToggle}>Home</Link>
                            </div>
                            <Link to='/'><button className='logoutButton' value='logout' onClick={handleToggle}>logout</button></Link>
                        </div>
                    }
                </nav>
                    :
                <nav className='hideNavDropDownMenu'/>
            }
        </div>
    )
}


const mapStateToProps = state => state

export default connect(mapStateToProps, {resetUser})(Nav)