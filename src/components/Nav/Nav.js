import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './nav.css'
import tempimage from '../../images/fno.png'

const Nav = (props) => {

    const hideNavPaths = ['/account'];
    const [toggle, setToggle] = useState(false)
    const [toggleLinks, setToggleLinks] = useState(false)

    const handleToggle = () => {
        setToggle(!toggle)
    
        setTimeout(() => {
            setToggleLinks(!toggleLinks)
            
        }, 750);
    }
    return (
        <div>
            <div className='navBarMain'>
                <i className="fas fa-bars" onClick={handleToggle}></i>
                {/* <span>{props.users[0].username}</span> */}
            </div>

            {toggle ? 
                <nav className='navDropDownMenu'>
                    {toggleLinks ?
                        <div className='navDropDownMenuText'>
                            <div className='navPopOutHeader'>
                                <button className='exitButton'>x</button>
                            </div>
                            <img src={tempimage} className='navLogo'/>
                            <div className='accountImgDiv'>
                                <i className="fas fa-user-alt"></i>
                                <Link to='/account' className='accountLink'>Account</Link>
                            </div>
                            <Link to='route' className='createLink'>Create Route</Link>
                            <div className='searchImgDiv'>
                                <i className="fas fa-search"></i>
                                <Link to='search' className='searchLink'>Search</Link>
                            </div>
                            <div className='homeImgDiv'>
                                <i className="fas fa-home"></i>
                                <Link to='home' className='homeLink'>Home</Link>
                            </div>
                            <Link to='/'><button className='logoutButton'>logout</button></Link>
                        </div>
                    : null}
                </nav>
                    :
                <nav className='hideNavDropDownMenu'/>
            }
        </div>
    )
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(Nav)