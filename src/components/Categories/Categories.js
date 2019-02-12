import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './categories.css'

const Categories = () => {




    return (
        <div className='mainCont'>
            <div className='categoriesWrapper'>
                <Link to='/food'><img label='Food' src='https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2017/11/11/72460404bfe145ceb178970613db89e0_sea-768x576.jpg'/></Link>
                <Link to='/family-fun'><img label='Family Fun' src='https://static1.squarespace.com/static/59d7cb7b90badecf6400216f/t/5a9887b324a694fe7eb29e83/1519945659744/%234.PNG?format=500w'/></Link>
                <Link to='/shopping'><img label='Shopping' src='https://www.neimanmarcus.com/content/dam/neiman-marcus/homepage/row_2/Row2b_UC_Ippolita_020519.jpg'/></Link>
                <Link to='/spa'><img label='Spa' src='https://www.lakeaustin.com/content/uploads/2018/12/group-experiences-3-720x524.jpg'/></Link>
                <Link to='/night-life'><img label='Night Life' src='https://dkr2rmsityotp.cloudfront.net/wp-content/uploads/2018/09/cgw-180820-gamingoverview-rv11-17-cgw-259-thumbnail-768x432.jpg'/></Link>
                <Link to='/entertainment'><img label='Entertainment' src='https://www.dallaszoo.com/wp-content/uploads/2016/03/Wilds-of-Africa-Adventure-Safari-Train-and-Waterfall-1024x682.jpg'/></Link>
            </div>
        </div>
    )




}



const mapStateToProps = state => state

export default connect(mapStateToProps)(Categories)