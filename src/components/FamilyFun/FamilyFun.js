import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './familyFun.css'

const FamilyFun = (props) => {
    const[selection, setSelection] = useState()

    return (
        <div>
            <select className='familyFunDropDown' name='selected'>
                <option value='empty'></option>
                <option value='Art_Gallery'>Art Gallery</option>
                <option value='Bowling_Alley'>Bowling Alley</option>
                <option value='Library'>Library</option>
                <option value='Museum'>Museum</option>
                <option value='Park'>Park</option>
            </select>
        </div>
    )
 }


const mapStateToProps = state => state

export default connect(mapStateToProps)(FamilyFun)