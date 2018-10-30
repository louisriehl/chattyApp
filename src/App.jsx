import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
     idTracker: 1
    };
    this.addMessage = this.addMessage.bind(this);
  }

  changeUser(username) {

  }

  addMessage(message) {
    const newMessage = {id: this.state.idTracker, username: this.state.currentUser.name, content: message, type:"incomingMessage"};
    const messages = this.state.messages.concat(newMessage);
    const serverMessage = {user: this.state.currentUser.name, content: message};
    this.socket.send(JSON.stringify(serverMessage));
    this.setState({messages: messages, idTracker: this.state.idTracker + 1});
  }

  componentDidMount() {
    const self = this;
    this.socket = new WebSocket("ws://0.0.0.0:3001");
  }

  render() {
    return (
      <div className="app">
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;