import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import './categories.css'
import Nav from '../Nav/Nav';
import axios from 'axios';
import MiniPlace from '../MiniPlace/MiniPlace'

const Categories = (props) => {

    const [toggle, setToggle] = useState(false);
    const [searchText, setSearchText] = useState(['']);
    const [sessionToken, setToken] = useState(null);
    const [suggestedPlaces, setSuggestedPlaces] = useState([]);

    useEffect(() => {
        //HERE WE CREATE A RANDOM STRING OF NUMBERS FOR A SESSION TOKEN
        if(props.places.length >= 3) {
            setToggle(true);
        }
        let arr = [];
        for(let i = 0; i < 15; i++) {
            arr.push(Math.round(Math.random() * 57 + 65))
        }
        arr = arr.map(val => String.fromCharCode(val))
        let sessionToken = arr.join('');
        setToken(sessionToken)
    }, []);

    useEffect(() => {
        //TAKES WHAT IS CURRENTLY IN THE INPUT FIELD AND HITS THE AUTOCOMPLETE API AND USES THE RETURNED SUGGESTIONS TO RENDER MINIPLACES.
        if(searchText[0]) {
            axios.post('/api/autocomplete', {input: searchText[0], sessiontoken: sessionToken}).then(suggestions => {
                setSuggestedPlaces(null);
                axios.post('/api/photos/places', {predictions: suggestions.data.predictions}).then(placesPhoto => {
                    setSuggestedPlaces(suggestions.data.predictions.map((val, i) => {
                        return <MiniPlace cameFromCategories={1} place_id={val.place_id} photo={placesPhoto.data[i].result.photos ? placesPhoto.data[i].result.photos[0].photo_reference : null} />
                    }))
                }).catch(err => console.log(err))
            })
        }
    }, searchText)


    if(toggle) {
        return <Redirect to='/review' />
    }
    //SET THE INPUT TEXT IN STATE
    const handleSearch = e => {
        setSearchText([e.target.value])
    }
    return (
        <>
        <Nav />
        <div className='CategoriesCont'>
            <div className='category-search-container'>
                <input className='category-search' placeholder='Search' onChange={handleSearch}/>
            </div>
            {/* IF THERE IS SOMETHING IN THE INPUT FIELD, WE DONT RENDER THE CATEGORIES */}
            {!searchText[0] ? <div className='categoriesWrapper'>
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
            </div> : suggestedPlaces}
        </div>
        </>
    )
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(Categories)