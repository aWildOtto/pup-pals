import React, {Component} from 'react';

class Message extends Component {
  render(){
    console.log("the url is", this.props.avatar_url);
    return (
      <div >
        <img src={this.props.avatar_url} width={50} />
        <span> {this.props.username}: </span>
        <span> {this.props.message}</span>
        <span> {this.props.created_at}</span>
      </div>
    );
  }
}
export default Message;