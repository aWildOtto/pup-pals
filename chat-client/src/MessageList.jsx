import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
 render(){
   console.log(this.props.messages);
  return (
    <div>
     { this.props.messages.map((item) => {
       console.log(item);
        return <Message key={item.id}
                        username = {item.username}
                        avatar_url = {item.avatar_url}
                        message={item.message}
                        created_at={item.created_at} />
      })
     }

    </div>
  )
  }
}
export default MessageList;

