import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }


  
  handleKeyPress = (e) => {
    const content = this.refs.content.value;
    if (e.key === "Enter") {
      this.props.addNewMessage(e.target.value);
      this.refs.content.value = '';
    }
  }

  render(){
    return(
      <footer className="">
        <input ref="content" placeholder={"Leave a message"} onChange={this.handleKeyPress} onKeyPress={this.handleKeyPress}/>
      </footer>
    );
  }
}
export default ChatBar;

