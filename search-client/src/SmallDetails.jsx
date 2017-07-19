import React, { Component } from 'react';
import Moment from 'react-moment';

class SmallDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: ""
    }
  }
  handleClick = () => {
    this.props.toggleHidden();
  }

  handleRsvp = (e) => {
    e.stopPropagation();
    this.props.RSVP(this.props.event.id);
    this.setState({disabled: "disabled"});
  }

  handleCalender = (e) => {
    e.stopPropagation();
    this.props.AddToCalender();
  }
  
  render() {
    const disabled = false
    return (
      <div className="detailcontainer">
        <a href="#" onClick={this.handleClick.bind(this)} className="smalldetails-link">
          <div className="smalldetails-container">
            <div className="smalldetails-header">
              <h3 className="smalldetails-title">{this.props.event.title}</h3>
              <span className="smalldetails-attendees">{this.props.event.count} Going</span>
            </div>
            <div className="smalldetails-body">
              <span className="smalldetails-date"><i className="fa fa-clock-o" aria-hidden="true"></i> <Moment format="ddd MMMM Do YYYY">{this.props.event.date_time}</Moment></span>
              <span className="smalldetails-time"><Moment format="h:mm a">{this.props.event.date_time}</Moment></span>
              <span className="smalldetails-location"><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.event.location}</span>
            </div>
            <div className="smalldetails-footer">
              <span className="smalldetails-rsvp">
                <button disabled={this.state.disabled} type="button" onClick={this.handleRsvp.bind(this)} className="btn btn-primary">RSVP</button>
              </span>
              <span className="smalldetails-calender">
                <button type="button" onClick={this.handleCalender.bind(this)} className="btn btn-primary">Calender</button>
              </span>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default SmallDetails;