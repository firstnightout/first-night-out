import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../ducks/reducer'
import './nav.css'

function Nav() {}


const mapStateToProps = state => state

export default connect(mapStateToProps)(Nav)