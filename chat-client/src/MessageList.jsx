import React, {Component} from 'react';

class MessageList extends Component {
 render(){
  return (
    <div className="">
      {this.props.messages.map((message) =>  {
          return <Message key={message.id} username={message.user} content={message.content} />
      })
      }
    </div>);
  }
} 
export default MessageList;