import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './nightLife.css'

const NightLife = (props) => {
    const[selection, setSelection] = useState()

    return (
        <div>
            <select className='nightLifeDropDown' name='selected'>
                <option value='empty'></option>
                <option value='Bar'>Bar</option>
                <option value='Casino'>Casino</option>
                <option value='Night_Club'>Night Club</option>
            </select>
        </div>
    )
 }
const mapStateToProps = state => state

export default connect(mapStateToProps)(NightLife)