import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
 render(){
   console.log(this.props.messages);
  return (
    <div>
     { this.props.messages.map((item) => {
       console.log("I'm",item);
        return <Message key={item.id}
                        username = {item.username}
                        message={item.message} />
      })
     }

    </div>
  )
  }
}
export default MessageList;

