import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import HistoryView from "./component/HistoryView";
import Home from "./component/Home";

import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar inverse collapseOnSelect >
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">Bike Sharing</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <NavItem eventKey={1} href="/history"> History </NavItem>
              </Nav>
            </Navbar>
            <Route exact path="/" component={Home}/>
            <Route exact path="/history" component={HistoryView}/>
          </div>
      </Router>
      </div>
    );
  }
}

export default App;
