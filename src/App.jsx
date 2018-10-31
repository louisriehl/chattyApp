import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import ScrollManager from './ScrollManager.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "", color: null}, // optional. if currentUser is not defined, it means the user is Anonymous
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
      userColor: this.state.currentUser.color,
      content: message.message, type: message.type
    };
    this.socket.send(JSON.stringify(serverMessage));
  }

  sendNotification(notification) {
    const currentUser = this.state.currentUser.name || "Anonymous";
    const newUser = notification.newUser || "Anonymous";
    const serverMessage = {
      content: currentUser +
      " has changed their name to " + newUser,
      type: notification.type
    };
    this.socket.send(JSON.stringify(serverMessage));
  }

  updateCurrentUser(user) {
    // React doesn't play well with nested states, so we create a dummy object to store the whole property
    let currentUser = {...this.state.currentUser};
    currentUser.name = user;
    this.setState({currentUser});
  }

  componentDidMount() {
    const self = this;
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onmessage = ( evt => {
      const data = JSON.parse(evt.data);
      this.updateState(data);
    });
  }

  // Handles server messages and determines state changes
  updateState(data) {
    if(data.numberOfClients) { // This is a client update
      this.setState({usersOnline: data.numberOfClients});
    } else if(data.userColor && !data.user) { // This is a color update
      // React doesn't play well with nested states, so we create a dummy object to store the whole property
      let currentUser = {...this.state.currentUser};
      currentUser.color = data.userColor;
      this.setState({currentUser});
    } else { // This is a new message to post
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, data];
      this.setState({messages: newMessages});
    }
  }

  render() {
    return (
      <div className="app">
      <nav className="navbar">
        <span>{this.state.usersOnline} User(s) Online</span>
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ScrollManager />
      <ChatBar currentUser={this.state.currentUser}
        sendMessage={this.sendMessage}
        updateCurrentUser={this.updateCurrentUser}
        sendNotification={this.sendNotification}/>
      </div>
    );
  }
}
export default App;