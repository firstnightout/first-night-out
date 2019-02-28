import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import './login.css'
import { login } from '../../ducks/reducer';
import swal from 'sweetalert'


//ONLY MOBILE VIEW COMPATIBLE
//CHECKS TO SEE IF THERE IS A USER THAT CORRESPONDS WITH THE INPUTTED DATA
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

    if (props.user.username) {
        //PROMPTS THE USER WITH A WELCOME MESSAGE ON A SUCCESSFUL LOGIN
        swal({
            title: 'Welcome',
            text: 'Successfully logged in',
            icon: 'success',
            timer: 1500,
            button: null
        })
        return <Redirect to='/home' />
    }
    
    return (
        <div className='login-container'>

                <img 
                    src="https://s3.us-east-2.amazonaws.com/first-night-out/FNO-main-logo.png" className='login-logo' 
                    alt='first night out logo'
                />
                    <input  //USERNAME
                        onChange={handleUpdates} 
                        placeholder=' username' 
                        name='username'
                        className="login-input"
                    />
                    <input  //PASSWORD
                        onChange={handleUpdates} 
                        placeholder=' password' 
                        type='password' 
                        name='password'
                        className="login-input"
                    />
                    <button 
                    className="main-btn" 
                    onClick={ handleLogin}>
                    Login
                    </button>
                    <Link to="/auth/register-1"><button className="sign-up-btn">Sign Up</button></Link> 
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {login})(Login)
