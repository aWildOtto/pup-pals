import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import io from 'socket.io-client';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
  }

  addNewMessage = (message) => {
    this.socket.emit("message",{message: message})
  }

  componentDidMount () {
    this.socket = io();
    this.socket.on('incomingMessage',(e)=>{
      const newMessages = this.state.messages.concat(e);
      this.setState({
        messages: newMessages
      });
    });
    this.socket.on('notification', (e) => {
      const newMessages = this.state.messages.concat(e);
      this.setState({
        messages: newMessages
      });
    });
  }
  
  render(){
    return(
      <div>
        <div className="container-fluid">
          <div className="row current-chat-area">
            <div className="col-md-12">
              <MessageList messages = {this.state.messages}/>
            </div>
          </div>
            <ChatBar addNewMessage={this.addNewMessage}/>  
        </div>
      </div>
    );
  }
}
export default App;