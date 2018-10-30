import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (event.target.user) {
      console.log("Changing user!");
    } else if (event.target.message) {
      const content = event.target.message.value;
      this.props.addMessage(content);
      event.target.message.value = "";
    }
  }

  render() {
    return (
      <footer className="chatbar">
      <form onSubmit={this.onSubmit} className="user-form">
        <input className="chatbar-username"
          placeholder={this.props.currentUser.name}
          name="user" />
      </form>
      <form onSubmit={this.onSubmit} className="message-form">
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          name="message" />
      </form>
      </footer>);
  }
}

export default ChatBar;