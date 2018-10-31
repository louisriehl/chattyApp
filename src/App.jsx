import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import ScrollManager from './ScrollManager.jsx';

// App is the main component, receiving data from the websocket server, and sending its state to all child components
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "", color: null},
      messages: [],
      usersOnline: 0
    };
    // Bind all relevant functions to be able to send them as props
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.sendNotificationToServer = this.sendNotificationToServer.bind(this);
  }

  sendMessageToServer(message) {
    const serverMessage = {
      user: this.state.currentUser.name || "Anonymous",
      userColor: this.state.currentUser.color,
      content: message.message, type: message.type
    };
    this.socket.send(JSON.stringify(serverMessage));
  }

  sendNotificationToServer(notification) {
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
    // React doesn't play well with nested states
    // So we create a dummy object to store the whole property and change that instead
    let currentUser = {...this.state.currentUser};
    currentUser.name = user;
    this.setState({currentUser});
  }

  componentDidMount() {
    const self = this;
    this.socket = new WebSocket("ws://0.0.0.0:3001");

    // Parse string message to JSON object before sending it to the state handler
    this.socket.onmessage = ( evt => {
      const data = JSON.parse(evt.data);
      this.updateState(data);
    });
  }

  // Handles server messages and determines state changes
  updateState(data) {
    if(data.numberOfClients) {                              // This is a client update
      this.setState({usersOnline: data.numberOfClients});
    } else if(data.userColor && !data.user) {               // This is a color update
      let currentUser = {...this.state.currentUser};
      currentUser.color = data.userColor;
      this.setState({currentUser});
    } else {                                                // This is a new message to post
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
        <a href="/" className="navbar-brand"><i className="far fa-comments"></i> Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ScrollManager />
      <ChatBar currentUser={this.state.currentUser}
        sendMessageToServer={this.sendMessageToServer}
        updateCurrentUser={this.updateCurrentUser}
        sendNotificationToServer={this.sendNotificationToServer}/>
      </div>
    );
  }
}

export default App;