import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './food.css'

const Food = (props) => {
    const[selection, setSelection] = useState()

    return (
        <div>
            <select className='foodDropDown' name='selected'>
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