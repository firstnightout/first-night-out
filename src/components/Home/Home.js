import React, {useState} from 'react'
import {OutlinedInput} from '@material-ui/core';
// import {connect} from 'react-redux'
// import {login} from '../../ducks/reducer'

const UserLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <OutlinedInput
                id='usernameInput'
                autoFocus={true}
                notched={true}
                labelWidth={30}
                placeholder='Username'
                margin='dense'
                onChange={(e) => setUsername(e.target.value)}
            />

            <OutlinedInput
                id='passwordInput'
                autoFocus={true}
                notched={true}
                labelWidth={30}
                placeholder='Password'
                margin='dense'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    )
}

// const mapStateToProps = state => state

export default UserLogin


// export default connect(mapStateToProps, {login})(UserLogin)