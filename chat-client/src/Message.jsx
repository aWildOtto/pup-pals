import React, {Component} from 'react';
import Moment from 'react-moment';

class Message extends Component {
  
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  } 

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  
  render(){
    return (
      <div>
        <a className="pull-left" href={`/owner/${this.props.user_id}`}>
          <img className="media-object img-circle" src={this.props.avatar_url} width={50} />
        </a>
        <div className="media-body">
          {this.props.message}
          <br />
          <small className="text-muted">{this.props.username} | <Moment format="ddd MMMM Do YYYY">{this.props.created_at}</Moment> at <Moment format="h:mm a">{this.props.created_at}</Moment></small>
          <hr />
        </div>
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }} />
      </div>
    );
  }
}
export default Message;