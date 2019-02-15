import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './entertainment.css'

const Entertainment = (props) => {
    const[selection, setSelection] = useState()

return (
    <div>
        <select className='entertainmentDropDown' name='selected'>
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