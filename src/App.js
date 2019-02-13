import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './ducks/store'
import routes from './routes';
import Nav from './components/Nav/Nav';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <div>
              <Nav />
                { routes }
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
