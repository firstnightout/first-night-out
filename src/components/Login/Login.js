import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './login.css'
import { login } from '../../ducks/reducer';



//ONLY MOBILE VIEW COMPATIBLE
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
        <div className='login-container'>

                <img 
                    src="https://s3.us-east-2.amazonaws.com/first-night-out/FNO-main-logo.png" className='login-logo' 
                    alt='first night out logo'
                />
            {/* <div className='buttonCont'>
                <button className='login-button' onClick={handleLogin}>Login</button>
                <Link to='/auth/register'><button className='register-button'>Register</button></Link> 
            </div>
            <div className='buttonCont2'>
                <button className='passportButton'>Login with Passport</button>
                <button className='googleButton'>Login with Google</button>

            </div> */}
            
                    <input  
                        onChange={handleUpdates} 
                        placeholder=' username' 
                        name='username'
                        className="login-input"
                    />
                    <input  
                        onChange={handleUpdates} 
                        placeholder=' password' 
                        type='password' 
                        name='password'
                        className="login-input"
                    />
                    {/* <Link to="/home"> */}
                    <button 
                    className="main-btn" 
                    onClick={ handleLogin}>
                    Login
                    </button>
                    {/* </Link> */}

                    <Link to="/auth/register-1"><button className="sign-up-btn">sign up</button></Link>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {login})(Login)
