import React, {Component} from 'react';
import { Picker } from 'emoji-mart';

class Emoji extends Component {

  onEmojiSelection = (emoji, event) => {
     console.log('Click', emoji);
    this.props.addEmoji(emoji.native);
  }

  render(){

    return(
      < Picker title = 'Pup-Pals' emoji='feet' onClick={this.onEmojiSelection}/>
    );
  }
}

export default Emoji;



