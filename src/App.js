import './App.css';
import React, { Component } from 'react';

import Header from './components/Header/Header';
import List from './components/List/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <List />
      </div>
    );
  }
}

export default App;
