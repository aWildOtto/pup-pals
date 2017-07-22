import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
 render(){
  return (
    <ul className="media-list" id="messageList">
      <li className="media">
        <div className="media-body">
          <div className="media">
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
        </div>
      </li>
    </ul>
  )
  }
}
export default MessageList;

