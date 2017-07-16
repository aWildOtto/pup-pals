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
  render() {
    return (
      <div>
        <div className="sidebar">
          {this.state.isHidden && <SmallDetails toggleHidden={this.toggleHidden.bind(this)} RSVP={this.RSVP.bind(this)} AddToCalender={this.AddToCalender.bind(this)} />  }   
          {!this.state.isHidden && <LargeDetails toggleHidden={this.toggleHidden.bind(this)}/> }    
        </div>
      </div>      
    );
  }
}

export default SideBar;