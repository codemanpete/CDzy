import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Landing />
        </div>
      </Router>
    );
  }
}

export default App;
