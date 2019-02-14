import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {login} from '../../ducks/reducer'
import './login.css'


const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleUpdates = (e) => {
        if(e.target.name === 'username') {
            setUsername(e.target.value)
        }
        else if(e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const handleLogin = () => {
        props.login(username,password)
    }

    return (
        <div className='loginCont'>
            <div className='imageCont'>
                
            </div>
            <div className='inputCont'>
                <input className='username-login' onChange={handleUpdates} placeholder='Username' name='username'
                />
                <input className='pass-login' onChange={handleUpdates} placeholder='Password' type='password' name='password'
                />
            </div>
            <div className='buttonCont'>
                <button className='login-button' onClick={handleLogin}>Login</button>
                <Link to='/auth/register'><button className='register-button'>Register</button></Link> 
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

const mapStateToProps = state => state

export default connect(mapStateToProps, {login})(Login)
