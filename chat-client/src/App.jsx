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
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(message) {
    console.log("in app", message);
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
        <MessageList messages = {this.state.messages}/>
        <ChatBar addNewMessage={this.addNewMessage}/>
      </div>
    )
  }
}
export default App;