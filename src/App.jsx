import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      usersOnline: 0
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  }

  sendMessage(message) {
    const serverMessage = {
      user: this.state.currentUser.name || "Anonymous",
      content: message.message, type: message.type
    };
    console.log('Posting message content', serverMessage);
    this.socket.send(JSON.stringify(serverMessage));
  }

  sendNotification(notification) {
    // console.log('Received notification', notification);
    const currentUser = this.state.currentUser.name || "Anonymous";
    const newUser = notification.newUser || "Anonymous";
    const serverMessage = {
      content: currentUser +
      " has changed their name to " + newUser,
      type: notification.type
    };
    this.socket.send(JSON.stringify(serverMessage));
    // console.log('Sending notification to server', serverMessage);
  }

  updateCurrentUser(user) {
    this.setState({currentUser: {name: user}});
  }

  componentDidMount() {
    const self = this;
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onopen = (evt => {
      const serverMessage = {
        content: "New user has connected",
        type: "postNotification"
      };
      this.socket.send(JSON.stringify(serverMessage));
    });
    this.socket.onmessage = ( evt => {
      const data = JSON.parse(evt.data);
      this.updateState(data);
    });
    this.socket.onclose = (evt => {
      const currentUser = this.state.currentUser.name || "Anonymous";
      const serverMessage = {
        content: currentUser + " has disconnected",
        type: "postNotification"
      };
      this.socket.send(JSON.stringify(serverMessage));
    });
  }

  updateState(data) {
    console.log(data);
    if(data.numberOfClients) {
      this.setState({usersOnline: data.numberOfClients});
    } else {
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, data];
      this.setState({messages: newMessages});
    }
  }

  render() {
    // console.log('App.jsx rerendered, printing state', this.state);
    // console.log('Sending this to MessageList', this.state.messages);
    return (
      <div className="app">
      <nav className="navbar">
        <span>{this.state.usersOnline} User(s) Online</span>
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser}
        sendMessage={this.sendMessage}
        updateCurrentUser={this.updateCurrentUser}
        sendNotification={this.sendNotification}/>
      </div>
    );
  }
}
export default App;