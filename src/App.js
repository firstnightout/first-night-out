import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './ducks/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
