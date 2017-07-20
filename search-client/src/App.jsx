import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';
import Map from './Map.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      user: {}
    }
  }

  fetchData = () => {
    const getEvents = () => {
      return axios.get('/api/events');
    }
 
    const getUser = () => {
      return axios.get('/api/user');
    }
 
    axios.all([getEvents(), getUser()])
      .then(axios.spread((events, user) => {
        this.setState({events: events.data});
        this.setState({user: user.data});
        console.log("Events data from server:", events.data)        
        console.log("User data from server:", user.data)
      }));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <Map events={this.state.events} user={this.state.user} fetchAppData={this.fetchData}/>
        <SearchBar />
      </div>
    );
  }
}

export default App;