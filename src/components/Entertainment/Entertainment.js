import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './entertainment.css'

const Entertainment = (props) => {
    const[selection, setSelection] = useState()

    const handleChange = (e) => {
        setSelection(e.target.value);
    }

return (
    <div className='entertainmentWrapper'>
        <select className='entertainmentDropDown' name='selected' onChange={handleChange}>
            <option value='empty'></option>
            <option value='Amusement Park'>Amusement Park</option>
            <option value='Aquarium'>Aquarium</option>
            <option value='Movie Theatre'>Movie Theatre</option>
            <option value='Zoo'>Zoo</option>
        </select>
    </div>
)
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Entertainment)