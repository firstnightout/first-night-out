import React, {useState} from 'react';
import { register } from '../../ducks/reducer';
import  "./register.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Register2 = (props) => {
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zip, setZip] = useState();
    const [profilePic, setProfilePic] = useState();

    const handleUpdate = (e) =>{
        switch (e.target.name) {
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
            default:
                break;
        }
    }

    const handleRegister = () => {
        props.register(address, city, state, zip, profilePic);
    }
    return (
        <div className="register-page-2">

            <Link to="/auth/register-1"><i className="fas fa-chevron-left"></i> </Link>

            <img 
                src="https://s3.us-east-2.amazonaws.com/first-night-out/FNO-main-logo.png" 
                alt="first-night-out-logo" 
                className="reg-logo"
            />


            <input name='address' onChange={handleUpdate} placeholder='Address' className='reg-input'/>
            <input name='city' onChange={handleUpdate} placeholder='City' className='reg-input'/>
            <input name='state' onChange={handleUpdate} placeholder='State' className='reg-input'/>
            <input name='zip' onChange={handleUpdate} placeholder='Zip' className='reg-input'/>

            <input 
                type="file" 
                name="file" 
                id="file" 
                class="inputfile" 
                onChange={handleUpdate}
            />
            <label for="file"><i className="fas fa-camera"></i></label> 
            
            <button onClick={handleRegister} className='reg-button'>Sign up</button>
        </div>
    )
}


const mapStateToProps = state => state;
export default connect(mapStateToProps, {register})(Register2);
