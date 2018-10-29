// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const AppContents = (
  <div>
    {/*<App/ >  Currently not doing anything */}
    <MessageList />
    <ChatBar />
  </div>);

ReactDOM.render(AppContents, document.getElementById('react-root'));