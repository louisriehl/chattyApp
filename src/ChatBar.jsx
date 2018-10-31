import React, {Component} from 'react';

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
    console.log('ChatBar is sending:', content);
    this.props.sendMessage(content);
    event.target.message.value = "";
  }

  onBlur(event) {
    const content = {
      newUser: event.target.value,
      type: "postNotification"
    };
    this.props.sendNotification(content);
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