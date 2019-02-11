import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login'
import Register from './components/Register/Register'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Register/>
      </div>
    );
  }
}

export default App;
