import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import WWvideo from './components/wwvideo'

import './App.scss';

class App extends Component {

  render() {
 
    return (
      <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <div className="container">
                  <h1>Sorry, no videos here!</h1>
                  <p>Please go to one of the following:</p>
                  <ul>
                    <li><Link to="/myvid1">myvid1</Link></li>
                    <li><Link to="/myvid2">myvid2</Link></li>
                  </ul>
                </div>
              </Route>
              <Route path="/:id" component={WWvideo} />
            </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;