import React, {Component} from 'react';

class Message extends Component {
  render(){
    return (
      <div className="">
        <span className="">{this.props.username}</span>
        <span className="">{this.props.content}</span>
      </div>
    );
  }
}
export default Message;