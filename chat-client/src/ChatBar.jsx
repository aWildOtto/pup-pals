import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : this.props.currentUser.name,
      content : ""
    };
    this.messageHandler = this.messageHandler.bind(this);
    this.setName = this.setName.bind(this);
    this.newMessageHandler = this.newMessageHandler.bind(this);
    this.usernameHandler = this.usernameHandler.bind(this);
  }
  messageHandler(e){
    this.setState({content: e.target.value});
  }
  setName(e){
    this.setState({name: e.target.value});
  }
  newMessageHandler(e){
    if(e.key === "Enter"){
      this.props.addNewMessage(this.state);  
      this.setState({content: ''});
    }
  }
  usernameHandler(e){
    if(e.key === "Enter"){
      this.props.changeUsername(this.state.name);  
      this.setState({name: e.target.value});
    }
  }

  render() {
    return (
      <div>
        <footer className="chatbar" >
          <input className="chatbar-username" placeholder={this.props.currentUser.name} onKeyPress = {this.usernameHandler} onChange = {this.setName} value = {this.state.name}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress = {this.newMessageHandler} onChange = {this.messageHandler} value = {this.state.content}/>
        </footer>
      </div>
    );
  }
}
export default ChatBar;
