import React, {Component} from 'react';
import Emoji from './Emoji.jsx';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      message: ''
    }
  }

  handleKeyPress = (e) => {
    const message = e.target.value;
    if (e.key === "Enter") {
      this.props.addNewMessage(e.target.value);
      e.target.value = '';
    } else {
      this.setState({
        message: e.target.data
      })
    }
  }

  addEmoji = (emoji) => {
    console.log('caitlin', emoji);
    this.setState({
      message: this.state.message.concat(emoji)
    });
  }

  render(){
    return(
      <footer className="">
        <input value={this.state.message} placeholder={"Leave a message"} onChange={this.handleKeyPress} onKeyPress={this.handleKeyPress}/>
        <Emoji addEmoji={this.addEmoji}/>
      </footer>
    );
  }
}
export default ChatBar;

