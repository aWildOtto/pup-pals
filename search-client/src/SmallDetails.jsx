import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';

class SmallDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_going: [],
      disabled: "",
      flag: false
    }
  }
  fetchRsvp = () => {
    return axios.get(`/api/attend/${this.props.event.id}`)
      .then((response) => {
        this.setState({user_going: response.data});
        if(this.props.user){
          let users_going = this.state.user_going;
          users_going.forEach((user) => {
            if(this.props.user.id === user.user_id){
              this.setState({
                flag: true
              });
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

  handleCancelRsvp = (e) => {
    e.stopPropagation();
    this.props.CancelRSVP(this.props.event.id)
    this.setState({
      flag: false
    })
  }

  componentDidMount() {
    this.fetchRsvp()
  }

  render() {
      if (this.state.flag) {
        return (
          <div className="detailcontainer">
            <a href="#" onClick={this.handleClick} className="smalldetails-link">
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
                    <button type="button" onClick={this.handleCancelRsvp} className="btn btn-danger rsvp-btn">Click to Cancel</button>
                  </span>
                </div>
              </div>
            </a>
          </div>
        );
      } else {
        return (
          <div className="detailcontainer">
            <a href="#" onClick={this.handleClick} className="smalldetails-link">
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
                    <button disabled={this.state.disabled} type="button" onClick={this.handleRsvp} className="btn btn-primary rsvp-btn">Click to Go</button>
                  </span>
                </div>
              </div>
            </a>
          </div>
        );
      }
  }
}

export default SmallDetails;