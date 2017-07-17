import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import io from 'socket.io-client';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(content) {
    console.log("in app", content);
    this.socket.emit("message",{message: content})
  }

  componentDidMount () {
    this.socket = io();
    this.socket.on('incomingMessage',(e)=>{
      console.log("caitlin",e);
      const newMessages = this.state.messages.concat(e);
      this.setState({
        messages: newMessages
      });
    });
  }

  render(){
    return(
      <div>
        <MessageList username = {this.state.username} messages = {this.state.messages}/>
        <ChatBar addNewMessage={this.addNewMessage}/>
      </div>
    )
  }
}
export default App;