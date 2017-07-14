import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  componentDidMount() {
    this.socket = io();
  }

  render() {
    return (
      <h1>It is so working right now</h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
