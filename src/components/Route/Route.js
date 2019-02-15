import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import MiniPlace from '../MiniPlace/MiniPlace'
import './route.css'

const Route = (props) => {

    return(
        <div className='routeMain'>
            <div className='routeScreen'>
                <span className='myRoute'>My Route</span>
                <Link to='/map' className='mapRoute'><span className='goCont'>GO</span></Link>
            </div>
            <div className='routeDisplay'>
                <MiniPlace
                    photo={`CmRaAAAALb8G_p8Uy0PMWKlkS7MoPpy1EcUxuJ7qUzq8bUhCJ_vZEFYRWY_gq1u2xvQ2Sf8m9zmGm3jwCWG51Jgc64HWbxCFNIwgN4tW-yOqR2dTqoQkK0LhZVxp9VztBagKuGuuEhDwjyVWnCk_R1ORGLeqD2jtGhQ-tya89r5DwS7POfbkBXYWBOtV6Q`} place_id={`ChIJ0d3gQh-ZToYRXIOa4JoP5e8`}
                />
            </div>
            <div className='spacerRoute'></div>
            <div>
                <MiniPlace
                        photo={`CmRaAAAALb8G_p8Uy0PMWKlkS7MoPpy1EcUxuJ7qUzq8bUhCJ_vZEFYRWY_gq1u2xvQ2Sf8m9zmGm3jwCWG51Jgc64HWbxCFNIwgN4tW-yOqR2dTqoQkK0LhZVxp9VztBagKuGuuEhDwjyVWnCk_R1ORGLeqD2jtGhQ-tya89r5DwS7POfbkBXYWBOtV6Q`} place_id={`ChIJ0d3gQh-ZToYRXIOa4JoP5e8`}
                />
            </div>
            <div className='spacerRoute'></div>
            <div>
                <MiniPlace
                        photo={`CmRaAAAALb8G_p8Uy0PMWKlkS7MoPpy1EcUxuJ7qUzq8bUhCJ_vZEFYRWY_gq1u2xvQ2Sf8m9zmGm3jwCWG51Jgc64HWbxCFNIwgN4tW-yOqR2dTqoQkK0LhZVxp9VztBagKuGuuEhDwjyVWnCk_R1ORGLeqD2jtGhQ-tya89r5DwS7POfbkBXYWBOtV6Q`} place_id={`ChIJ0d3gQh-ZToYRXIOa4JoP5e8`}
                />
            </div>

        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Route)