import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './food.css'

const Food = (props) => {
    const[selection, setSelection] = useState()

    const handleChange = (e) => {
        setSelection(e.target.value);
    }

    return (
        <div className='foodWrapper'>
            <select className='foodDropDown' name='selected' onChange={handleChange}>
                <option value='empty'></option>
                <option value='bakery'>Bakery</option>
                <option value='cafe'>Cafe</option>
                <option value='meal_delivery'>Meal Delivery</option>
                <option value='meal_takeaway'>Meal Takeaway</option>
                <option value='restaurant'>Restaurant</option>
            </select>
        </div>
    )









}


const mapStateToProps = state => state

export default connect(mapStateToProps)(Food)