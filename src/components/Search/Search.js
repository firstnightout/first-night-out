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
    // const [ toggleSearchResults, toggleResults ] = useState(false);
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        //Making Random Token for the Billing Session
        let arr = [];
        for(let i = 0; i < 15; i++) {
            arr.push(Math.round(Math.random() * 57 + 65))
        }
        arr = arr.map(val => String.fromCharCode(val))
        let sessionToken = arr.join('');
        setToken(sessionToken);
    }, [])

    useEffect(() => {
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
        console.log(description);
        setInputText([description])
        setResultStyle(null)
        setAutoSuggestions(null)
    }

    const handleChange = async (e) => {
        axios.post('/api/autocomplete', {input: e.target.value, sessiontoken: sessionToken}).then(response => {
            setAutoSuggestions(response.data.predictions.filter((val) => val.types.includes('locality')).map(val => {
                return <span className='search-result-element' onClick={() => resetSuggestion(val.description)}>{val.description}</span>
            }))
        })
            await setInputText( [e.target.value] )
    }

    const handleSearchResult = () => {
        setAutoSuggestions(null)
        const formattedText = inputText[0].split(',')
        axios.get(`/api/getcity/${formattedText[0]}`)
        .then(response => {
            let searchResults = response.data.sort((a,b) => b.likes - a.likes).map(val => {
                return (
                    <MiniRoute likes={val.likes} place1={val.place1} place2={val.place2} place3={val.place3} routeID={val.routeID} user_id={val.userID}/>
                )
            })
            setSearchResults(searchResults)
        })
    }

    const animateWide = () => {
        TweenMax.to('.search-container', 1, { ease: Power3.easeOut, y: -200})
        TweenMax.to('.search-bar', 1, { width: 300, x: -7})
        TweenMax.to('.search-results', 1, { ease: Power3.easeOut, y: -200})
    }

    return(
        <>
            <Nav />
            <div className='search-container'>
                <input className='search-bar' value={inputText[0]} onChange={handleChange} onClick={animateWide} placeholder='Search' onKeyPress={e => e.key === 'Enter' && handleSearchResult()} />
            </div>
            <div className={'search-results'} style={searchResultStyle}>
                {autoSuggestions}
            </div>
            {searchResults}
        </>
    )
}

export default Search;