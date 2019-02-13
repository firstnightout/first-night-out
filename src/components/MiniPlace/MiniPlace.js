import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './MiniPlace.css'

const MiniPlace = (props) => {
    const [ref, setRef] = useState(0);
    const [name, setName] = useState(0);

    useEffect(() => {
        axios.post(`/api/places/details`, {
            placeid: props.place_id,
        }).then(response => {
            setRef(response.data.result);
            if(response.data.result.name.length > 30) {
                setName(response.data.result.name.substring(0,27) + '...');
            } else {
                setName(response.data.result.name);
            }
        })
    }, [])
    
    return(
        <div className='mini-place'>
            <img className='mini-place-photo' src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.photo}&maxheight=100&key=AIzaSyB3hkAtDj8ZZK9ptagSp_YqQouPEMcuaCo`} />
            <div className='mini-place-info'>
                <h1>{name}</h1>
                <h3>{ref.formatted_address ? ref.formatted_address.substring(0, ref.formatted_address.indexOf(',', ref.formatted_address.indexOf(',') + 1)) : null }</h3>
                <h3>{ref.rating}</h3>
            </div>
        </div>
    );
}
export default MiniPlace;