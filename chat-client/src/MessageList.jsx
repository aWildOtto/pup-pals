import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
 render(){
  return (
    <div>
     { this.props.messages.map((item) => {
        if(item.type==="notification"){
          return <p key={item.id}>{item.note}</p>
        }else{
          return <Message key={item.id}
                        username = {item.username}
                        avatar_url = {item.avatar_url}
                        message={item.message}
                        created_at={item.created_at} />
        }
      })
     }

    </div>
  )
  }
}
export default MessageList;

