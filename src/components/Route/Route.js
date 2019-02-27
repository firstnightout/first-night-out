import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import MiniPlace from '../MiniPlace/MiniPlace'
import axios from 'axios';
import './Route.css'
import {updateDirectionRoutes} from '../../ducks/reducer';
import Nav from '../Nav/Nav'
import {TimelineMax} from 'gsap';

const Route = (props) => {
    const [routeData, setRouteData] = useState(null);
    const [voteToggle, setVoteToggle] = useState(true);
    // const [mapAddresses, setMapAddresses] = useState('');

    useEffect(() => {
        axios(`/api/routes/${props.match.params.routeid}`).then(response => {
            setRouteData(response.data);
            props.updateDirectionRoutes({
                address1: {
                    lat: response.data.place1.geometry.location.lat,
                    lng: response.data.place1.geometry.location.lng
                },
                address2: {
                    lat: response.data.place2.geometry.location.lat,
                    lng: response.data.place2.geometry.location.lng
                },
                address3: {
                    lat: response.data.place3.geometry.location.lat,
                    lng: response.data.place3.geometry.location.lng
                }
            }
            );
        })
    }, []);

    const upVote = () => {
        let t1 = new TimelineMax({onComplete: () => setVoteToggle(false)});
        t1.to('.fa-thumbs-up', .7, {x: 70, y: -260, scale: 2})
        t1.to('.fa-thumbs-up', .3, {x: 70});
        axios.post(`/api/vote`, {vote: 1, routeID: props.match.params.routeid } )
    }

    const downVote = () => {
        let t1 = new TimelineMax({onComplete: () => setVoteToggle(false)});
        t1.to('.fa-thumbs-down', .7, {x: -70, y: -260, scale: 2})
        t1.to('.fa-thumbs-down', .3, {x: -70});
        axios.post(`/api/vote`, {vote: -1, routeID: props.match.params.routeid } )
    }
    return(
        <>
        <Nav />
        <div className='routeMain'>
            <div className='routeScreen'>
                <span className='myRoute'>My Route</span>
                <Link to={`/map`} className='mapRoute'><span className='goCont'>GO</span></Link>
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
            {voteToggle &&
                <div className="vote-box">
                    <i 
                        className="fas fa-thumbs-up"
                        onClick={ upVote }
                    ></i>

                    <i 
                        className="fas fa-thumbs-down"
                        onClick={ downVote }
                    ></i>
                </div> }
            </div>
        </div>
        </>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {updateDirectionRoutes})(Route)