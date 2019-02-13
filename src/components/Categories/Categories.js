import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './categories.css'
import Nav from '../Nav/Nav'

const Categories = () => {


    return (
        <div className='CategoriesCont'>
            <div className='categoriesWrapper'>
                <Link to='/food'><div title='Food' className='foodPic'/></Link>
                <Link to='/family-fun'><div title='Family Fun' className='familyFunPic'/></Link>
                <Link to='/shopping'><div title='Shopping' className='shopping'/></Link>
                <Link to='/spa'><div title='Spa' className='spaPic'/></Link>
                <Link to='/night-life'><div title='Night Life' className='nightLifePic'/></Link>
                <Link to='/entertainment'><div title='Entertainment' className='ePic'/></Link>
            </div>
                <span className='foodLabel'>Food</span>
                <span className='ffLabel'>Family Fun</span>
                <span className='sLabel'>Shopping</span>
                <span className='spaLabel'>Spa</span>
                <span className='nlLabel'>Night Life</span>
                <span className='eLabel'>Entertainment</span>
        </div>
    )
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(Categories)