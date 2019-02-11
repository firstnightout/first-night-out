import React, {useState} from 'react'
import logo from '../../images/fno.png'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {handleLogin} from '../../ducks/reducer'
import './login.css'


const UserLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleUpdates = (e) => {
        if(username) {
            setUsername(e.target.value)
        }
        else if(password) {
            setPassword(e.target.value)
        }
    }

    // const handleLogin = (username,password) => {

    // }

    return (
        <div className='loginCont'>
            <div className='imageCont'>
                <img src={logo} className='login-logo' alt='logo'/>
            </div>
            <div className='inputCont'>
                <input className='username-login' onChange={handleUpdates} placeholder='Username'
                />
                <input className='pass-login' onChange={handleUpdates} placeholder='Password'
                />
            </div>
            <div className='buttonCont'>
                    <button className='login-button'> {/*onClick={this.handleLogin(username,password)}*/}Login</button>
                    <button className='register-button'>Register</button>
                {/* <Link to='/register'></Link> */}
            </div>
            <div className='buttonCont2'>
                <button className='passportButton'>Login with Passport</button>
                <button className='googleButton'>Login with Google</button>

            </div>
            
            {username ? <span className='username-label'>Username</span>
            :
            null
            }

            {password ? <span className='password-label'>Password</span>
            :
            null
            }   
        </div>
    )
}

{/* const mapStateToProps = state => state */}

export default UserLogin

{/* export default connect(mapStateToProps, {handleLogin})(Login) */}