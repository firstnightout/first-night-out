import React  from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { updateFirstName, updateLastName, updateUsername, updatePassword } from '../../ducks/reducer'
import './register.css'




const Register = (props) => {
   

    const handleUpdate = (e) => {
    switch(e.target.name){
        case 'firstName': 
            props.updateFirstName(e.target.value);
            break
        case 'lastName':
            props.updateLastName(e.target.value);
            break
        case 'username':
            props.updateUsername(e.target.value);
            break
        case 'password':
            props.updatePassword(e.target.value);
            break
        default:
            return ;
    }
}



    return (
        <div className='register-page-1'>

                <img 
                    src="https://s3.us-east-2.amazonaws.com/first-night-out/FNO-main-logo.png" 
                    alt="first-night-out-logo" 
                    className="reg-logo"
                />

                <input value={props.firstName} name='firstName' onChange={ handleUpdate } placeholder=' first Name' className='reg-input' />
                <input value={props.lastName} name='lastName' onChange={ handleUpdate } placeholder=' last Name' className='reg-input' />
                <input value={props.username} name='username' onChange={ handleUpdate } placeholder=' username' className='reg-input' />
                <input value={props.password} name='password' onChange={ handleUpdate } placeholder=' password' className='reg-input' type='password' />

                <div>
                    <Link to="/auth/register-2"><button className="reg-button">continue</button></Link>
                </div>

                
                <Link to="/"><button className="cancel-btn">cancel</button></Link>                 
        </div>
    ) 
}

const mapStateToProps = (state) => {
    const { firstName, lastName, username, password } = state;
    return {
        firstName,
        lastName, 
        username, 
        password
    }
}
export default connect(mapStateToProps, {  updateFirstName, updateLastName, updateUsername, updatePassword })(Register);




