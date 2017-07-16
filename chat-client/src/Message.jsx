import React, {Component} from 'react';

class Message extends Component {
  render(){
  
    return (
      <div >
        <span> {this.props.username}: </span>
        <span >{this.props.message}</span>
      </div>
    );
  }
}
export default Message;