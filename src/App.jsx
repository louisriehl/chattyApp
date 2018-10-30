import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  addMessage(message) {
    const serverMessage = {user: this.state.currentUser.name || "Anonymous", content: message, type: "incomingMessage"};
    this.socket.send(JSON.stringify(serverMessage));
  }

  componentDidMount() {
    const self = this;
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onmessage = ( evt => {
      const data = JSON.parse(evt.data);
      this.updateState(data);
    });
  }

  updateState(data) {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, data];
    this.setState({messages: newMessages});
  }

  render() {
    // console.log('App.jsx rerendered, printing state', this.state);
    // console.log('Sending this to MessageList', this.state.messages);
    return (
      <div className="app">
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;