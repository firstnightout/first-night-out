import React, {useEffect} from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import Nav from '../Nav/Nav'
// import {} from '../../ducks/reducer'
import { GoogleApiWrapper} from 'google-maps-react'
import './map.css'

const MapComponent = (props) => {
  const mapStyle = {
    'width': '100vw',
    'height': '93vh',
  }

  // const [map, setMap] = useState(null);

  useEffect(() => {
    console.log(props);
    let directionsService = new props.google.maps.DirectionsService()
    let directionsDisplay = new props.google.maps.DirectionsRenderer()
    // let DevMountain = new props.google.maps.LatLng(32.777599, -96.795403)
    const mapOptions = {
      zoom: 5,
    }
    var map = new props.google.maps.Map(document.getElementById('mapTag'), mapOptions);
    console.log(map)
    directionsDisplay.setMap(map);


    var start = props.user.address;
    var end = props.user.address;
    let waypoints = [ {
      location: props.directionRoutes[0],
      stopover: true
    }, {
      location: props.directionRoutes[1],
      stopover: true
    }, {
      location: props.directionRoutes[2],
      stopover: true
    }]
    var request = {
      origin: start,
      destination: end,
      waypoints,
      optimizeWaypoints: false,
      travelMode: 'WALKING'
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(result);
        // var route = result.routes[0]
      } else {
        alert('oops')
      }
    })


  }, [])
  console.log(props.google);
    return(
        <div>
        <Nav />
          <div id='mapTag' style={mapStyle}>

          </div>
        </div>
    )
}


const mapStateToProps = state => state

export default GoogleApiWrapper({
  apiKey: "AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ"
})(connect(mapStateToProps)(MapComponent))