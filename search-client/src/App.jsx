import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';
import Map from './Map.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      user: {},
      dates: {
        startDate: "",
        endDate: ""
      }
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

  locationFilter = (bound_a, bound_b) => {
    return axios.get(`/api/events/radius?boundalat=${bound_a.lat}&boundalng=${bound_a.lng}&boundblat=${bound_b.lat}&boundblng=${bound_b.lng}`)
      .then((response) => {
          this.setState({events: response.data})
        }
      );
  }

  handleDayChange = (startDate, endDate) => {
    if(startDate && endDate) {
      this.setState({dates: {
        startDate: startDate,
        endDate: endDate
      }})
    } else {
      this.setState({dates: {
        startDate: "",
        endDate: ""
      }})
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <Map events={this.state.events} 
        user={this.state.user} 
        fetchAppData={this.fetchData}
        locationFilter={this.locationFilter} 
        dates={this.state.dates}
        />
        <SearchBar dates={this.state.dates} handleDayChange={this.handleDayChange}/>
      </div>
    );
  }
}

export default App;