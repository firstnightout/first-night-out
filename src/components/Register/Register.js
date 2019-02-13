import React, {useState} from 'react'
import logo from '../../images/fno.png'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {register} from '../../ducks/reducer'
import './register.css'


// register needs to be broken up into two views.
// continue btn should navigate to the seond registraton page
// <Route path="/auth/register-2" component={ Register2 }/>



const Register = (props) => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [zip, setZip] = useState()
    const [profilePic, setProfilePic] = useState()

    const handleUpdate = (e) => {
        if(e.target.name === 'firstName') {
            setFirstName(e.target.value)
        }
        else if(e.target.name === 'lastName') {
            setLastName(e.target.value)
        }
        else if(e.target.name === 'username') {
            setUsername(e.target.value)
        }
        else if(e.target.name === 'password') {
            setPassword(e.target.value)
        }
        else if(e.target.name === 'address') {
            setAddress(e.target.value)
        }
        else if(e.target.name === 'city') {
            setCity(e.target.value)
        }
        else if(e.target.name === 'state') {
            setState(e.target.value)
        }
        else if(e.target.name === 'zip') {
            setZip(e.target.value)
        }
        else if(e.target.name === 'profilePic') {
            setProfilePic(e.target.value)
        }
    }

    const handleRegister = (firstName,lastName,username,password,address,city,state,zip,profilePic) => {
        props.register(firstName,lastName,username,password,address,city,state,zip,profilePic)
    }

    return (
        <div className='mainCont'>
            <div className='registerCont'>
                <span className='reg-title'>Account Registration</span>
                <input name='firstName' onChange={handleUpdate} placeholder='First Name' className='first-name'/>
                <input name='lastName' onChange={handleUpdate} placeholder='Last Name' className='last-name'/>
                <input name='username' onChange={handleUpdate} placeholder='Username' className='user-name'/>
                <input name='password' onChange={handleUpdate} placeholder='Password' type='password' className='reg-password'/>
                <input name='address' onChange={handleUpdate} placeholder='Address' className='reg-address'/>
                <input name='city' onChange={handleUpdate} placeholder='City' className='reg-city'/>
                <input name='state' onChange={handleUpdate} placeholder='State' className='reg-state'/>
                <input name='zip' onChange={handleUpdate} placeholder='Zip' className='reg-zip'/>
                <label className='label'>Select image for profile pic:</label>
                <input name='profilePic' onChange={handleUpdate} placeholder='Profile Picture' type='file' className='profile-pic'/>
                <button onClick={() => handleRegister(firstName,lastName,username,password,address,city,state,zip,profilePic)} 
                    className='sign-up'>Sign up</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {register})(Register)
