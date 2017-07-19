import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';
import Map from './Map.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
  }

  componentDidMount() {
    axios.get('/api/events').then((events)=>{
      console.log(events.data);
      this.setState({events: events.data});
    })
  }

  render() {
    return (
      <div>
        <Map events={this.state.events} />
        <SearchBar />
      </div>
    );
  }
}

export default App;