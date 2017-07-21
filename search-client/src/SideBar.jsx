import React, { Component } from 'react';
import SmallDetails from './SmallDetails.jsx'
import LargeDetails from './LargeDetails.jsx'
import axios from 'axios';
import Moment from 'moment';
import momentRange from 'moment-range';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedEvent: null
    }
  }

  toggleHidden(e) {
    this.setState({
      selectedEvent: e
    })
  }

  RSVP(event_id) {
    return axios.post('/events/rsvp', {
      event_id
    })
    .then((response) => {
      return this.props.fetchAppData();
    })
  }

  AddToCalender() {
    alert('Add to Calender');
  }

  renderEvents() {
    return this.props.events.map((e) => {
      if(this.props.dates.startDate || this.props.dates.endDate){
        let startDate = moment(this.props.dates.startDate, "DD-MM-YYYY");
        let endDate = moment(this.props.dates.endDate, "DD-MM-YYYY");  
        let eventDate = moment(e.date_time.split('t')[0], 'YYYY-MM-DD');
        let range = moment().range(startDate, endDate);
          if(range.contains(eventDate)){
            return <SmallDetails 
            event={e}
            user={this.props.user}
            key={e.id}
            toggleHidden={this.toggleHidden.bind(this, e)} 
            RSVP={this.RSVP.bind(this)}
            AddToCalender={this.AddToCalender.bind(this)}
            />
        }
      } else {
        return <SmallDetails 
            event={e}
            user={this.props.user}
            key={e.id}
            toggleHidden={this.toggleHidden.bind(this, e)} 
            RSVP={this.RSVP.bind(this)}
            AddToCalender={this.AddToCalender.bind(this)} 
            />
      }
    })
  }

  renderLargeDetails() {
    return <LargeDetails 
    event={this.state.selectedEvent}
    user={this.props.user}    
    toggleHidden={this.toggleHidden.bind(this)} 
    RSVP={this.RSVP.bind(this)} 
    AddToCalender={this.AddToCalender.bind(this)} 
    />
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          {!this.state.selectedEvent && this.renderEvents() }   
          {this.state.selectedEvent && this.renderLargeDetails() }    
        </div>
      </div>      
    );
  }
}

export default SideBar;