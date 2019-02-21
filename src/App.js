import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './ducks/store'
import routes from './routes';


class App extends Component {

  render() {
    console.log(this.props)
    return (
      <Provider store={store}>
        <Router>
            <div>
              { routes }
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App
