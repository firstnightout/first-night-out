import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import MiniPlace from '../MiniPlace/MiniPlace'
import axios from 'axios';
import './Route.css'
import Nav from '../Nav/Nav'

const Route = (props) => {
    const [routeData, setRouteData] = useState(null);

    useEffect(() => {
        axios(`/api/routes/${props.match.params.routeid}`).then(response => {
            console.log(response);
            setRouteData(response.data);
        })
    }, []);

    const upVote = () => {
        axios.post(`/api/vote`, {vote: 1, routeID: props.match.params.routeid } )
    }

    const downVote = () => {
        axios.post(`/api/vote`, {vote: -1, routeID: props.match.params.routeid } )
    }
    return(
        <>f
        <Nav />
        <div className='routeMain'>
            <div className='routeScreen'>
                <span className='myRoute'>My Route</span>
                <Link to='/map' className='mapRoute'><span className='goCont'>GO</span></Link>
            </div>
            <div className='routeDisplay'>
                {routeData && <MiniPlace
                    photo={routeData.place1.photos[0].photo_reference} place_id={routeData.place1.place_id}
                /> }
            </div>
            <div className='spacerRoute'></div>
            <div>
                { routeData && <MiniPlace
                        photo={routeData.place2.photos[0].photo_reference} place_id={routeData.place2.place_id}
                /> }
            </div>
            <div className='spacerRoute'></div>
            <div>
                { routeData && <MiniPlace
                        photo={routeData.place3.photos[0].photo_reference} place_id={routeData.place3.place_id}
                /> }
            </div>
            <div>
                <div>
                    <i 
                        className="fas fa-thumbs-up"
                        onClick={ upVote }
                    ></i>
                    <i 
                        className="fas fa-thumbs-down"
                        onClick={ downVote }
                    ></i>
                </div>
            </div>
        </div>
        </>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Route)