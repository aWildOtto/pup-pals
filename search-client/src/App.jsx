import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import Moment from 'moment';
import momentRange from 'moment-range';
import { extendMoment } from 'moment-range';

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
        let eventsData = events.data;
        let userData = user.data;        
        if(this.state.dates.startDate || this.state.dates.endDate) {
          eventsData = eventsData.filter(event => {
            const startDate = Moment(this.state.dates.startDate, "DD-MM-YYYY");
            const endDate = Moment(this.state.dates.endDate, "DD-MM-YYYY");  
            const eventDate = Moment(event.date_time.split('t')[0], 'YYYY-MM-DD');
            const range = Moment().range(startDate, endDate);
            return(range.contains(eventDate))
          })
        }
          this.setState({
            events: eventsData,
            user: userData
          });                
        console.log("Events data from server:", eventsData)        
        console.log("User data from server:", userData)
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
      }}, this.fetchData)
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