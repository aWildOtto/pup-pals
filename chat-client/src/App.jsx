import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
  } 
  render(){
    return(
      <div>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage} changeUsername={this.changeUsername}/>
        <MessageList messages={this.state.messages} />
      </div>
    )
  }
}
export default App;