import React, {useState, useEffect} from 'react';
import Nav from '../Nav/Nav'
import './Search.css'
import axios from 'axios';
import { checkPropTypes } from 'prop-types';
import MiniPlace from '../MiniPlace/MiniPlace';
import MiniRoute from '../MiniRoute/MiniRoute';

const Search = (props) => {
    const [ inputText, setInputText ] = useState(['']);
    const [ sessionToken, setToken ] = useState(null);
    const [ autoSuggestions, setAutoSuggestions ] = useState(null); 
    const [ searchResultStyle, setResultStyle ] = useState(null);
    const [ toggleSearchResults, toggleResults ] = useState(false);
    const [searchResults, setSearchResults] = useState(null)

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
                'WebkitBoxShadow': '0px 6px 5px 5px rgba(230,230,230,1)',
                'MozBoxShadow': '0px 6px 5px 5px rgba(230,230,230,1)',
                'boxShadow': '0px 6px 5px 5px rgba(230,230,230,1)'
            });
        }
    }, inputText)

    const resetSuggestion = (description) => {
        setResultStyle(null)
        setAutoSuggestions(null);
        setInputText([description])
    }

    const handleChange = e => {
        axios.post('/api/autocomplete', {input: e.target.value, sessiontoken: sessionToken}).then(response => {
            console.log(response);
            setAutoSuggestions(response.data.predictions.filter((val) => val.types.includes('locality')).map(val => {
                return <span className='search-result-element' onClick={() => resetSuggestion(val.description)}>{val.description}</span>
            }))
            console.log(autoSuggestions);
        })
            setInputText( [e.target.value] )
    }

    const handleSearchResult = () => {
        const formatedText = inputText[0].split(',')
        axios.get(`/api/getcity/${formatedText[0]}`)
        .then(response => {
            console.log(response.data);
            let searchResults = response.data.map(val => {
                return (
                    <MiniRoute place1={val.place1} place2={val.place2} place3={val.place3} routeID={val.routeID} user_id={val.userID}/>
                )
            })
            setSearchResults(searchResults)
        })
    }

    return(
        <>
            <Nav />
            <input className='search-bar' value={inputText[0]} onChange={handleChange} placeholder='Search' />
            <div className='search-results' style={searchResultStyle}>
                {autoSuggestions}
            </div>
<<<<<<< HEAD

=======
            <button onClick={handleSearchResult}>Submit</button>
            {searchResults}
>>>>>>> master
        </>
    )
}

export default Search;