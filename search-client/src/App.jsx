import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';
import Map from './Map.jsx'

class App extends React.Component {
  componentDidMount() {
    this.socket = io();
  }

  render() {
    return (
      <div>
        <Map />  
        <SearchBar />   
      </div>
    );
  }
}

export default App;