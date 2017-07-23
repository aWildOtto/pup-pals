import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';

class SmallDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_going: [],
      disabled: ""
    }
  }
  fetchRsvp = () => {
    return axios.get(`/api/attend/${this.props.event.id}`) 
      .then((response) => {
        this.setState({user_going: response.data});
        if(this.props.user.id){
          let users_going = this.state.user_going;
          users_going.forEach((user) => {
            if(this.props.user.id === user.user_id){
              this.setState({disabled: "disabled"});
            }
          });
        } else {
          this.setState({disabled: "disabled"});
        }
    });
  }

  handleClick = () => {
    this.props.toggleHidden();
  }

  handleRsvp = (e) => {
    e.stopPropagation();
    this.props.RSVP(this.props.event.id)
    .then((e) => {
      return this.fetchRsvp();
    });
  }

  handleCalender = (e) => {
    e.stopPropagation();
    this.props.AddToCalender();
  }

  componentDidMount() {
    this.fetchRsvp()
  }
  
  render() {   
    return (
      <div className="detailcontainer">
        <a href="#" onClick={this.handleClick.bind(this)} className="smalldetails-link">
          <div className="smalldetails-container">
            <div className="smalldetails-header">
              <h3 className="smalldetails-title">{this.props.event.title}</h3>
              <span className="smalldetails-attendees">{this.props.event.count} Going</span>
            </div>
            <div className="smalldetails-body">
              <span className="smalldetails-date"><i className="fa fa-calendar-o" aria-hidden="true"></i> <Moment format="ddd MMMM Do YYYY">{this.props.event.date_time}</Moment></span>
              <span className="smalldetails-time"><i className="fa fa-clock-o" aria-hidden="true"></i> <Moment format="h:mm a">{this.props.event.date_time}</Moment></span>
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