import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './spa.css'

function Spa(){}


const mapStateToProps = state => state

export default connect(mapStateToProps)(Spa)