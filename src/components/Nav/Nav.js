import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {resetUser,getUser} from '../../ducks/reducer'
import './nav.css';

const Nav = (props) => {
    // const hideNavPaths = ['/account'];
    const [toggle, setToggle] = useState([false])
    const [toggleLinks, setToggleLinks] = useState(false)
    const [toggleOpacity, setToggleOpacity] = useState(false)
    //USING THE NAV COMPONENT WE GET THE USERS INFO ON REFRESH
    useEffect (() => {
        props.getUser()
    },[])

    //WHEN THE NAV COMPONENT IS OPENED WE SELECT THE BODY TAG AND WE APPLY THE no-scroll CLASS, MAKING USERS UNABLE TO SCROLL WHILE THE MENU IS OPEN
    //THIS CLASS IS REMOVED ONCE THE MENU CLOSES.
    useEffect(() => {
        if(toggle[0]) {
            document.getElementsByTagName('body')[0].classList.add('no-scroll')
        } else {
            document.getElementsByTagName('body')[0].classList.remove('no-scroll')
        }
    }, toggle)
    //HERE WE DELAY DISPLAYING THE DATA IN THE NAV SO THAT IT DOESNT POP UP UNTIL THE NAV IS FULLY OPENED
    const handleToggle = (e) => {
        setToggle([!toggle[0]])
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
                <span className='usernameNav'>{props.user.username}</span>
            </div>
            {/* HERE WE RENDER THE NAV */}
            {toggle[0] ? 
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

export default connect(mapStateToProps, {resetUser,getUser})(Nav)