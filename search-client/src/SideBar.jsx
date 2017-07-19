import React, { Component } from 'react';
import SmallDetails from './SmallDetails.jsx'
import LargeDetails from './LargeDetails.jsx'
import axios from 'axios';

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

  RSVP(eventId, userId) {
    axios.post('/events/:id', {
      event_id: eventId,
      user_id: userId
    })
    .then((response) => {
      console.log(response);
    })
  }

  AddToCalender() {
    alert('Add to Calender');
  }

  renderEvents() {
    return this.props.events.map((e) => {
      return <SmallDetails 
      event={e}
      key={e.id}
      toggleHidden={this.toggleHidden.bind(this, e)} 
      RSVP={this.RSVP.bind(this)}
      AddToCalender={this.AddToCalender.bind(this)} 
      />
    })
  }

  renderLargeDetails() {
    return <LargeDetails 
    event={this.state.selectedEvent}
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