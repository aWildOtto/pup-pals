import React, {Component} from 'react';
import Emoji from './Emoji.jsx';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      message: "",
      isHidden: true
    }
  }

  handleKeyPress = (e) => {
    const message = e.target.value;
    if (e.key === "Enter") {
      this.props.addNewMessage(e.target.value);
      this.setState({ message: ""})
    } else {
      this.setState({
        message: e.target.value
      })
    }
  }

  addEmoji = (emoji) => {
    this.setState({
      message: this.state.message.concat(emoji)
    });
  }

  toggleHidden = () => {
    this.setState((prevState)=>{
      return {
        isHidden: !prevState.isHidden
      }
    })
  }
  render(){
    return(
      <div className="row current-chat-footer">
        <div className="panel-footer">
          <div className="input-group">
            <input 
            type="text" 
            className="form-control"
            value={this.state.message} 
            placeholder={"Leave a message"} 
            onChange={this.handleKeyPress} 
            onKeyPress={this.handleKeyPress}/>
            <span className="input-group-btn" >
              <button onClick={this.toggleHidden} className="btn btn-default emoji-toggle" type="button"><i className="fa fa-smile-o" aria-hidden="true"></i></button>
            </span>
          </div>
            { !this.state.isHidden && <Emoji addEmoji={this.addEmoji}/> } 
        </div>
      </div>
    );
  }
}
export default ChatBar;

