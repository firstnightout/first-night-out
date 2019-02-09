import React, {useState} from 'react'
import {OutlinedInput} from '@material-ui/core';

const RegisterUser = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [username, setUsername] = useState()
    const [homeAddress, setHomeAddress] = useState()
    const [password, setPassword] = useState()

    return (
        <div>
            <div>
                <input onChange={(e) => setFirstName(e.target.value)} placeholder='First Name'/>
                <input onChange={(e) => setLastName(e.target.value)} placeholder='Last Name'/>
                <input onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
                <input onChange={(e) => setHomeAddress(e.target.value)} placeholder='Home Address'/>
                <input onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
            </div>
        </div>
    )
}

export default RegisterUser