import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {updateRouteStep} from '../../ducks/reducer'
import './categories.css'

const Categories = (props) => {

    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        let num = props.routeCreationStep;
        if(props.routeCreationStep > 3) {
            setToggle(true);
        } else {
            props.updateRouteStep(num + 1)
        }
    }, []);
    if(toggle) {
        return <Redirect to='/' />
    }
    return (
        <div className='CategoriesCont'>
            <div className='categoriesWrapper'>
                <Link to='/food'><div title='Food' className='foodPic'/>
                    <span className='foodLabel'>Food</span></Link>
                <Link to='/family-fun'><div title='Family Fun' className='familyFunPic'/>
                    <span className='ffLabel'>Family Fun</span></Link>
                <Link to='/shopping'><div title='Shopping' className='shopping'/>
                    <span className='sLabel'>Shopping</span></Link>
                <Link to='/spa'><div title='Spa' className='spaPic'/>
                    <span className='spaLabel'>Spa</span></Link>
                <Link to='/night-life'><div title='Night Life' className='nightLifePic'/>
                    <span className='nlLabel'>Night Life</span></Link>
                <Link to='/entertainment'><div title='Entertainment' className='ePic'/>
                    <span className='eLabel'>Entertainment</span></Link>
            </div>
        </div>
    )
}


const mapStateToProps = state => state

export default connect(mapStateToProps, {updateRouteStep})(Categories)