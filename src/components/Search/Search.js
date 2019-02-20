import React, {useState, useEffect} from 'react';
import Nav from '../Nav/Nav'
import './Search.css'
import axios from 'axios';

const Search = () => {
    const [ inputText, setInputText ] = useState(['']);
    const [ sessionToken, setToken ] = useState(null);
    const [ autoSuggestions, setAutoSuggestions ] = useState(null); 
    const [ searchResultStyle, setResultStyle ] = useState(null);
    const [ toggleSearchResults, toggleResults ] = useState(false);

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
            setAutoSuggestions(response.data.predictions.map(val => {
                return <span className='search-result-element' onClick={() => resetSuggestion(val.description)}>{val.description}</span>
            }))
        })
            setInputText( [e.target.value] )
    }
    return(
        <>
            <Nav />
            <input className='search-bar' value={inputText[0]} onChange={handleChange} placeholder='Search' />
            <div className='search-results' style={searchResultStyle}>
                {autoSuggestions}
            </div>
        </>
    )
}

export default Search;