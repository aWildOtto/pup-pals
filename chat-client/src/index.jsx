// Application entrypoint.


// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';


ReactDOM.render(<App className="message-board"/>, document.getElementById('react-root'));
