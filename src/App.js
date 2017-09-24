import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import HistoryView from "./component/HistoryView";
import CurrentView from "./component/CurrentView";
import Home from "./component/Home";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">

        <Router>
          <div>
            <ul>
              <li> <Link to="/">Home</Link> </li>
              <li> <Link to="/current">Current</Link> </li>
              <li> <Link to="/history">History</Link> </li>
            </ul>

            <Route exact path="/" component={Home}/>
            <Route exact path="/current" component={CurrentView}/>
            <Route exact path="/history" component={HistoryView}/>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
