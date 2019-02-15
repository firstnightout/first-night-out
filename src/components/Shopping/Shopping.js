import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './shopping.css'

const Shopping = (props) => {
    const[selection, setSelection] = useState()

    return (
        <div>
            <select className='shoppingDropDown' name='selected'>
                <option value='empty'></option>
                <option value='Book_Store'>Book Store</option>
                <option value='Clothing_Store'>Clothing Store</option>
                <option value='Shopping_Mall'>Shopping Mall</option>
                <option value='Shoe_Store'>Shoe Store</option>
                <option value='Store'>Store</option>
            </select>
        </div>
    )
 }


const mapStateToProps = state => state

export default connect(mapStateToProps)(Shopping)