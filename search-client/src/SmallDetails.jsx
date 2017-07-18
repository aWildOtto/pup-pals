import React, { Component } from 'react';

class SmallDetails extends Component {
  handleClick = () => {
    this.props.toggleHidden();
  }

  handleButton1 = (e) => {
    e.stopPropagation();
    this.props.RSVP();
  }

  handleButton2 = (e) => {
    e.stopPropagation();
    this.props.AddToCalender();
  }
  
  render() {
    return (
      <div className="detailcontainer">
        <a href="#" onClick={this.handleClick.bind(this)} className="smalldetails-link">
          <div className="smalldetails-container">
            <div className="smalldetails-header">
              <h3 className="smalldetails-title">{this.props.event.title}</h3>
              <span className="smalldetails-attendees">10 Going</span>
            </div>
            <div className="smalldetails-body">
              <span className="smalldetails-date"><i className="fa fa-clock-o" aria-hidden="true"></i> {this.props.event.date_time}</span>
              <span className="smalldetails-time">12:00 PM - 4:00PM</span>
              <span className="smalldetails-location"><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.event.location}</span>
            </div>
            <div className="smalldetails-footer">
              <span className="smalldetails-rsvp">
                <button type="button" onClick={this.handleButton1.bind(this)} className="btn btn-primary">RSVP</button>
              </span>
              <span className="smalldetails-calender">
                <button type="button" onClick={this.handleButton2.bind(this)} className="btn btn-primary">Calender</button>
              </span>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default SmallDetails;