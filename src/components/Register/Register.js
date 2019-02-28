import React  from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { updateFirstName, updateLastName, updateUsername, updatePassword } from '../../ducks/reducer'
import './register.css'




const Register = (props) => {
   
    //UPDATES THE VALUES IN REDUX
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
                {/* REGISTER INPUT FIELDS */}
                <input value={props.firstName} name='firstName' onChange={ handleUpdate } placeholder='First Name' className='reg-input' />
                <input value={props.lastName} name='lastName' onChange={ handleUpdate } placeholder='Last Name' className='reg-input' />
                <input value={props.username} name='username' onChange={ handleUpdate } placeholder='Username' className='reg-input' />
                <input value={props.password} name='password' onChange={ handleUpdate } placeholder='Password' className='reg-input' type='password' />

                <div>
                    <Link to="/auth/register-2"><button className="reg-button">continue</button></Link> {/*TAKES USER TO PAGE 2 OF REGISTER */}
                </div>

                
                <Link to="/"><button className="cancel-btn">Cancel</button></Link>                 
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




