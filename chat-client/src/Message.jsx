import React, {Component} from 'react';

class Message extends Component {
  render() {
    const colorChange = {
      color: this.props.color
    };
    const blockdisplay = {
      display: "block"
    };
    return (
      <div className="message">
        <span style = {colorChange} className="message-username">{this.props.username}</span>
        <span className="message-content">
          <div style = {blockdisplay} dangerouslySetInnerHTML={urlify(this.props.content)} />
        </span>
      </div>
    );
  }
}
export default Message;
