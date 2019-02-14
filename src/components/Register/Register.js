import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {register} from '../../ducks/reducer'
import './register.css'


// register needs to be broken up into two views.
// continue btn should navigate to the seond registraton page
// <Route path="/auth/register-2" component={ Register2 }/>


// all of the funtionality from the two register components needs to be strored inside of redux.
// get rid of all of the hooks and store the user info inside of the reducer. 


const Register = (props) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    
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
            default:
                return ;
        }
    }

    // const handleRegister = () => {
    //     props.register(firstName,lastName,username,password);
    // }

    return (
        <div className='register-page-1'>

                <img 
                    src="https://s3.us-east-2.amazonaws.com/first-night-out/FNO-main-logo.png" 
                    alt="first-night-out-logo" 
                    className="reg-logo"
                />

                <input name='firstName' onChange={handleUpdate} placeholder='First Name' className='reg-input'/>
                <input name='lastName' onChange={handleUpdate} placeholder='Last Name' className='reg-input'/>
                <input name='username' onChange={handleUpdate} placeholder='Username' className='reg-input'/>
                <input name='password' onChange={handleUpdate} placeholder='Password' type='password' className='reg-input'/>

                <div>
                    <Link to="/auth/register-2"><button className="reg-button">continue</button></Link>
                </div>

                
                <Link to="/"><button className="cancel-btn">cancel</button></Link>                 
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {register})(Register);