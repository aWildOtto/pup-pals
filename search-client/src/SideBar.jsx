import React, { Component } from 'react';
import SmallDetails from './SmallDetails.jsx'
import LargeDetails from './LargeDetails.jsx'

class SideBar extends Component {
  constructor () {
    super()
    this.state = {
      isHidden: true
    }
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  RSVP () {
    alert('RSVP');
  }

  AddToCalender () {
    alert('Add to Calender');
  }

  renderEvents() {
    return this.props.events.map((e) => {
      return <SmallDetails 
      event={e}
      key={e.id}
      toggleHidden={this.toggleHidden.bind(this)} 
      RSVP={this.RSVP.bind(this)} 
      AddToCalender={this.AddToCalender.bind(this)} 
      />
    })
  }
  render() {
    return (
      <div>
        <div className="sidebar">
          {this.state.isHidden && this.renderEvents() }   
          {!this.state.isHidden && <LargeDetails toggleHidden={this.toggleHidden.bind(this)} RSVP={this.RSVP.bind(this)} AddToCalender={this.AddToCalender.bind(this)} /> }    
        </div>
      </div>      
    );
  }
}

export default SideBar;