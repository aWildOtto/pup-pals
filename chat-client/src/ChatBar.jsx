import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <footer className="">
        <input value={this.state.name} onChange={this.changeUsername} className="" placeholder={this.props.currentUser.name} onKeyPress={this.handleUsername} />
        <input ref="content" className="" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;

