import React, {useState} from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {register} from '../../ducks/reducer'
import './register.css'

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
        switch(e.target.name) {
            case 'firstName': 
                setFirstName(e.target.value)
                break
            case 'lastName':
                setLastName(e.target.value)
                break
            case 'username':
                setUsername(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            case 'address':
                setAddress(e.target.value)
                break
            case 'city':
                setCity(e.target.value)
                break
            case 'state':
                setState(e.target.value)
                break
            case 'zip':
                setZip(e.target.value)
                break
            case 'profilePic':
                setProfilePic(e.target.value)
                break
        }
    }

    const handleRegister = () => {
        props.register(firstName,lastName,username,password,address,city,state,zip,profilePic)
    }

    return (
        <div className='registerMainCont'>
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
                <button onClick={handleRegister} 
                    className='sign-up'>Sign up</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {register})(Register)
