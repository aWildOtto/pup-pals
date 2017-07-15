import React, { Component } from 'react';
import SmallDetails from './SmallDetails.jsx'
import LargeDetails from './LargeDetails.jsx'

class SideBar extends Component {
  constructor () {
    super()
    this.state = {
      isHidden: true
    }
  }
  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          {this.state.isHidden && <SmallDetails toggleHidden={this.toggleHidden.bind(this)}/>  }   
          {!this.state.isHidden && <LargeDetails toggleHidden={this.toggleHidden.bind(this)}/> }    
        </div>
      </div>      
    );
  }
}

export default SideBar;