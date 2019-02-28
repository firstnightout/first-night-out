import React, {useState, useEffect} from 'react';
import Nav from '../Nav/Nav'
import './Search.css'
import axios from 'axios';
import MiniRoute from '../MiniRoute/MiniRoute';
import { TweenMax, Power3 } from "gsap";

const Search = (props) => {
    const [ inputText, setInputText ] = useState(['']);
    const [ sessionToken, setToken ] = useState(null);
    const [ autoSuggestions, setAutoSuggestions ] = useState(null); 
    const [ searchResultStyle, setResultStyle ] = useState(null);
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        //HERE WE CREATE A RANDOM HASH FOR A SESSION TOKEN.
        let arr = [];
        for(let i = 0; i < 15; i++) {
            arr.push(Math.round(Math.random() * 57 + 65))
        }
        arr = arr.map(val => String.fromCharCode(val))
        let sessionToken = arr.join('');
        setToken(sessionToken);
    }, [])

    useEffect(() => {
        //HERE WE LISTEN ON INPUTTEXT AND IF THERE IS TEXT IN THE FIELD
        //WE SET STYLING ON THE SUGGESTED RESULTS
        //OTHERWISE WE REMOVE THE SUGGESTIONS IN STATE AND SET THE STYLING BACK TO NONE
        if(inputText[0].length === 0) {
            setAutoSuggestions(null);
            setResultStyle(null);
        } else {
            setResultStyle({
                'border': '1px solid gray',
                'WebkitBoxShadow': '0px 2px 5px 0px rgba(0,0,0,0.16)',
                'MozBoxShadow': '0px 2px 5px 0px rgba(0,0,0,0.16)',
                'boxShadow': '0px 2px 5px 0px rgba(0,0,0,0.16)'
            });
        }
    }, inputText)

    const resetSuggestion = (description) => {
        //WHEN A USER CLICKS ON A SUGGESTION WE HAVE TO 
        setInputText([description]) //PUT THAT SUGGESTION IN THE INPUT FIELD
        setResultStyle(null) //WE REMOVE THE STYLING OFF OF THE SUGGESTED SEARCHES
        setAutoSuggestions(null) //WE REMOVE THE ACTUAL SUGGESTED SEARCHES
        handleSearchResult(description) //WE EXECUTE THE FUNCTION TO BRING UP RESULTS FOR THE SEARCH
    }

    const handleChange = (e) => {
        //WHEN A USER TYPES, WE MAKE REQUESTS TO THE AUTOCOMPLETE API TO USE FOR SUGGESTIONS
        axios.post('/api/autocomplete', {input: e.target.value, sessiontoken: sessionToken}).then(response => {
            setAutoSuggestions(response.data.predictions.filter((val) => val.types.includes('locality')).map(val => {
                //HERE WE CREATE THE ACTUAL HTML SUGGESTION TO BE RENDERED
                return <span className='search-result-element' onClick={() => resetSuggestion(val.description)}>{val.description}</span>
            }))
        })
            //HERE WE SAVE THE TEXT IN STATE
            setInputText( [e.target.value] )
    }

    const handleSearchResult = (searchText) => {
        setAutoSuggestions(null)
        const formattedText = searchText.split(',')
        //HERE WE TAKE THE CITY FROM THE AUTOSUGGESTION THAT WAS CLICKED AND MAKE A REQUEST TO THE CITY API
        //WITH THIS WE CAN FIND ROUTES BASED ON THE SELECTED CITY
        axios.get(`/api/getcity/${formattedText[0]}`)
        .then(response => {
            let searchResults = response.data.sort((a,b) => b.likes - a.likes).map(val => {
                return (
                    //HERE WE ACTUALLY RENDER THOSE ROUTES IN MINIROUTES
                    <MiniRoute likes={val.likes} place1={val.place1} place2={val.place2} place3={val.place3} routeID={val.routeID} user_id={val.userID}/>
                )
            })
            setSearchResults(searchResults)
        })
    }

    //THIS IS ANIMATINO FOR THE SEARCH BAR
    const animateUpAndWide = () => {
        TweenMax.to('.search-container', .6, { ease: Power3.easeOut, y: -220})
        TweenMax.to('.search-bar', .6, { width: 300, x: -7, height: 25})
        TweenMax.to('.search-results', .6, { ease: Power3.easeOut, y: -220})
        TweenMax.to('.results', .6, {height:1, ease: Power3.easeOut, y: -220})
    }

    return(
        <>
            <Nav />
            <div className='search-container'>
                <input className='search-bar' value={inputText[0]} onChange={handleChange} onClick={animateUpAndWide} placeholder='Search Routes' onKeyPress={e => e.key === 'Enter' && handleSearchResult(inputText[0])} />
            </div>
            <div className={'search-results'} style={searchResultStyle}>
                {autoSuggestions}
            </div>
            <div className='results'>
                {searchResults}
            </div>
        </>
    )
}

export default Search;