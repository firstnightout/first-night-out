import React, {useState} from 'react'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {handleLogin} from '../../ducks/reducer'
import './login.css'

const UserLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='loginCont'>
            <img src='' className='login-logo' alt='logo'/>
            <input className='username-login' onChange={(e) => setUsername(e.target.value)} placeholder='Username'
            />
            <input className='pass-login' onChange={(e) => setPassword(e.target.value)} placeholder='Password'
            />
            {/* <div>
                <button className='login-button onClick={() => props.handleLogin(username,password)}>Login</button>
                <Link to='/register'><button className='register-button'>Register</button></Link>
            </div> */}

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

// const mapStateToProps = state => state

export default UserLogin


// export default connect(mapStateToProps, {handleLogin})(UserLogin)