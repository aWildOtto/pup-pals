import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';
import Map from './Map.jsx';
import axios from 'axios';

class App extends React.Component {


  componentDidMount() {
   axios.get('/api/events').then((events)=>{
     console.log(events.data);
   })
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