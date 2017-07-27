import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx';
import Map from './Map.jsx';
import Loading from './Loading.jsx';
import axios from 'axios';
import Moment from 'moment';
import momentRange from 'moment-range';
import { extendMoment } from 'moment-range';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      events: [],
      user: {},
      bound_a: {},
      bound_b: {},
      startDate: "",
      endDate: ""
    }
  }

  fetchData = () => {
    const getEvents = () => {
      return axios.get(`/api/events/radius?boundalat=${this.state.bound_a.lat}
        &boundalng=${this.state.bound_a.lng}
        &boundblat=${this.state.bound_b.lat}
        &boundblng=${this.state.bound_b.lng}`);
    }

    const getUser = () => {
      return axios.get('/api/user');
    }

    axios.all([getEvents(), getUser()])
      .then(axios.spread((events, user) => {
        let eventsData = events.data;
        let userData = user.data;
        if(this.state.startDate && this.state.endDate) {
          eventsData = eventsData.filter(event => {
            const startDate = Moment(this.state.startDate, "DD-MM-YYYY");
            const endDate = Moment(this.state.endDate, "DD-MM-YYYY");
            const eventDate = Moment(event.date_time.split('t')[0], 'YYYY-MM-DD');
            const range = Moment().range(startDate, endDate);
            return(range.contains(eventDate))
          })
        }
        this.setState({
          events: eventsData,
          user: userData,
          loading: false
        });
      }));
  }

  locationFilter = (bound_a, bound_b) => {
    this.setState({
      bound_a,
      bound_b
    });
    return axios.get(`/api/events/radius?boundalat=${bound_a.lat}&boundalng=${bound_a.lng}&boundblat=${bound_b.lat}&boundblng=${bound_b.lng}`)
      .then((response) => {
          this.setState({events: response.data})
        }
      );
  }

  handleStartDayChange = (startDate) => {
    if(startDate) {
      this.setState({
        startDate: startDate,
      }, this.fetchData());
    } else {
      this.setState({
        startDate: "",
      }, this.fetchData());
    }
  }

  handleEndDayChange = (endDate) => {
    if(endDate) {
      this.setState({
        endDate: endDate
      }, this.fetchData())
    } else {
      this.setState({
        endDate: ""
      }, this.fetchData())
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const loading = this.state.loading
    const mapDiv = ( <div>
        <Map events={this.state.events}
        user={this.state.user}
        fetchAppData={this.fetchData}
        locationFilter={this.locationFilter}
        startDate={this.state.startDate}
        endDate={this.state.endDate} 
        />
        <SearchBar startDate={this.state.startDate}
          endDate={this.state.endDate} 
          handleStartDayChange={this.handleStartDayChange}
          handleEndDayChange={this.handleEndDayChange}/>
      </div>)
    return (
      loading ? <img src="https://s3-us-west-1.amazonaws.com/puppals/preloader.gif"/> : mapDiv
    );
  }
}

export default App;