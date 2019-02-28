import React, {useState}  from 'react';
import {  updateAddress, updateCity, updateState, updateZip, updateProfilePic } from '../../ducks/reducer';
import  "./register.css";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {storage} from '../../firebase'
import swal from 'sweetalert'


//REGISTER FIELDS
const Register2 = (props) => {
    const [toggle, setToggle] = useState(false);
    const handleUpdate = (e) =>{
        switch (e.target.name) {
            case 'address':
                props.updateAddress(e.target.value);
                break
            case 'city':
                props.updateCity(e.target.value);
                break
            case 'state':
                props.updateState(e.target.value);
                break
            case 'zip':
                props.updateZip(e.target.value);
                break
            case 'file':
                props.updateProfilePic(e.target.files[0]);
                break
            default:
                break;
        }
    }


    //GRAB ALL THE DATA FROM THE REGISTRATION AND CREATE A NEW USER IN THE DATABASE WITH THE DATA
    //THEN REDIRECT TO HOME
    const submitRegister = () => {
        const { firstName, lastName, username, password, address, city, st, zip, profilePic } = props;
            axios.post("/api/auth/register",{firstName, lastName, username, password, address, city, state: st, zip})
                .then( response => {
                    const upload = storage.ref(`profile-pictures/${username}`).put(profilePic);
                    upload.on('state_changed', () => null, (err) => console.log(err), () => {
                        storage.ref(`profile-pictures/${username}`).getDownloadURL().then(downloadURL => {
                            axios.post('/auth/set/profile', {userID: response.data.userId, downloadURL}).then(() => {
                                setToggle(true) 
                            })
                        })
                    })
                }).catch( err => console.log(err))

                swal({
                    title: 'Register',
                    text: 'Registration successful',
                    icon: 'success',
                    timer: 1500,
                    button: null
                })
    }

                    // setToggle(true);
   



    return (
        <div className="register-page-2">
            {toggle && <Redirect to='/home' />}
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
                className="inputfile" 
                onChange={handleUpdate}
            />
            <label for="file"><i className="fas fa-camera"></i></label> 
            
            <button onClick={submitRegister} className='reg-button'><Link to='/home'>Sign up</Link></button>
        </div>
    )
}


const mapStateToProps = state => state;
export default connect(mapStateToProps, { updateAddress, updateCity, updateState, updateZip, updateProfilePic })(Register2);
