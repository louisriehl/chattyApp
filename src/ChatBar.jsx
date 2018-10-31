import React, {Component} from 'react';

// ChatBar handles any user input, changing the user's name and posting their messages
class ChatBar extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const content = {
      message: event.target.message.value,
      type: "postMessage"
    };
    this.props.sendMessageToServer(content);
    event.target.message.value = "";
  }

  onBlur(event) {
    const content = {
      newUser: event.target.value,
      type: "postNotification"
    };
    this.props.sendNotificationToServer(content);
    this.props.updateCurrentUser(event.target.value);
  }

  render() {
    return (
      <footer className="chatbar">
      <input className="chatbar-username"
          placeholder={this.props.currentUser.name || "Anonymous"}
          name="user" onBlur={this.onBlur}/>
      <form onSubmit={this.onSubmit} className="message-form">
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          name="message" />
      </form>
      </footer>);
  }
}

export default ChatBar;