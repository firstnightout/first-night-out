import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './spa.css'

const Spa = (props) => {
    const[selection, setSelection] = useState()


    const handleChange = (e) => {
        setSelection(e.target.value);
    }
    return (
        <div>
            <select className='spaDropDown' name='selected' onChange={handleChange}>
                <option value='empty'></option>
                <option value='Spa'>Spa</option>
                <option value='Beauty_Salon'>Beauty Salon</option>
            </select>
        </div>
    )
 }

const mapStateToProps = state => state

export default connect(mapStateToProps)(Spa)