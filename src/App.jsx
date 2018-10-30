import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
          type: "incomingMessage"
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          type: "incomingMessage"
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;