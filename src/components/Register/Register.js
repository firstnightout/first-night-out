import React, {useState} from 'react'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {handleRegister} from '../../ducks/reducer'
import './register.css'

const RegisterUser = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [username, setUsername] = useState()
    const [homeAddress, setHomeAddress] = useState()
    const [password, setPassword] = useState()

    return (
        <div className='mainCont'>
            <div className='registerCont'>
                <input onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' className='first-name'/>
                <input onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' className='last-name'/>
                <input onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='user-name'/>
                <input onChange={(e) => setHomeAddress(e.target.value)} placeholder='Home Address' className='home-address'/>
                <input onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='reg-password'/>
                {/* <button onClick={() => props.handleRegister(firstName,lastName,username,homeAddress,password)}>Sign up</button> */}
            </div>
        </div>
    )
}

// const mapStateToProps = state => state

export default RegisterUser


// export default connect(mapStateToProps, {handleRegister})(RegisterUser)