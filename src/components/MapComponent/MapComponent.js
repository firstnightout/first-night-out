import React, {useEffect} from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import Nav from '../Nav/Nav'
// import {} from '../../ducks/reducer'
import { GoogleApiWrapper} from 'google-maps-react'
import './map.css'
import axios from 'axios';

const MapComponent = (props) => {
  const mapStyle = {
    'width': '100%',
    'height': '100%',
    'zIndex': '10'
  }


  useEffect(() => {
    let directionsService = new props.google.maps.DirectionsService()
    let directionsDisplay = new props.google.maps.DirectionsRenderer()
    axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ').then(currLocation => {
      const {lat, lng} = currLocation.data.location;
      let currentPlace = new props.google.maps.LatLng(lat, lng);
        const mapOptions = {
          zoom: 5,
          center: currentPlace
        }

        //WE SELECT AN ELEMENT FROM OUR RETURN AND ATTACH THE MAP TO IT.
        var map = new props.google.maps.Map(document.getElementById('mapTag'), mapOptions);
        //WE SET THE PLACES IN THE SELECTED ROUTE AS WAYPOINTS
        let waypoints = [ {
          location: new props.google.maps.LatLng(props.directionRoutes[0].lat, props.directionRoutes[0].lng),
          stopover: true
        }, {
          location: new props.google.maps.LatLng(props.directionRoutes[1].lat, props.directionRoutes[0].lng),
          stopover: true
        }, {
          location: new props.google.maps.LatLng(props.directionRoutes[2].lat, props.directionRoutes[0].lng),
          stopover: true
        }]
        var request = {
          origin: currentPlace,
          destination: new props.google.maps.LatLng(props.directionRoutes[1].lat, props.directionRoutes[0].lng),
          waypoints,
          optimizeWaypoints: false,
          travelMode: 'DRIVING'
        };

        directionsService.route(request, (result, status) => {
          //IF EVERYTHING WORKED OK WE DISPLAY THE DIRECTIONS ON THE MAP
          if (status === 'OK') {
            directionsDisplay.setDirections(result);
          } else {
          //IF NOT WE ALERT OOPS
            alert('oops')
          }
        })
        directionsDisplay.setMap(map);

      })



  }, [])
    return(
        <div>
        <Nav />
        <div className='map-container'>
          <div id='mapTag' style={mapStyle}>

          </div>
        </div>
        </div>
    )
}


const mapStateToProps = state => state

export default GoogleApiWrapper({
  apiKey: "AIzaSyA0dEOfis7q8Pl8_MM5uhen6ustyIGwCvQ"
})(connect(mapStateToProps)(MapComponent))